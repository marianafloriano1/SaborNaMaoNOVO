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

export default function QuicheDeLegumes() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false, item2: false, item3: false, item4: false,
    item5: false, item6: false, item7: false, item8: false,
    item9: false, item10: false, item11: false,
    step1: false, step2: false, step3: false, step4: false,
    step5: false, step6: false, step7: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: '1 pacote de massa folhada',
    item2: '3 ovos',
    item3: '1 lata de creme de leite',
    item4: '1/2 xícara (chá) de \nbrócolis cozido e picado',
    item5: '1 xícara (chá) de \nqueijo mussarela ralado',
    item6: '1/2 xícara (chá) de queijo \nprovolone ralado',
    item7: '1/2 xícara (chá) de tomate seco picado',
    item8: '2 colheres (sopa) de cheiro-verde picado',
    item9: '1 colher (chá) de sal',
    item10: 'Pimenta-do-reino e noz-moscada a gosto',
    item11: '3 colheres (sopa) de queijo parmesão ralado',
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_quiche.txt';

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
        source={require('../assets/images/fundo_quiche.png')} // Altere aqui para a imagem de fundo correta
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('dietas')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Quiche de Legumes</Text>
        </View>

        <Text style={styles.ingredientes}>INGREDIENTES</Text>
        <View style={styles.ingredientesContainer}>
          <View>
            {Object.entries(itemsMap).map(([key, label]) => (
              <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
                <Text style={styles.topicos}>
                  {checkedItems[key] ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.ingredientes}>MODO DE PREPARO</Text>
        {[
          'Forre o fundo e a lateral de uma forma com a massa folhada.',
          'Corte o excesso e fure com um garfo.',
          'Bata os ovos com o creme de leite.',
          'Adicione o brócolis, queijos, tomate seco, cheiro-verde, sal e temperos.',
          'Misture bem e coloque sobre a massa.',
          'Polvilhe com parmesão e asse a 180ºC por 30 minutos.',
          'Desenforme morna e sirva.'
        ].map((step, index) => (
          <TouchableOpacity key={`step${index + 1}`} onPress={() => toggleCheck(`step${index + 1}`)}>
            <Text style={styles.topicos}>
              {checkedItems[`step${index + 1}`] ? (
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
    height: '110%',
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
    left: 37,
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
    top: 100,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    top: 7,
  },
});
