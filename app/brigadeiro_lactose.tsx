import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
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
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: "200 gramas de leite de \ncoco.",
    item2: "4 colheres de sopa de \ncacau em pó.",
    item3: "4 colheres de sopa de açúcar.",
    item4: "1 xícara de granulado sem lactose.",
  };

  const stepsMap: { [key: string]: string } = {
    step1: "Numa panela, adicione o leite de coco, o cacau em pó e o açúcar.",
    step2: "Mexa bem e leve ao fogo médio, misturando sem parar.",
    step3: "Mexa até desgrudar da panela.",
    step4: "Transfira para um prato, cubra com plástico filme e leve à geladeira por 3 horas.",
    step5: "Faça bolinhas, passe no granulado e o brigadeiro está pronto!",
  };

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Imagem decorativa (adicione a sua imagem no assets e ajuste caminho) */}
        <Image
          source={require("../assets/images/fundo_briga.png")} // substitua pela imagem do fundo brigadeiro
          style={styles.decorativeImage}
          resizeMode="contain"
        />

        <View style={styles.tituloContainer}>
          <TouchableOpacity onPress={() => nav.navigate("restricoes")}>
            <Feather name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.paragraph}>BRIGADEIRO</Text>
        </View>

        <Text style={styles.ingredientes}>INGREDIENTES</Text>
        <View style={styles.ingredientesContainer}>
          <View>
            {Object.entries(itemsMap).map(([key, item]) => (
              <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
                <Text style={styles.topicos}>
                  {checkedItems[key] ? (
                    <Text style={styles.check}>✓ </Text>
                  ) : (
                    <Text style={styles.bolinha}>⚪ </Text>
                  )}
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.ingredientes}>MODO DE PREPARO</Text>
        {Object.entries(stepsMap).map(([key, step], index) => (
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
            onPress={() => Alert.alert("Função em desenvolvimento")}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECECEC",
    width: "100%",
    paddingBottom: 40,
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
    paddingRight: 50,
  },
  topicos: {
    marginBottom: 10,
    lineHeight: 24,
    left: 44,
    width: 300,
  },

  check: {
    color: "#32CD32",
    fontSize: 20,
  },
  bolinha: {
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    marginTop: 40,
    paddingHorizontal: 40,
    justifyContent: "space-between",
  },
  botaoVerde: {
    flex: 1,
    backgroundColor: "#009B4D",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  botaoCinza: {
    flex: 1,
    backgroundColor: "#2F4B54",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
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
