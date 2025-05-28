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

export default function FarofaDeOvo() {
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
  });

  const itemsMap: { [key: string]: string } = {
    item1: '300 g de farinha de \nmandioca',
    item2: '4 colheres de manteiga',
    item3: '5 ovos',
    item4: '1 colher de sal',
    item5: '1 cebola',
  };

  const stepsMap: { [key: string]: string } = {
    step1: 'Corte em pedacinhos a cebola.',
    step2: 'Coloque em uma frigideira junto com a manteiga.',
    step3: 'Deixe dourar.',
    step4: 'Adicione o sal e o ovo e mexa até fritar.',
    step5: 'Acrescente aos poucos a farinha.',
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
      .join('\n');

    if (!naoSelecionados) {
      Alert.alert('Tudo certo!', 'Todos os ingredientes foram marcados.');
      return;
    }

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_farofa_de_ovo.txt';

    try {
      await FileSystem.writeAsStringAsync(fileUri, naoSelecionados, {
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
        source={require('../assets/images/fundo_farofa.png')} // Substitua pela imagem correta
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('natal')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Farofa de Ovo</Text>
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

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarListaDeCompras}>
          <Text style={styles.textoBotao}>Baixar Lista de Compras</Text>
        </TouchableOpacity>
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
    top: 40,
    left: 60,
    marginBottom: 90
  },
  ingredientes: {
    marginTop: 60,
    fontSize: 18,
    marginBottom: 20,
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
    width: 290,
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
    top: 70,
    left: 20,
  },
  botaoSalvar: {
    backgroundColor: '#2F4B54',
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    width: 200,
    resizeMode: 'contain',
    marginLeft: 'auto',
    height: 60,
    marginTop: 40,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    top: 7,
  },
});
