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

export default function QuibeVegetais() {
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
  });

  const itemsMap: { [key: string]: string } = {
    item1: "200g de trigo para quibe",
    item2: "200g de abobrinhas verdes",
    item3: "200g de cenouras",
    item4: "200g de brócolis",
    item5: "200g de palmito",
    item6: "200g de champignon",
    item7: "3 colheres (sopa) de hortelã",
    item8: "3 colheres (sopa) de cebola",
  };

  const stepsMap: { [key: string]: string } = {
    step1:
      "Deixe o trigo de molho em água e sal por duas horas, escorrendo a seguir.",
    step2: "Descasque as abobrinhas e corte, aproveitando também o miolo.",
    step3:
      "Corte em quadradinhos e refogue com alho e azeite rapidamente, em fogo alto. Acrescente sal, deixando as abobrinhas 'al dente' ou em sua consistência preferida, e reservar.",
    step4: "Cozinhe as cenouras, também cortadas em quadradinhos, com sal e alho.",
    step5:
      "Logo após, ferva água e acrescente os brócolis (não colocar sal, pois ele muda a cor dos legumes verdes).",
    step6:
      "Ferva os palmitos em água e sal por, pelo menos, cinco minutos e corte-os em pedaços pequenos. Corte os champignons e misture muito bem todos os ingredientes com o trigo para quibe.",
    step7: "Leve ao forno por alguns minutos para corar. Retire e decore a gosto.",
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
        {/* Imagem decorativa */}
        <Image
          source={require("../assets/images/fundo_quibe.png")} // coloque sua imagem
          style={styles.decorativeImage}
          resizeMode="contain"
        />

        <View style={styles.tituloContainer}>
          <TouchableOpacity onPress={() => nav.navigate("restricoes")}>
            <Feather name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.paragraph}>QUIBE DE VEGETAIS</Text>
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
        {Object.entries(stepsMap).map(([key, step], idx) => (
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
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 90,
    marginLeft: 10,
    marginBottom: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicos: {
    marginBottom: 10,
    lineHeight: 24,
    left: 44,
    width: 290,
  },
  numero: {
    fontWeight: "bold",
    color: "#242424",
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
    left: 102,
    top: 0,
    width: 350,
    height: 720,
    zIndex: 0,
  },
});
