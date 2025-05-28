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

export default function Brigadeiro() {
    const nav = useNavigation<NavigationProp<any>>();

    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
        item1: false,
        item2: false,
        item3: false,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
    });

    const itemsMap: { [key: string]: string } = {
        item1: '2 colheres cheias de \nchocolate em pó',
        item2: 'Granulado preto/\ncolorido',
        item3: '1/2 lata de leite \ncondensado',
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

        const fileUri = FileSystem.documentDirectory + 'lista_de_compras_brigadeiro.txt';

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
                source={require('../assets/images/fundo_briga.png')} // atualize com a imagem correta
            >
                <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('kids')}>
                    <Feather name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.paragraph}>Brigadeiro</Text>
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
                        Misture bem o leite condensado com o chocolate em pó e coloque no copo.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step2')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Coloque na geladeira por 30 minutos.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step3')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Retire do copo e enrole como uma bolinha.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheck('step4')}>
                    <Text style={styles.topicos}>
                        {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                        Coloque o granulado.
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
        height: '150%',
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
        left: 67,
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
        left: 10,
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
