import { NavigationProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";


type RootStackParamList = {
  heranca: undefined;
  login: undefined;
  ceia_natal: undefined;
  pascoa: undefined;
  festa_junina: undefined;
  halloween: undefined;
  ano_novo: undefined;
  festa: undefined;
  bebidas: undefined;
  kids: undefined;
  dietas: undefined;
  restricoes: undefined;
  noite_garotas: undefined;
  morando_sozinho: undefined;
  almoco_domingo: undefined;
  vegano: undefined;
  vegetariano: undefined;
  aniversario: undefined;
  snack: undefined;
  aperitivos: undefined;
  economica: undefined;
  home: undefined;
  soboro: undefined;
  soboroArroz: undefined;
  soboroMacarao: undefined;
  soboroCarne: undefined;
  soboroLegu: undefined;
  soboroChoco: undefined;
  soboroBebi: undefined;
  soboroFruta: undefined;
  soboroAir: undefined;
};

export default function App() {
  const route = useRoute();
  const nav = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedCategory, setSelectedCategory] = useState("tudo");
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
  useCallback(() => {
    if (route.name === "home") {
      setSelectedCategory("tudo");
    } else if (route.name === "soboro") {
      setSelectedCategory("soboro");
    } else if (route.name === "economica") {
      setSelectedCategory("economica");
    }
  }, [route.name])
);


  const names = [
    "Mister Panela",
    "Mestre Cuca",
    "Chef de Plantão",
    "Mastre do Tempero",
    "Panela Quente",
    "Sabor Divino",
  ];
  const profilePics = [
    require("../assets/images/perfil1.png"),
    require("../assets/images/perfil2.png"),
    require("../assets/images/perfil3.png"),
    require("../assets/images/perfil4.png"),
    require("../assets/images/perfil5.png"),
    require("../assets/images/perfil6.png"),
  ];

  const getRandomProfile = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomPic =
      profilePics[Math.floor(Math.random() * profilePics.length)];
    return { name: randomName, pic: randomPic };
  };

  const [userProfile, setUserProfile] = useState(getRandomProfile());


  const items = [
    {
      title: "Natal",
      image: require("../assets/images/natal.png"),
      route: "natal",
    },
    {
      title: "Páscoa",
      image: require("../assets/images/pascoa.png"),
      route: "pascoa",
    },
    {
      title: "Arraiá",
      image: require("../assets/images/junina.png"),
      route: "arraia",
    },
    {
      title: "Halloween",
      image: require("../assets/images/hallowen.png"),
      route: "hallow",
    },
    {
      title: "Ano Novo",
      image: require("../assets/images/anonovo.png"),
      route: "ano_novo",
    },
    {
      title: "Festas",
      image: require("../assets/images/festas.png"),
      route: "niver",
    },
  ];
  const shadowColors = [
    "#852221",
    "#6750A4",
    "#633B48",
    "#229E0C",
    "#00127A",
    "#B02652",
  ];


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.fundo}>
          <Tooltip
            isVisible={toolTipVisible}
            content={
              <View style={styles.tooltipContainer}>
                <View style={styles.userInfo}>
                  <View style={styles.userIcon}>
                    <Image
                      source={userProfile.pic}
                      style={styles.userIconImage}
                    />
                  </View>
                  <Text style={styles.userName}>{userProfile.name}</Text>
                </View>

                <TouchableOpacity
                  style={styles.recipesButton}
                  onPress={() => {
                    nav.navigate("heranca");
                  }}
                >
                  <Text style={styles.recipesText}>Minhas receitas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => router.replace("/")}
                >
                  <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
              </View>
            }
            placement="bottom"
            onClose={() => setToolTipVisible(false)}
            contentStyle={styles.tooltip}
            backgroundColor="transparent"
            showChildInTooltip={false}
            arrowStyle={{
              borderTopWidth: 13,
              marginLeft: 165,
              marginTop: 9,
            }}
          >
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => setToolTipVisible(true)}
            >
              <Image
                source={require("../assets/images/perfil.png")}
                style={styles.perfil}
              />
            </TouchableOpacity>
          </Tooltip>

          <View style={styles.categorias2}>
            <TouchableOpacity
              style={[
                styles.categoria21,
                selectedCategory === "tudo" && { backgroundColor: "#385A64" }, // cor do "tudo"
                selectedCategory !== "tudo" && { backgroundColor: "#D3D3D3" }, // cinza claro
              ]}
              onPress={() => {
                setSelectedCategory("tudo"); // Adiciona isso
                nav.navigate("home");
              }}
            >
              <Text style={styles.texto22}>Tudo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.categoria2,
                selectedCategory === "soboro" && { backgroundColor: "#385A64" },
                selectedCategory !== "soboro" && { backgroundColor: "#D3D3D3" },
              ]}
              onPress={() => {
                setSelectedCategory("soboro");
                nav.navigate("soboro");
              }}
            >
              <Text style={styles.texto2}>Soboro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.categoria2,
                selectedCategory === "economica" && {
                  backgroundColor: "#385A64",
                },
                selectedCategory !== "economica" && {
                  backgroundColor: "#D3D3D3",
                },
              ]}
              onPress={() => {
                setSelectedCategory("economica");
                nav.navigate("economica");
              }}
            >
              <Text style={styles.texto2}>Econômica</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../assets/images/imgCarrosel.png")}
            style={styles.img_home}
          ></Image>

          <Text style={styles.texto_filtro}>O que mais sobrou?</Text>
          <View style={styles.categorias}>
            <TouchableOpacity
              style={styles.categoria}
              onPress={() => {
                nav.navigate("soboroArroz");
              }}
            >
              <Text style={styles.texto1}>ARROZ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoria}
              onPress={() => {
                nav.navigate("soboroMacarao");
              }}
            >
              <Text style={styles.texto1}>Macarrão</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoria}
              onPress={() => {
                nav.navigate("soboroCarne");
              }}
            >
              <Text style={styles.texto1}>Carne</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoria}
              onPress={() => {
                nav.navigate("soboroLegu");
              }}
            >
              <Text style={styles.texto1}>Legumes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoria}
              onPress={() => {
                nav.navigate("soboroChoco");
              }}
            >
              <Text style={styles.texto1}>Chocolate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoria}
              onPress={() => {
                nav.navigate("soboroBebi");
              }}
            >
              <Text style={styles.texto1}>Bebida</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.textoo}>Clique e conheça outras opções:</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 40,
            marginLeft: -5,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: "#1D192B",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 0.3,
                elevation: 26,
                borderColor: "#5714AE",
                borderWidth: 0.2,
              }}
              onPress={() => nav.navigate("soboroFruta")}
            >
              <Text style={styles.texto_fruta}>Receitas com Frutas</Text>
              <Image
                style={styles.img_fruta}
                source={require("../assets/images/melancia.jpg")}
              />
            </Pressable>
          </View>

          <View style={{ alignItems: "center" }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: "#7F7F7F",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 0.3,
                elevation: 26,
                borderColor: "#565656",
                borderWidth: 0.2,
              }}
              onPress={() => nav.navigate("soboroAir")}
            >
              <Text style={styles.texto_sozinho}>Receitas para Airfryer</Text>
              <Image
                style={styles.img_sozinho}
                source={require("../assets/images/airfryer.jpg")}
              />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.toggleText}>Estragou, e agora? </Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal transparent visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>
                O Que Fazer com Comida Estragada?
              </Text>
              <Text style={styles.modalTexto}>
                Todo mundo já jogou fora alguma comida estragada, né? Mas você
                sabia que isso pode prejudicar o meio ambiente? Quando vai pro
                lixo comum, esses restos ajudam a formar mais lixo nos aterros e
                ainda liberam gases que poluem o ar. {"\n\n"}A boa notícia é que
                dá pra reaproveitar! Restos de frutas, legumes e até alimentos
                passados podem virar adubo por meio da compostagem. Isso vira
                uma terra rica, perfeita pra plantar! Dá até pra usar sementes
                de frutas como limão ou abacate e começar sua própria horta em
                casa. Além de ajudar a natureza, você ainda economiza e aprende
                a cuidar melhor do que come. Que tal começar hoje?{"\n\n"}
                Acesse um manual completo sobre compostagem aqui:{" "}
                <Text
                  style={{ color: "blue" }}
                  onPress={() =>
                    Linking.openURL(
                      "https://semil.sp.gov.br/educacaoambiental/prateleira-ambiental/manual-de-compostagem/"
                    )
                  }
                >
                  Manual de Compostagem
                </Text>
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.textoFechar}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  fundo: {
    padding: 20,
  },

  row: {
    justifyContent: "center",
    alignItems: "center",
  },

  img_home: {
   width: 380,
    height: 190,
    marginTop: 70,
    right: 12,
  },

  quadrado_fundo: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 190,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    top: -100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
  },

  perfil: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: "auto",
    left: 5,
    top: 30,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
    marginTop: 30,
  },

  carouselItem: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: "center",
    width: 100,
    height: 130,
  },
  buttonImage: {
    width: 90,
    height: 90,
    marginBottom: 5,
    backgroundColor: "white",
    borderRadius: 7,
  },

  texto: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 13,
    fontFamily: "monospace",
  },

  categorias: {
    flexDirection: "row", // Organiza os itens em linha
    flexWrap: "wrap", // Permite que os itens quebrem linha
    justifyContent: "space-between", // Distribui os itens em duas colunas
    margin: 5,
    top: 20,
  },

  categoria: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "48%", // Cada item ocupa metade da linha (2 colunas)
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  textoo: {
    fontSize: 17,
    marginLeft: 15,
    color: "#565656",
    top: 10,
  },
  texto_filtro: {
    fontSize: 17,
    marginTop: 15,
    color: "#565656",
    bottom: -10,
  },
  texto1: {
      fontSize: 16,
    color: "#565656",
    fontFamily: "monospace",
    textTransform: "uppercase",
    fontWeight: 'bold'
  },

  //tooltip

  tooltip: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: 250,
    position: "absolute",
    left: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
    height: 165,
  },
  tooltipContainer: {
    padding: 10,
    borderRadius: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  userIconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userName: {
    fontSize: 16,
    color: "#000",
  },
  recipesButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F8D12D",
    borderRadius: 9,
    width: 190,
    height: 40,
  },
  recipesText: {
    color: "white",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 15,
    paddingVertical: 3,
    paddingHorizontal: 18,
    backgroundColor: "grey",
    borderRadius: 7,
    width: 60,
    height: 25,
    left: 160,
  },
  logoutText: {
    color: "white",
    fontSize: 13,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },

  texto2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },

  categoria2: {
    backgroundColor: "#cacaca",
    borderRadius: 15,
    width: 100,
    height: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    margin: 5,
  },

  categorias2: {
    flexDirection: "row", // Organiza os itens em linha
    top: 50,
    left: 20,
  },

  texto22: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },
  categoria21: {
    backgroundColor: "#385A64",
    borderRadius: 15,
    width: 100,
    height: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    margin: 5,
    fontFamily: "monospace",
  },

  texto_sozinho: {
    color: "#868585",
    fontSize: 22,
    fontWeight: "bold",
    left: 10,
    top: 10,
  },
  texto_fruta: {
    color: "#5714AE",
    fontSize: 22,
    fontWeight: "bold",
    left: 10,
    top: 10,
  },
  img_sozinho: {
    width: 60,
    height: 80,
    left: 80,
    top: 10,
  },
  img_fruta: {
    width: 70,
    height: 70,
    left: 80,
    top: 15,
  },
  modalButton: {
    backgroundColor: "#009E60",
    alignItems: "center",
    marginHorizontal: 20,
    width: "100%",
    resizeMode: "contain",
    marginLeft: "auto",
    height: 40,
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 350,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 20,
  },
  textoFechar: {
    textAlign: "center",
    color: "#7D4DFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    marginTop: 10,
    fontSize: 14,
    color: "#fff",
    textTransform: "uppercase",
  },
});
