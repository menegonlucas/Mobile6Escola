import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Botao from '../components/Botao';

export default function TurmaAtividades({ route, navigation }) {
  const { turma } = route.params;
  const [atividades, setAtividades] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    loadUserData();
    loadAtividades();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setProfessor(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const loadAtividades = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://SEU_IP:3000/turmas/${turma.id}/atividades`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAtividades(data);
      }
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAtividades();
    setRefreshing(false);
  };

  const renderAtividade = ({ item, index }) => (
    <View style={styles.atividadeCard}>
      <Text style={styles.atividadeNumero}>{index + 1}</Text>
      <Text style={styles.atividadeDescricao}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title={professor?.nome || 'Professor'} 
        onLogout={handleLogout}
      />
      
      <View style={styles.content}>
        <Text style={styles.turmaTitle}>{turma.nome}</Text>
        
        <Botao 
          title="Cadastrar Atividade"
          onPress={() => navigation.navigate('CadastroAtividade', { turma })}
          style={styles.cadastroButton}
        />

        <Text style={styles.sectionTitle}>Atividades</Text>
        
        <FlatList
          data={atividades}
          renderItem={renderAtividade}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.atividadesList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma atividade cadastrada</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  turmaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  cadastroButton: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  atividadesList: {
    flex: 1,
  },
  atividadeCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  atividadeNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
    color: '#333',
    minWidth: 30,
  },
  atividadeDescricao: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 50,
  },
});