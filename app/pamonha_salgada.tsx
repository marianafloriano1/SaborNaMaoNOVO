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

export default function PamonhaSalgada() {
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
    item1: '10 espigas de milho \ncom as palhas',
    item2: '200 ml de óleo',
    item3: '1 pitada de açúcar',
    item4: '10 tiras de queijo coalho',
    item5: '1 colher de sopa de sal',
  };

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const salvarListaDeCompras = async () => {
    // Ingredientes não marcados
    const naoSelecionados = Object.keys(itemsMap)
      .filter((key) => !checkedItems[key])
      .map((key) => `- ${itemsMap[key]}`)
      .join('\n');

    if (!naoSelecionados) {
      Alert.alert('Tudo certo!', 'Todos os ingredientes foram marcados.');
      return;
    }

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_pamonha_salgada.txt';

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
        source={require('../assets/images/fundo_pamonha.png')} // coloque a imagem que quiser
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('arraia')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Pamonha Salgada</Text>
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

        <TouchableOpacity onPress={() => toggleCheck('step1')}>
          <Text style={styles.topicos}>
            {checkedItems.step1 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Descasque o milho, separando as palhas boas, maiores e limpas.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step2')}>
          <Text style={styles.topicos}>
            {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Rale as espigas ou retire os grãos cortando com uma faca e bata no liquidificador para chegar ao mesmo efeito de milho ralado.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step3')}>
          <Text style={styles.topicos}>
            {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Coe o milho ralado em uma peneira grossa.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step4')}>
          <Text style={styles.topicos}>
            {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Acrescente o óleo bastante quente, o sal e o açúcar.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step5')}>
          <Text style={styles.topicos}>
            {checkedItems.step5 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Pegue a palha limpa e sem defeitos, dobre-a formando um copinho.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step6')}>
          <Text style={styles.topicos}>
            {checkedItems.step6 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Coloque a tira do queijo no meio da massa.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step7')}>
          <Text style={styles.topicos}>
            {checkedItems.step7 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Pegue outra palha para fechar o copinho, da mesma maneira.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step8')}>
          <Text style={styles.topicos}>
            {checkedItems.step8 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Amarre com tiras da própria palha, com liga de borracha ou barbante.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCheck('step9')}>
          <Text style={styles.topicos}>
            {checkedItems.step9 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Deixe as pamonhas em água fervente por 30 minutos e pronto.
          </Text>
        </TouchableOpacity>

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
        backgroundColor: '#ececec'

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    paragraph: {
        fontSize: 22,
        color: '#242424',
        textTransform: 'uppercase',
        top: 60,
        left: 37,
        marginBottom: 90
    },

    ingredientes: {
        marginTop: 40,
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
        top: 10
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
        top: 90
    },

    botaoSalvar: {
        backgroundColor: '#2F4B54',
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        width: 200,
        resizeMode: 'contain',
        marginLeft: 'auto',
        height: 60
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        top: 7
    },
});