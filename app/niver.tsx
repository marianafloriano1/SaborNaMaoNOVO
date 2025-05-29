import { Feather } from "@expo/vector-icons";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AnoNovo() {
  const nav = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => nav.navigate("home")}>
            <Feather name="chevron-left" size={24} color="#242424" />
          </TouchableOpacity>

          <Text style={styles.paragraph}>
            {" "}
            Receitas para Festas e Aniversários
          </Text>
        </View>
        <View style={styles.branco}>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("niverBriga")}
            >
              <ImageBackground
                source={require("../assets/images/fundoNiver.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Brigadeiro</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/7428530/pexels-photo-7428530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("niverBolo")}
            >
              <ImageBackground
                source={require("../assets/images/fundoNiver.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Bolo de Chocolate</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/9500600/pexels-photo-9500600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("niverCoxinha")}
            >
              <ImageBackground
                source={require("../assets/images/fundoNiver.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Coxinha</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/4842865/pexels-photo-4842865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("niverMini")}
            >
              <ImageBackground
                source={require("../assets/images/fundoNiver.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Mini hamburguer</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/8047933/pexels-photo-8047933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ececec",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 12, // espaço entre a seta e o texto
  },

  paragraph: {
    fontSize: 24,
    color: "#242424",
    textTransform: "uppercase",
  },

  branco: {
    backgroundColor: "white",
    position: "relative",
    zIndex: -1,
    flex: 1,
    minHeight: 300, // 👈 adicione isso ou outro valor
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    top: 40,
    padding: 15,
  },

  card: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: "flex-start",
    marginBottom: 16,
    marginTop: 16,
  },
  texto: {
    position: "absolute",
    top: 20,
    left: 12,
    color: "#000",
    fontSize: 14,
    textTransform: "uppercase",
    zIndex: 2,
  },

  cardD: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
  },

  cardImage: {
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 8,
    right: 8,
    zIndex: 2,
    borderRadius: 40,
  },
});
