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

export default function CoelhoDeChocolate() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false,
    item3: false,
    item8: false,
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
    item1: '250 gramas de chocolate \nmeio amargo em pedaços',
    item3: '1 xícara (chá) de \nchocolate branco picado',
    item8: 'Gota de corante comestível \n(anilina) variado a gosto',
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_coelho_de_chocolate.txt';

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
        source={require('../assets/images/fundo_coelho.png')} // Pode trocar para uma imagem apropriada
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('pascoa')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Coelho de Chocolate</Text>
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
            Derreta o chocolate meio amargo no micro-ondas por 3 minutos na potência média.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step2')}>
          <Text style={styles.topicos}>
            {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Retire do forno e mexa até acabar de derreter.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step3')}>
          <Text style={styles.topicos}>
            {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Transfira para um refratário limpo e bem seco, e mexa o chocolate até que, ao encostar um pouco nos lábios, dê a sensação de frio.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step4')}>
          <Text style={styles.topicos}>
            {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Preencha formas para pirulito no formato de coelhinhos com o chocolate derretido e coloque o palito no lugar indicado.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step5')}>
          <Text style={styles.topicos}>
            {checkedItems.step5 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Leve à geladeira e deixe secar até a forma ficar opaca.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step6')}>
          <Text style={styles.topicos}>
            {checkedItems.step6 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Retire a forma da geladeira e desenforme com cuidado.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step7')}>
          <Text style={styles.topicos}>
            {checkedItems.step7 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Deixe secar completamente.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step8')}>
          <Text style={styles.topicos}>
            {checkedItems.step8 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Derreta o chocolate branco no banho-maria e retire do fogo.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step9')}>
          <Text style={styles.topicos}>
            {checkedItems.step9 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Use o chocolate branco para fazer os detalhes do coelho.
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
        top: 70,
        left: 37,
        marginBottom: 90
  },

  ingredientes: {
    marginTop: 40,
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
    top: 100
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
