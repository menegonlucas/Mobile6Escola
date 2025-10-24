import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botao from '../components/Botao';

export default function CadastroTurma({ navigation }) {
  const [nomeTurma, setNomeTurma] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!nomeTurma.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome da turma');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch('http://SEU_IP:3000/turmas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nome: nomeTurma }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Turma cadastrada com sucesso');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar turma');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar turma');
      console.error('Erro cadastro turma:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nova Turma</Text>
        <Text style={styles.subtitle}>
          Informe o nome da turma e confirme para cadastrar.
        </Text>

        <Text style={styles.label}>Nome da turma</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da turma"
          value={nomeTurma}
          onChangeText={setNomeTurma}
        />

        <Botao 
          title="Salvar" 
          onPress={handleSalvar}
          loading={loading}
          style={styles.saveButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
  },
});