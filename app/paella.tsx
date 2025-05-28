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

type CheckedItems = { [key: string]: boolean };

export default function Paella() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false, item2: false, item3: false, item4: false, item5: false, item6: false,
    item7: false, item8: false, item9: false, item10: false, item11: false, item12: false,
    item13: false, item14: false, item15: false, item16: false, item17: false, item18: false,
    item19: false, item20: false, item21: false,
    step1: false, step2: false, step3: false, step4: false, step5: false, step6: false,
    step7: false, step8: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: '1 fio de óleo',
    item2: '1 fio de azeite',
    item3: '1 cebola picada',
    item4: '500g de lula',
    item5: '400g de camarão 7 \nbarbas descascado',
    item6: '300g de camarão rosa descascado',
    item7: 'Sal à gosto',
    item8: '2 tomates sem sementes em cubos',
    item9: '60g de pimentão amarelo picado',
    item10: 'Meia pimenta dedo-de-moça picada sem sementes',
    item11: '1 colher de sopa de páprica doce',
    item12: '1,5L de caldo de camarão',
    item13: '400g de polvo',
    item14: '250g de marisco',
    item15: '60g de pimentão vermelho em tiras',
    item16: '60g de pimentão amarelo em tiras',
    item17: '100g de ervilha',
    item18: 'Meio maço de salsa picada',
    item19: '5 xícaras de chá de arroz parboilizado',
    item20: '1 colher de sopa de açafrão',
    item21: '5 camarões grandes',
  };

  const stepsMap: { [key: string]: string } = {
    step1: 'Em uma paejeira adicione o óleo, o azeite, as cebolas picadas, a lula e refogue bem.',
    step2: 'Acrescente o camarão 7 barbas, o camarão rosa, o sal e continue refogando.',
    step3: 'Adicione tomate, pimentão amarelo, pimenta, páprica doce e misture bem.',
    step4: 'Coloque o arroz parboilizado e não mexa.',
    step5: 'Dissolva o açafrão no caldo de camarão e cubra o arroz.',
    step6: 'Cozinhe por 30 minutos e adicione mais caldo se necessário.',
    step7: 'Decore com camarões grandes, polvo, marisco, pimentões e ervilha.',
    step8: 'Desligue o fogo e cubra com papel alumínio por 10 minutos.',
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

    const fileUri = FileSystem.documentDirectory + 'lista_de_compras_paella.txt';

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
        source={require('../assets/images/fundo_paella.png')} // Altere conforme sua imagem
      >
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('almoco_domingo')}>
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.paragraph}>Paella</Text>
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
              {checkedItems[key] ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}
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
      </ImageBackground>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '60%',
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
    left: 40,
    marginBottom: 80
    
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
    marginBottom: 20,
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
