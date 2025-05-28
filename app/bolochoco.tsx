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

export default function BoloDeCaneca() {
    const nav = useNavigation<NavigationProp<any>>();

    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false,
        item6: false,
        item7: false,
        item8: false,
        item9: false,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
    });

    const itemsMap: { [key: string]: string } = {
        item1: '2 ovos',
        item2: '1/2 xícara (chá) \nde açúcar',
        item3: '2 colheres (sopa) de \nmanteiga ou margarina',
        item4: '3 colheres (sopa) de leite',
        item5: '1 xícara (chá) de farinha de trigo',
        item6: '1/2 colher (chá) de fermento em pó',
        item7: '5 colheres (sopa) de açúcar (para a calda)',
        item8: '2 colheres (sopa) de chocolate em pó (para a calda)',
        item9: '3 colheres (sopa) de água (para a calda)',
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

        const fileUri = FileSystem.documentDirectory + 'lista_de_compras_bolo_de_caneca.txt';

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
                source={require('../assets/images/fundo_bolocho.png')} // substitua com a imagem desejada
            >
                <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('kids')}>
                    <Feather name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.paragraph}>Bolo de Caneca</Text>
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
                        Misture os ovos com o açúcar até dissolver bem.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step2')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Acrescente a manteiga, o leite e misture.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step3')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Adicione a farinha de trigo e o fermento, mexendo até ficar homogêneo.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step4')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Coloque a massa em canecas (até a metade).
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step5')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step5 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Leve ao micro-ondas por cerca de 2 a 3 minutos.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step6')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step6 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Para a calda: misture açúcar, chocolate e água em uma panela.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step7')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step7 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Leve ao fogo baixo até formar uma calda e despeje sobre o bolo.
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
        height: '90%',
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
        left: 37,
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
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        top: 7,
    },
});
