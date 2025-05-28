import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
    Alert,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type CheckedItems = {
    [key: string]: boolean;
};

export default function RaspadinhaDeMelancia() {
    const nav = useNavigation<NavigationProp<any>>();

    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
    });

    const itemsMap: { [key: string]: string } = {
        item1: '8 xícaras (chá) de \nmelancia cortada em \ncubos e sem sementes',
        item2: '1/4 de xícara (chá) de adoçante',
        item3: '170 ml de suco de limão',
        item4: '8 ramos de hortelã',
    };

    const toggleCheck = (item: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [item]: !prev[item],
        }));
    };

    const salvarListaDeCompras = async () => {
        const naoSelecionados = Object.keys(itemsMap)
            .filter((key) => !checkedItems[key])
            .map((key) => `- ${itemsMap[key]}`)
            .join('\n');

        if (!naoSelecionados) {
            Alert.alert('Tudo certo!', 'Todos os ingredientes foram marcados.');
            return;
        }

        const fileUri = FileSystem.documentDirectory + 'lista_de_compras_raspadinha.txt';

        try {
            await FileSystem.writeAsStringAsync(fileUri, naoSelecionados, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            const canShare = await Sharing.isAvailableAsync();
            if (canShare) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert('Arquivo salvo', `Lista salva em:\n${fileUri}`);
            }
        } catch (err) {
            Alert.alert('Erro ao salvar', 'Não foi possível criar o arquivo.');
            console.error(err);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
                style={styles.container}
                source={require('../assets/images/fundo_raspa.png')} // substitua com a imagem desejada
            >
                <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('kids')}>
                    <Feather name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.paragraph}>Raspadinha de <br></br>Melancia</Text>
                </View>

                <Text style={styles.ingredientes}>INGREDIENTES</Text>
                <View style={styles.ingredientesContainer}>
                    <View>
                        {Object.entries(itemsMap).map(([key, label]) => (
                            <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
                                <Text style={styles.topicos}>
                                    {checkedItems[key] ? (
                                        <Text style={styles.check}>✓ </Text>
                                    ) : (
                                        <Text style={styles.bolinha}>⚪ </Text>
                                    )}
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <Text style={styles.ingredientes}>MODO DE PREPARO</Text>

                <TouchableOpacity onPress={() => toggleCheck('step1')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step1 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Separe os ingredientes na quantidade indicada.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step2')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Coloque a melancia em uma vasilha grande, cubra e leve ao congelador por 20 minutos.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step3')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Bata metade da melancia, do limão e do adoçante no processador até triturar levemente.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step4')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Repita o processo com o restante dos ingredientes.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step5')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step5 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Sirva com hortelã e aproveite!
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoSalvar} onPress={salvarListaDeCompras}>
                    <Text style={styles.textoBotao}>Baixar Lista de Compras</Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#ececec',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 22,
        color: '#242424',
        textTransform: 'uppercase',
        top: 70,
        left: 47,
        marginBottom: 90,
    },
    ingredientes: {
        marginTop: 40,
        fontSize: 18,
        marginBottom: 10,
        paddingVertical: 5,
        left: 44,
    },
    ingredientesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topicos: {
        marginBottom: 10,
        lineHeight: 24,
        left: 44,
        width: 280,
        top: 10,
    },
    check: {
        color: '#32CD32',
        fontSize: 20,
        marginRight: 5,
    },
    bolinha: {
        fontSize: 16,
    },
    seta: {
        top: 100,
        left: 10
    },
    botaoSalvar: {
        backgroundColor: '#2F4B54',
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        width: 200,
        resizeMode: 'contain',
        marginLeft: 'auto',
        height: 60,
        marginTop: 50
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        top: 7,
    },
});
