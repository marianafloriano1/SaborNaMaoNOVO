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

export default function MacasDoAmor() {
    const nav = useNavigation<NavigationProp<any>>();

    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false,
        item6: false,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
        step8: false,
        step9: false,
    });

    const itemsMap: { [key: string]: string } = {
        item1: '1 kg de açúcar',
        item2: '1 colher (sopa) de \nvinagre',
        item3: '12 maçãs',
        item4: '500 ml de água',
        item5: 'Corante vermelho \n(pó ou líquido)',
        item6: 'Palitos de sorvete da sua \npreferência',
    };

    const toggleCheck = (item: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [item]: !prev[item],
        }));
    };

    const salvarListaDeCompras = async () => {
        // Pega os ingredientes não marcados
        const naoSelecionados = Object.keys(itemsMap)
            .filter((key) => !checkedItems[key])
            .map((key) => `- ${itemsMap[key]}`)
            .join('\n');

        if (!naoSelecionados) {
            Alert.alert('Tudo certo!', 'Todos os ingredientes foram marcados.');
            return;
        }

        const fileUri = FileSystem.documentDirectory + 'lista_de_compras_macas_do_amor.txt';

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
                source={require('../assets/images/fundo_maca.png')} // coloque a imagem que quiser
            >
                <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('arraia')}>
                    <Feather name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.paragraph}>Maçãs do Amor</Text>
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

                <Text style={[styles.topicos, styles.ingredientes]}>Das maçãs:</Text>
                <TouchableOpacity onPress={() => toggleCheck('step1')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step1 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Lave e seque as maçãs.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step2')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Espete-as com 1 ou 2 palitos.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step3')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Unte formas (grande o suficiente para deixá-las de pé) com pouco óleo.
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.topicos, styles.ingredientes, { marginTop: 20 }]}>Calda do Amor:</Text>
                <TouchableOpacity onPress={() => toggleCheck('step4')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Em uma panela, misture o açúcar e a água.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step5')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step5 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Leve ao fogo até o açúcar derreter completamente.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step6')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step6 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Adicione o corante e misture bem.
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.topicos, styles.ingredientes, { marginTop: 20 }]}>Maçãs do Amor:</Text>
                <TouchableOpacity onPress={() => toggleCheck('step7')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step7 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Mergulhe a ponta de um palito de sorvete na calda e pingue na forma em segundos.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step8')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step8 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Pressione com o dedo (ela amassará) e solte sobre a forma; se ela fizer barulho de sólida, desligue imediatamente.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step9')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step9 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Pegue as maçãs que você deixou nas formas e comece a mergulhar elas na calda, faça isso o mais breve possível, pois a calda irá endurecer com o tempo.
                    </Text>
                </TouchableOpacity>

                <View style={styles.botoesContainer}>
                    <TouchableOpacity style={styles.botaoVerde}>
                        <Feather
                            name="refresh-cw"
                            size={20}
                            color="#fff"
                            style={styles.iconeBotao}
                        />
                        <Text style={styles.textoBotao}>Forma correta descarte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.botaoCinza}
                        onPress={salvarListaDeCompras}
                    >
                        <Feather
                            name="download"
                            size={20}
                            color="#FFCC00"
                            style={styles.iconeBotao}
                        />
                        <Text style={styles.textoBotao}>Baixar lista de compra</Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom: 90
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
        top: 10
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
        top: 100
    },

    botoesContainer: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        marginTop: 40,
    },

    botaoVerde: {
        flex: 1,
        backgroundColor: "#009B4D", // verde da imagem
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    botaoCinza: {
        flex: 1,
        backgroundColor: "#2F4B54", // cinza azulado da imagem
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    iconeBotao: {
        marginRight: 10,
    },
    textoBotao: {
        color: "#fff",
        fontSize: 16,
    },
});
