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

export default function Pizza() {
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
    item10: false,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: "1 xícara de farinha de arroz",
    item2: "1/4 de xícara de fécula de batata",
    item3: "1/4 de xícara de amido de milho",
    item4: "1/2 batata média amassada ou mandioca",
    item5: "1 colher de fermento (sobremesa)",
    item6: "1 colher rasa de sal (chá)",
    item7: "1 colher de açúcar (sobremesa)",
    item8: "1 ovo",
    item9: "3 colheres de óleo ou azeite (sopa)",
    item10: "1 colher rasa de agar-agar (chá, opcional, para melhorar a massa)",
  };

  const stepsMap: { [key: string]: string } = {
    step1: "Adicione todos os ingredientes em uma vasilha.",
    step2: "Mexa bem todos os ingredientes, até a massa ficar boa para mexer com as mãos. Se necessário, coloque mais farinha de arroz.",
    step3: "Unte as mãos e coloque a massa em uma forma untada e enfarinhada com farinha de arroz. É necessário limpar e repassar óleo nas mãos quando a massa começar a agarrar.",
    step4: "Deixe a massa no forno pré-aquecido a 200~250 graus por 10 minutos, dependendo da potência do seu forno.",
    step5: "Retire a massa, recheie como quiser e deixe por mais 7 a 10 minutos.",
    step6: "Rende uma pizza de 4 pedaços.",
  };

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Imagem decorativa igual do pastel, troque a imagem conforme desejar */}
        <Image
          source={require("../assets/images/fundo_pizza.png")}
          style={styles.decorativeImage}
          resizeMode="contain"
        />

        <View style={styles.tituloContainer}>
          <TouchableOpacity onPress={() => nav.navigate("restricoes")}>
            <Feather name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.paragraph}>PIZZA</Text>
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
            // Aqui pode adicionar função para baixar ou salvar lista
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
  numero: {
    fontWeight: "bold",
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
