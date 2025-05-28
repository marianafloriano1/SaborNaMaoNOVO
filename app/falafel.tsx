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

export default function FalafelVegano() {
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
    item11: false,
    item12: false,
    item13: false,
    item14: false,
    item15: false,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: '1 copo de grão de \nbico seco.',
    item2: '2 dentes de alho \npicados.',
    item3: '1/2 cebola média picada.',
    item4: '1 colher de sopa de cominho.',
    item5: '1 copo de salsinha fresca picada.',
    item6: '1-2 colheres de chá de sal.',
    item7: '1/2 colher de chá de pimenta do reino.',
    item8: '1 colher de sopa de suco de limão.',
    item9: '4 colheres de sopa de azeite de oliva.',
    item10: '2 colheres de sopa de farinha de trigo.',
    item11: '1/4 copo folhas de hortelã.',
    item12: '3 colheres de sopa de azeite.',
    item13: '1/2 limão.',
    item14: 'Pitada de sal.',
    item15: '3/4 copo de tahine (pasta de gergelim).',
  };

  const stepsMap: { [key: string]: string } = {
    step1: 'Deixe o grão de bico de molho durante a noite, cerca de 8 horas em temperatura ambiente. Escorra a água.',
    step2: 'Bata o grão de bico com sal no processador para pegar sabor e depois, acrescente os demais ingredientes.',
    step3: 'Para o bolinho não desmanchar, acrescente a farinha de trigo (para fazer bolinhos assados a farinha não é necessária).',
    step4: 'Monte os bolinhos e frite em óleo quente.',
    step5: 'Bater todos os ingredientes no processador e acrescentar um pouco de água para chegar na consistência de molho.',
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_falafel.txt';

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
        source={require('../assets/images/fundo_falafel.png')} // coloque a imagem de fundo correta
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('dietas')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Falafel Vegano</Text>
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
    height: '70%',
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

