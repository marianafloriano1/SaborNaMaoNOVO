import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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

export default function CoxinhaDeFrango() {
  const nav = useNavigation();
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
    step12: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: "1 colher de sopa de \nmanteiga",
    item2: "25 ml de leite",
    item3: "1 batata média cozida e amassada",
    item4: "50g de farinha de trigo",
    item5: "Tempero a gosto",
    item6: "Meio peito de frango",
    item7: "Requeijão (opcional)",
    item8: "Farinha de rosca ou farinha panko",
  };

  const stepsMap = {
    step1: "Em uma panela coloque a manteiga e deixe derreter.",
    step2: "Acrescente o leite, e a batata amassada e mexa bem.",
    step3: "Adicione os temperos a gosto.",
    step4: "Coloque a farinha e mexa por aproximadamente 3 minutos e desligue a panela.",
    step5: "Ainda quente sove com uma espátula a massa e depois que esfriar sove mais com a mão, e reserve.",
    step6: "Corte meio peito de frango em cubos e tempere à gosto.",
    step7: "Leve o frango em uma frigideira quente e espere fritar.",
    step8: "Desfie o frango com auxílio de garfos.",
    step9: "Depois de desfiado misture o frango com o requeijão (opcional).",
    step10: "Pegue a massa reservada, abra na mão, coloque o recheio no meio e vá moldando a sua coxinha.",
    step11: "Passe a sua coxinha com cuidado na farinha de rosca ou farinha panko e leve para fritar em óleo bem quente até ficar dourada.",
    step12: "Está pronto a sua coxinha! Aproveite!",
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
      .join("\n");

    if (!naoSelecionados) {
      Alert.alert("Tudo certo!", "Todos os ingredientes foram marcados.");
      return;
    }

    const fileUri = FileSystem.documentDirectory + "lista_coxinha_de_frango.txt";

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/fundo_coxinha2.png")} // substitua pelo seu fundo
          style={styles.decorativeImage}
          resizeMode="contain"
        />
        <View style={styles.tituloContainer}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Feather name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.paragraph}>Coxinha de Frango</Text>
        </View>

        <Text style={styles.ingredientes}>INGREDIENTES</Text>
        <View style={styles.ingredientesContainer}>
          {Object.entries(itemsMap).map(([key, label]) => (
            <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
              <Text style={styles.topicos}>
                {checkedItems[key] ? (
                  <Text style={styles.check}>✓</Text>
                ) : (
                  <Text style={styles.bolinha}>⚪ </Text>
                )}
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ingredientes}>MODO DE PREPARO</Text>
        {Object.entries(stepsMap).map(([key, step], index) => (
          <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
            <Text style={styles.topicos}>
              {checkedItems[key] ? (
                <Text style={styles.check}>✓</Text>
              ) : (
                <Text style={styles.bolinha}>⚪ </Text>
              )}
              {step}
            </Text>
          </TouchableOpacity>
        ))}

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
          <TouchableOpacity style={styles.botaoCinza} onPress={salvarListaDeCompras}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ECECEC",
    paddingBottom: 40,
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 90,
    marginLeft: 10,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 22,
    color: "#242424",
    textTransform: "uppercase",
    marginLeft: 5,
    width: 240,
  },
  ingredientes: {
    marginTop: 40,
    fontSize: 18,
    marginBottom: 20,
    paddingVertical: 5,
    left: 44,
  },
  ingredientesContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
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
    marginTop: 40,
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
     position: 'absolute',
    left: 135,
    top: 0,
    right: 0,
    width: 350,
    height: 500,
    zIndex: 0,
  },
});
