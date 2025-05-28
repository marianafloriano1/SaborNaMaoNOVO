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

export default function BoboDeCamarao() {
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
    item1: '1 kg de camarão fresco',
    item2: '3 dentes de alho \npicados e amassados',
    item3: '6 colheres (sopa) de \nazeite de oliva',
    item4: '1 maço de cheiro-verde picado',
    item5: '2 latas de molho pronto de tomate',
    item6: '2 colheres (sopa) de azeite de dendê',
    item7: '2 pimentões verdes bem picadinhos',
    item8: 'Sal a gosto',
    item9: 'Suco de 1 limão',
    item10: '1 kg de mandioca',
    item11: '1 folha de louro',
    item12: '2 vidros de leite de coco',
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_bobo_de_camarao.txt';

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
        source={require('../assets/images/fundo_bobo.png')} // Coloque uma imagem de fundo correspondente
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('pascoa')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Bobó de Camarão</Text>
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
            Lave os camarões e tempere com sal, alho, pimenta e limão, deixe marinar.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step2')}>
          <Text style={styles.topicos}>
            {checkedItems.step2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Cozinhe a mandioca em pedacinhos, com louro e a cebola em rodelas.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step3')}>
          <Text style={styles.topicos}>
            {checkedItems.step3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Quando estiver mole, acrescente um vidro de leite de coco.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step4')}>
          <Text style={styles.topicos}>
            {checkedItems.step4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Deixe esfriar um pouco e bata no liquidificador.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step5')}>
          <Text style={styles.topicos}>
            {checkedItems.step5 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Esquente o azeite de oliva, junte a cebola ralada e deixe dourar.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step6')}>
          <Text style={styles.topicos}>
            {checkedItems.step6 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Acrescente os camarões e frite.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step7')}>
          <Text style={styles.topicos}>
            {checkedItems.step7 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Acrescente o molho de tomate e deixe cozinhar por 5 minutos.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step8')}>
          <Text style={styles.topicos}>
            {checkedItems.step8 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Junte o azeite de dendê, misture bem e cozinhe por mais 10 minutos.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleCheck('step9')}>
          <Text style={styles.topicos}>
            {checkedItems.step9 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
            Sirva quente, decorado com cheiro-verde.
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
    height: '70%',
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
        top: 80,
        left: 40,
        marginBottom: 90,
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
    top: 110
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
