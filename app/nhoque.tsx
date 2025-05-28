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

export default function NhoqueDeBanana() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
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
    item1: '2 bananas-da-terra.',
    item2: '1/4 de xícara de chá de \namido de milho.',
    item3: 'Sal à gosto.',
    item4: 'Pimenta a gosto.',
    item5: 'Manteiga e azeite para grelhar.',
  };

  const stepsMap: { [key: string]: string } = {
    step1: 'Sem descascar, disponha as bananas inteiras em uma assadeira.',
    step2: 'Leve ao forno para assar em temperatura baixa por cerca de 20 minutos. É normal que as cascas escureçam.',
    step3: 'Retire as bananas do forno e aguarde amornar.',
    step4: 'Com as bananas ainda mornas, retire as cascas e amasse as frutas em um recipiente.',
    step5: 'Adicione o amido, acerte o sal e a pimenta e misture bem.',
    step6: 'Polvilhe uma bancada com amido, corte a massa em pedaços pequenos e modele os nhoques.',
    step7: 'Em uma frigideira quente, adicione a manteiga e o azeite.',
    step8: 'Grelhe os nhoques dos dois lados, deixando criar uma casca crocante.',
    step9: 'Agora é só servir. Bom apetite.',
  };

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const salvarListaDeCompras = async () => {
    const naoMarcados = Object.keys(itemsMap)
      .filter((key) => !checkedItems[key])
      .map((key) => `- ${itemsMap[key]}`)
      .join('\n');

    if (!naoMarcados) {
      Alert.alert('Tudo certo!', 'Todos os ingredientes foram marcados.');
      return;
    }

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_nhoque.txt';

    try {
      await FileSystem.writeAsStringAsync(fileUri, naoMarcados, {
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
        source={require('../assets/images/fundo_nhoque.png')} // Troque pela imagem correta
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('dietas')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Nhoque de <br />Banana-da-Terra</Text>
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
        <View>
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
        </View>

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
    top: 90,
    left: 57,
    marginBottom: 99,
  },
  ingredientes: {
    marginTop: 50,
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
    top: 120,
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
