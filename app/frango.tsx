import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type CheckedItems = { [key: string]: boolean };

export default function FrangoAssado() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false, item2: false, item3: false, item4: false, item5: false,
    item6: false, item7: false, item8: false, item9: false,
    step1: false, step2: false, step3: false, step4: false,
    step5: false, step6: false, step7: false, step8: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: '1 frango inteiro, \ncortado em pedaços',
    item2: 'Sal à gosto',
    item3: 'Orégano à gosto',
    item4: '6 dentes de alho amassado e picado',
    item5: 'Pimenta-do-reino a gosto',
    item6: '1/2 xícara (chá) de vinagre',
    item7: 'Orégano a gosto',
    item8: 'Sal à gosto',
    item9: '2 colheres (sopa) de maionese bem cheias',
  };

  const stepsMap: { [key: string]: string } = {
    step1: 'Coloque o frango em uma travessa e tempere com o alho, sal, pimenta-do-reino, orégano e o vinagre.',
    step2: 'Deixe marinar por cerca de 2 horas dentro da geladeira.',
    step3: 'Coloque as batatas em uma panela com água e leve para ferver.',
    step4: 'Não cozinhar demais, deixar bem firmes.',
    step5: 'Escorra a água e misture o sal, o orégano e a maionese.',
    step6: 'Unte uma forma com óleo.',
    step7: 'Coloque o frango e por cima as batatas.',
    step8: 'Leve ao forno médio por 1h30 a 2h ou até dourar.',
  };

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_frango.txt';

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
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/fundo_frango.png')} // imagem igual do Feijoada, mas para frango
          style={styles.decorativeImage}
          resizeMode="contain"
        />

        <View style={styles.tituloContainer}>
          <TouchableOpacity onPress={() => nav.navigate('almoco_domingo')}>
            <Feather name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.paragraph}>FRANGO ASSADO{"\n"}COM BATATAS</Text>
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
        {Object.entries(stepsMap).map(([key, label], index) => (
          <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
            <Text style={styles.topicos}>
              {checkedItems[key] ? (
                <Text style={styles.check}>✓ </Text>
              ) : (
                <Text style={styles.bolinha}>⚪ </Text>
              )}
              {index + 1}. {label}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botaoVerde}>
            <Feather name="refresh-cw" size={20} color="#fff" style={styles.iconeBotao} />
            <Text style={styles.textoBotao}>Forma correta descarte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCinza} onPress={salvarListaDeCompras}>
            <Feather name="download" size={20} color="#FFCC00" style={styles.iconeBotao} />
            <Text style={styles.textoBotao}>Baixar lista de compra</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  decorativeImage: {
    position: 'absolute',
    left: 102,
    top: 0,
    right: 0,
    width: 350,
    height: 720,
    zIndex: 0,
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
