import React, { useState, useMemo } from 'react';
import { View, Text, Image, TextInput, Alert, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_STORAGE_KEY = '@usuarios_registrados';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = async () => {
    try {
      // Buscar usuários registrados
      const usuariosRegistrados = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      
      if (!usuariosRegistrados) {
        Alert.alert('Erro', 'Nenhum usuário registrado encontrado!');
        return;
      }

      const usuarios = JSON.parse(usuariosRegistrados);
      
      // Buscar usuário com email e senha correspondentes
      const usuarioEncontrado = usuarios.find(
        usuario => usuario.email === email.trim().toLowerCase() && usuario.senha === senha.trim()
      );

      if (usuarioEncontrado) {
        Alert.alert(
          'Sucesso', 
          `Bem-vindo, ${usuarioEncontrado.nome}!`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Limpar campos após login bem-sucedido
                setEmail('');
                setSenha('');
                // Aqui você pode navegar para uma tela principal se existir
                // navigation.navigate('Home');
              }
            }
          ]
        );
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível verificar as credenciais. Tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  const validarEmail = (email) => {
    return email.includes('@') && email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1;
  };

  const listarUsuarios = async () => {
    try {
      const usuariosRegistrados = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      
      if (!usuariosRegistrados) {
        Alert.alert('Informação', 'Nenhum usuário registrado encontrado!');
        return;
      }

      const usuarios = JSON.parse(usuariosRegistrados);
      
      if (usuarios.length === 0) {
        Alert.alert('Informação', 'Nenhum usuário registrado encontrado!');
        return;
      }

      const listaUsuarios = usuarios.map(usuario => 
        `• ${usuario.nome} (${usuario.email})`
      ).join('\n');

      Alert.alert(
        `Usuários Registrados (${usuarios.length})`,
        listaUsuarios,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a lista de usuários.');
      console.error('Erro ao listar usuários:', error);
    }
  };

  const camposPreenchidos = useMemo(() => {
    return email.trim().length > 0 && senha.trim().length > 0 && validarEmail(email);
  }, [email, senha]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/bk_logo.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={[styles.input, email.length > 0 && !validarEmail(email) && styles.inputError]}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {email.length > 0 && !validarEmail(email) && (
        <Text style={styles.errorText}>Email deve conter @ e ter formato válido</Text>
      )}

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={styles.buttonArea}>
        <TouchableOpacity 
          style={[styles.button, camposPreenchidos ? styles.buttonEnabled : styles.buttonDisabled]} 
          onPress={realizarLogin} 
          disabled={!camposPreenchidos}
        >
          <Text style={[styles.buttonText, camposPreenchidos ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>
            ENTRAR
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linksContainer}>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Registrar-se</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.link}>Redefinir a Senha</Text>
        </Pressable>

        <Pressable onPress={listarUsuarios}>
          <Text style={[styles.link, styles.listUsersLink]}>Ver Usuários Registrados</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  image: { width: 300, height: 200, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#222', marginBottom: 30 },
  label: { alignSelf: 'flex-start', fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { width: '100%', height: 48, borderWidth: 1, borderColor: '#aaa', borderRadius: 8, paddingHorizontal: 12, fontSize: 16, marginBottom: 16 },
  inputError: { borderColor: '#ff0000', borderWidth: 2 },
  errorText: { color: '#ff0000', fontSize: 12, alignSelf: 'flex-start', marginTop: -12, marginBottom: 8 },
  buttonArea: { width: '100%', marginTop: 8, marginBottom: 20 },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextEnabled: {
    color: '#ffffff',
  },
  buttonTextDisabled: {
    color: '#666666',
  },
  linksContainer: { alignItems: 'center', gap: 15 },
  link: { fontSize: 16, color: '#007AFF', textDecorationLine: 'underline' },
  listUsersLink: { color: '#28a745', fontSize: 14 },
});
