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

export default function TortaDeLegumesRicota() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false, item2: false, item3: false, item4: false, item5: false,
    item6: false, item7: false, item8: false, item9: false, item10: false,
    item11: false, item12: false, item13: false, item14: false, item15: false,
    item16: false, item17: false, item18: false, item20: false, item21: false,
    item22: false,
    step1: false, step2: false, step3: false, step4: false,
    step5: false, step6: false, step7: false, step8: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: '1 xícara (chá) de leite.',
    item2: '1 xícara (chá) de óleo.',
    item3: '4 ovos.',
    item4: 'Sal à gosto.',
    item5: '1 xícara (chá) de farinha \nde trigo.',
    item6: '1 xícara (chá) de farinha de \ntrigo integral.',
    item7: '1 colher (sopa) de fermento em pó químico.',
    item8: 'Margarina e farinha de trigo para untar.',
    item9: 'Queijo parmesão ralado a gosto para polvilhar.',
    item10: '1 abobrinha picada.',
    item11: '1 cenoura cozida picada.',
    item12: '2 xícaras (chá) de brócolis cozido picado.',
    item13: '1 tomate sem sementes picado.',
    item14: '1 cebola em rodelas finas.',
    item15: '1/2 berinjela em cubos cozida.',
    item16: '2 colheres (sopa) de manjericão picado.',
    item17: '4 colheres (sopa) de manteiga.',
    item18: '2 dentes de alho picados.',
    item20: '1 xícara (chá) de ricota amassada.',
    item21: '1 lata de creme de leite.',
    item22: '1 copo de requeijão cremoso (200g).',
  };

  const steps = [
    'Para o recheio, em uma tigela, misture a abobrinha, a cenoura, o brócolis, o tomate, a cebola, a berinjela e o manjericão.',
    'Em uma panela, derreta a manteiga e refogue o alho por 2 minutos.',
    'Despeje sobre os legumes, misture e tempere com sal e pimenta.',
    'Para o creme, bata os ingredientes no liquidificador e reserve.',
    'Para a massa, bata no liquidificador o leite, o óleo, os ovos, sal, as farinhas e o fermento.',
    'Espalhe metade da massa em uma fôrma de 25cm x 35cm untada e enfarinhada.',
    'Espalhe os legumes sobre a massa e cubra com o creme de ricota.',
    'Cubra com a massa restante, polvilhe com parmesão e leve ao forno médio (180º C), preaquecido, por 40 minutos ou até dourar. Sirva.',
  ];

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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_torta_legumes.txt';

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
        source={require('../assets/images/fundo_torta.png')} // Troque pela imagem que desejar
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('dietas')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Torta de {"\n"}Legumes e Ricota</Text>
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
        {steps.map((step, index) => (
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
    marginTop: 100,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    top: 7,
  },
});
