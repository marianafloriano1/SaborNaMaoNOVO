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

export default function App() {
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
    item16: false,
    item17: false,
    item18: false,
    item19: false,
    item20: false,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    step9: false,
    step10: false,
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras.txt';

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
      <ImageBackground style={styles.container} source={require('../assets/images/fundo_peru.png')}>

        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('natal')}>
          <Feather style={styles.seta} name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Peru à Brasileira</Text>
        </View>
        <Text style={styles.ingredientes}>INGREDIENTES</Text>
        <View style={styles.ingredientesContainer}>
          <View>
            {Object.entries(itemsMap).map(([key, label]) => (
              <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
                <Text style={styles.topicos}>
                  {checkedItems[key] ? (
                    <Text style={styles.check}>✓</Text>
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
        <TouchableOpacity onPress={() => toggleCheck('step1')}>
          <Text style={styles.topicos}>
            {checkedItems.step1 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>} Bata no liquidificador: 1 xícara de vinho, 1 xícara de caldo de galinha, a cebola em pedaços, alho, mostarda, molho de pimenta, a margarina ou manteiga e o sal.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step2')}>
          <Text style={styles.topicos}>
            {checkedItems.step2 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>} Coloque em um refratário e acrescente o restante do vinho e do caldo de galinha, misture bem e reserve.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step3')}>
          <Text style={styles.topicos}>
            {checkedItems.step3 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>}  Em fogo baixo refogue os miúdos cortados em pedaços menores da mistura de óleo e azeite, até mudarem de cor.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step4')}>
          <Text style={styles.topicos}>
            {checkedItems.step4 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>}  Adicione o milho, o caldo de galinha, as bananas, as farinha peneiradas e a pimenta, sem parar de mexer, até formar uma farofa solta e úmida.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step5')}>
          <Text style={styles.topicos}>
            {checkedItems.step5 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>}  Retire do fogo, acrescente o tempero verde e recheie o peru.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step6')}>
          <Text style={styles.topicos}>
            {checkedItems.step6 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>} Coloque o peru na assadeira sem untar.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step7')}>
          <Text style={styles.topicos}>
            {checkedItems.step7 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>}  Cubra com papel alumínio e leve ao forno por volta de 1 hora e meia, regando constantemente com o molho da assadeira.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step8')}>
          <Text style={styles.topicos}>
            {checkedItems.step8 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>} Retire o papel alumínio para dourar por mais 1 hora e meia aproximadamente, continue regando com o molho.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step9')}>
          <Text style={styles.topicos}>
            {checkedItems.step9 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>} Coloque no refratário de servir e decore com farofa e tempero verde.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step10')}>
          <Text style={styles.topicos}>
            {checkedItems.step10 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>} Coloque em um refratário e acrescente o restante do vinho e do caldo de galinha, misture bem e reserve.
          </Text>
        </TouchableOpacity>  <TouchableOpacity onPress={() => toggleCheck('step11')}>
          <Text style={styles.topicos}>
            {checkedItems.step11 ? <Text style={styles.check}>✓</Text> : <Text style={styles.bolinha}>⚪ </Text>}  Coloque em um refratário e acrescente o restante do vinho e do caldo de galinha, misture bem e reserve.
          </Text>
        </TouchableOpacity>

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
    top: 80,
    left: 50
  },

  ingredientes: {
    marginTop: 140,
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
    width: 290
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
    top: 55
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
