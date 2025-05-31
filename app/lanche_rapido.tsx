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
          <TouchableOpacity onPress={() => nav.navigate("economica")}>
            <Feather name="chevron-left" size={24} color="#242424" style={styles.seta} />
          </TouchableOpacity>

          <Text style={styles.paragraph}>Lanches rápidos e práticos</Text>
        </View>
        <View style={styles.branco}>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("sanduiche_frango")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_lanche.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Sanduíche de frango</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/12540673/pexels-photo-12540673.png?auto=compress&cs=tinysrgb&w=600",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("sanduiche_atum")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_lanche.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Sanduíche de atum</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/30910207/pexels-photo-30910207/free-photo-of-sanduiche-de-atum-saudavel-com-bebida-refrescante.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("pizza_rap10")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_lanche.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Pizza de Rap10</Text>

              <Image
                source={{
                  uri: "https://images.pexels.com/photos/32320122/pexels-photo-32320122.jpeg?auto=compress&cs=tinysrgb&w=600",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("brusqueta")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_lanche.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Brusqueta</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/2532006/pexels-photo-2532006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
        marginTop: 40,
        paddingHorizontal: 10,
        gap: 12, // espaço entre a seta e o texto
    },

    paragraph: {
        fontSize: 24,
        color: "#242424",
        textTransform: "uppercase",
        top: 15
    },

    branco: {
        backgroundColor: "white",
        position: "relative",
        zIndex: -1,
        flex: 1,
        height: 900, // 👈 adicione isso ou outro valor
        width: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 100,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        top: 50,
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
        left: 20,
        color: "#000",
        fontSize: 14,
        textTransform: "uppercase",
        zIndex: 2,
        width: 150
    },
    seta: {
      top: 15
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
