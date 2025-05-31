import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type CheckedItems = {
    [key: string]: boolean;
};

export default function Brigadeiro() {
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
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
        step8: false,
        step9: false,
        step10: false,
        step11: false,

    });

    const itemsMap: { [key: string]: string } = {
        item1: "1 xícara de arroz integral \ncozido",
        item2: "1 abobrinha picada em tiras grossas",
        item3: "1/2 xícara de repolho picado grosseiramente",
        item4: "1 talo de alho-poró em rodelas",
        item5: "1 colher (sopa) de azeite",
        item6: "Sal e pimenta-do-reino a gosto",
        item7: "Cheiro-verde ou salsinha para finalizar",
        item8: "2 ovos",
    };

    const stepsMap: { [key: string]: string } = {
        step1:
            "Coloque os ovos em água fervente e cozinhe por 6 a 7 minutos.",
        step2: "Retire e mergulhe em água fria imediatamente.",
        step3: "Descasque com cuidado e reserve.",
        step4: "Aqueça o azeite em uma frigideira.",
        step5: "Adicione o alho-poró, depois a abobrinha e por último o repolho.",
        step6: "Refogue até ficarem macios, mas ainda crocantes.",
        step7: "Tempere com sal e pimenta a gosto.",
        step8: "Em um prato ou marmita, disponha o arroz integral cozido.",
        step9: "Por cima, adicione os legumes salteados.",
        step10: "Corte os ovos ao meio e coloque ao lado.",
        step11: "Finalize com salsinha ou cheiro-verde fresco.",


    };

    const toggleCheck = (item: string) => {
        setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
    };

    const salvarListaDeCompras = async () => {
        const naoSelecionados = Object.keys(itemsMap)
            .filter((key) => !checkedItems[key])
            .map((key) => `- ${itemsMap[key]}`)
            .join("\n");

        if (!naoSelecionados) {
            Alert.alert("Tudo certo!", "Todos os ingredientes foram marcados.");
            return;
        }

        const fileUri =
            FileSystem.documentDirectory + "lista_de_compras_arrozlegumes.txt";

        try {
            await FileSystem.writeAsStringAsync(fileUri, naoSelecionados, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            const canShare = await Sharing.isAvailableAsync();
            if (canShare) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert("Arquivo salvo", `Lista salva em:\n${fileUri}`);
            }
        } catch (err) {
            Alert.alert("Erro ao salvar", "Não foi possível criar o arquivo.");
            console.error(err);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Image
                        source={require("../assets/images/fundo_arroz_marmita2.png")} // Certifique-se de que o caminho está correto
                        style={styles.decorativeImage}
                        resizeMode="contain"
                    />

                    <View style={styles.tituloContainer}>
                        <TouchableOpacity onPress={() => nav.navigate("marmitas")}>
                            <Feather name="chevron-left" size={28} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.paragraph}>ARROZ COM LEGUMES E OVO COZIDO</Text>
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
                    {Object.entries(stepsMap).map(([key, step]) => (
                        <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
                            <Text style={styles.topicos}>
                                {checkedItems[key] ? (
                                    <Text style={styles.check}>✓ </Text>
                                ) : (
                                    <Text style={styles.bolinha}>⚪ </Text>
                                )}
                                {step}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>{" "}
            <View style={styles.botoesContainer}>
                <TouchableOpacity
                    style={styles.botaoVerde}
                    onPress={() => Alert.alert("Forma correta descarte")}
                >
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "50%",
        backgroundColor: "#ECECEC",
    },
    tituloContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 90,
        marginLeft: 10,
    },
    paragraph: {
        fontSize: 22,
        color: "#242424",
        textTransform: "uppercase",
        marginLeft: 5,
        width: 240,
    },
    ingredientes: {
        marginTop: 100,
        fontSize: 18,
        marginBottom: 20,
        paddingVertical: 5,
        left: 44,
    },
    ingredientesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topicos: {
        marginBottom: 10,
        lineHeight: 24,
        left: 44,
        width: 290,
    },
    check: {
        color: "#32CD32",
        fontSize: 20,
        marginRight: 5,
    },
    bolinha: {
        fontSize: 16,
    },
    botoesContainer: {
        flexDirection: "row",
        width: "100%",
        height: 50,
    },
    botaoVerde: {
        flex: 1,
        backgroundColor: "#009B4D",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    botaoCinza: {
        flex: 1,
        backgroundColor: "#2F4B54",
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
    decorativeImage: {
        position: "absolute",
        left: 135,
        top: 0,
        right: 0,
        width: 350,
        height: 500,
        zIndex: 0,
    },
});
