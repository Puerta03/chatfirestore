import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { bancoExterno } from './firebaseConnection';
import { doc, getDoc, onSnapshot, setDoc, addDoc, collection } from 'firebase/firestore';

export default function App() {
  const [nome, setNome] = useState('Carregando...');
  const [nome2, setNome2] = useState('');
  const [tv, setTv] = useState('');
  const [geladeira, setGeladeira] = useState('');
  const [fogao, setFogao] = useState('');

  useEffect(() => {
    async function pegarDados() {
      const referencia = doc(bancoExterno, "aparelhos", "1");

      getDoc(referencia)
        .then((snap) => {
          setNome(snap.data()?.TV);
        })
        .catch((erro) => {
          console.log(erro);
        });

      onSnapshot(doc(bancoExterno, "aparelhos", "1"), (snap) => {
        setNome2(snap.data()?.Geladeira);
      });
    }
    pegarDados();
  }, []);

  async function addBancoExterno() {
    await setDoc(doc(bancoExterno, "aparelhos", "2"), {
      TV: tv,
      Geladeira: geladeira,
      Fogão: fogao
    });
  }

  async function addBancoExterno2() {
    await addDoc(collection(bancoExterno, "aparelhos"), {
      TV: tv,
      Geladeira: geladeira,
      Fogão: fogao
    })  
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Mensagens: {nome} {nome2}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Modelo da TV"
        value={tv}
        onChangeText={setTv}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo da Geladeira"
        value={geladeira}
        onChangeText={setGeladeira}
      />

      <TouchableOpacity style={{ backgroundColor: "#895B7F" }} onPress={addBancoExterno}>
        <Text style={{ fontSize: 20, paddingHorizontal: 15, color:'white' }}>Adicionar (setDoc)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: "#5E2F54" }} onPress={addBancoExterno2}>
        <Text style={{ fontSize: 20, paddingHorizontal: 15, color:'white' }}>Adicionar (addDoc)</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEB1D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor:'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
    marginTop: 20,
  },
});