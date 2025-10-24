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

export default function CadastroAtividade({ route, navigation }) {
  const { turma } = route.params;
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!descricao.trim()) {
      Alert.alert('Erro', 'Por favor, informe a descrição da atividade');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://SEU_IP:3000/turmas/${turma.id}/atividades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          descricao: descricao,
          turma_id: turma.id 
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Atividade cadastrada com sucesso');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar atividade');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar atividade');
      console.error('Erro cadastro atividade:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nova Atividade</Text>
        <Text style={styles.turmaInfo}>Turma: {turma.nome}</Text>
        <Text style={styles.subtitle}>
          Informe a descrição da atividade e confirme para cadastrar.
        </Text>

        <Text style={styles.label}>Descrição da atividade</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite a descrição da atividade"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
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
  turmaInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
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
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 30,
  },
});