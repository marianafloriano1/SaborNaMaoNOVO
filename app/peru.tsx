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

export default function PeruABrasileira() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false, item2: false, item3: false, item4: false, item5: false,
    item6: false, item7: false, item8: false, item9: false, item10: false,
    item11: false, item12: false, item13: false, item14: false, item15: false,
    item16: false, item17: false, item18: false, item19: false, item20: false,
    step1: false, step2: false, step3: false, step4: false, step5: false,
    step6: false, step7: false, step8: false, step9: false, step10: false,
    step11: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: '1 peru de 4 kg',
    item2: '750ml de vinho branco',
    item3: '1 xícara de margarina',
    item4: '5 dentes de alho',
    item5: 'Sal',
    item6: '1 colher de sopa de mostarda',
    item7: '3 xícaras de caldo de galinha',
    item8: '2 cebolas',
    item9: 'Molho de pimenta',
    item10: '1 colher de sopa de cebolinha',
    item11: '1 colher de sopa de farinha de rosca',
    item12: '1 caldo de galinha em pó',
    item13: '1/2 xícara de azeite de oliva',
    item14: '2 cebolas raladas',
    item15: 'Pimenta do reino',
    item16: '1 colher de sopa de salsinha',
    item17: '1 banana em cubos',
    item18: '1/2 xícara de óleo',
    item19: '2 xícaras de farinha de milho',
    item20: 'Miúdos de Peru',
  };

  const steps = [
    'Bata no liquidificador: 1 xícara de vinho, 1 xícara de caldo de galinha, a cebola em pedaços, alho, mostarda, molho de pimenta, a margarina ou manteiga e o sal.',
    'Coloque em um refratário e acrescente o restante do vinho e do caldo de galinha, misture bem e reserve.',
    'Em fogo baixo refogue os miúdos cortados em pedaços menores da mistura de óleo e azeite, até mudarem de cor.',
    'Adicione o milho, o caldo de galinha, as bananas, as farinhas peneiradas e a pimenta, sem parar de mexer, até formar uma farofa solta e úmida.',
    'Retire do fogo, acrescente o tempero verde e recheie o peru.',
    'Coloque o peru na assadeira sem untar.',
    'Cubra com papel alumínio e leve ao forno por volta de 1 hora e meia, regando constantemente com o molho da assadeira.',
    'Retire o papel alumínio para dourar por mais 1 hora e meia aproximadamente, continue regando com o molho.',
    'Coloque no refratário de servir e decore com farofa e tempero verde.',
    '(Passo repetido, pode ajustar se quiser)',
    '(Passo repetido, pode ajustar se quiser)',
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_peru.txt';

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
        source={require('../assets/images/fundo_peru.png')} // ajuste o caminho da imagem
      >
        <View style={styles.tituloContainer}>
          <TouchableOpacity onPress={() => nav.navigate('natal')}>
            <Feather name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.paragraph}>PERU À{"\n"}BRASILEIRA</Text>
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
          <TouchableOpacity
            key={`step${index + 1}`}
            onPress={() => toggleCheck(`step${index + 1}`)}
          >
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
    height: '50%',
    backgroundColor: '#ECECEC',
  },
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 90,
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 22,
    color: '#242424',
    textTransform: 'uppercase',
    marginLeft: 5,
    width: 240,
    lineHeight: 26,
  },
  ingredientes: {
    marginTop: 100,
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
    fontSize: 14,
    color: '#444',
  },
  check: {
    color: '#32CD32',
    fontSize: 20,
    marginRight: 5,
  },
  bolinha: {
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginTop: 40,
  },
  botaoVerde: {
    flex: 1,
    backgroundColor: '#009B4D',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCinza: {
    flex: 1,
    backgroundColor: '#2F4B54',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeBotao: {
    marginRight: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
});
