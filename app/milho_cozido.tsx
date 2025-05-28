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

export default function MilhoCozido() {
    const nav = useNavigation<NavigationProp<any>>();

    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
        item1: false,
        item2: false,
        item3: false,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
    });

    const itemsMap: { [key: string]: string } = {
        item1: '5 espigas de milho-verde, \ncortadas ao meio (1 kg).',
        item2: '2 litros de água.',
        item3: '2 colheres (sopa) de \nmanteiga sem sal.',
    };

    const toggleCheck = (item: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [item]: !prev[item],
        }));
    };

    const salvarListaDeCompras = async () => {
        // Ingredientes não marcados
        const naoSelecionados = Object.keys(itemsMap)
            .filter((key) => !checkedItems[key])
            .map((key) => `- ${itemsMap[key]}`)
            .join('\n');

        if (!naoSelecionados) {
            Alert.alert('Tudo certo!', 'Todos os ingredientes foram marcados.');
            return;
        }

        const fileUri = FileSystem.documentDirectory + 'lista_de_compras_milho_cozido.txt';

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
                source={require('../assets/images/fundo_milho.png')} // pode trocar pela imagem desejada
            >
                <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('arraia')}>
                    <Feather name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.paragraph}>MILHO COZIDO</Text>
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
                        Em uma panela de pressão, coloque o milho e a água.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step2')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Tampe a panela e cozinhe por 15 minutos, em fogo médio, após o início da fervura.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step3')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Desligue o fogo e espere a pressão ceder.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step4')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Abra a panela, escorra a água do cozimento e retire o milho.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step5')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step5 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Unte uma assadeira grande de buraco no meio com óleo e açúcar (de preferência cristal).
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step6')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step6 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Espalhe a manteiga no milho ainda quente, polvilhe o sal, e sirva em seguida.
                    </Text>
                </TouchableOpacity>

                <Text style={styles.ingredientes}>DICA</Text>
                <TouchableOpacity onPress={() => toggleCheck('step7')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step7 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Para facilitar na hora de servir, com o auxílio de uma faca, corte os grãos de milho da espiga e sirva em pratinhos individuais.
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
        top: 60,
        left: 57,
        marginBottom: 90,
    },
    ingredientes: {
        marginTop: 40,
        fontSize: 18,
        marginBottom: 10,
        paddingVertical: 5,
        left: 44,
        color: '#000',
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
    numero: {
        fontWeight: 'bold',
        fontSize: 18,
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
        top: 90,
        left: 20,
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
        marginTop: 20,
        marginBottom: 40,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        top: 7,
    },
});
