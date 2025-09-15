import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_STORAGE_KEY = '@usuarios_registrados';

export default function RegisterScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  const validarEmail = (value) => {
    return value.includes('@') && value.indexOf('@') > 0 && value.indexOf('@') < value.length - 1;
  };
  
  // Usar useMemo para garantir que a validação seja reativa
  const camposPreenchidos = useMemo(() => {
    return cpf.trim().length > 0 && 
           nome.trim().length > 0 && 
           email.trim().length > 0 && 
           senha.trim().length > 0 && 
           validarEmail(email.trim());
  }, [cpf, nome, email, senha]);

  const handleSalvar = async () => {
    try {
      // Buscar usuários existentes
      const usuariosExistentes = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      let usuarios = usuariosExistentes ? JSON.parse(usuariosExistentes) : [];

      // Verificar se o email já existe
      const emailJaExiste = usuarios.some(usuario => usuario.email === email);
      if (emailJaExiste) {
        Alert.alert('Erro', 'Este email já está cadastrado!');
        return;
      }

      // Verificar se o CPF já existe
      const cpfJaExiste = usuarios.some(usuario => usuario.cpf === cpf);
      if (cpfJaExiste) {
        Alert.alert('Erro', 'Este CPF já está cadastrado!');
        return;
      }

      // Criar novo usuário
      const novoUsuario = {
        id: Date.now(),
        cpf: cpf.trim(),
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha.trim(),
        dataRegistro: new Date().toISOString()
      };

      // Adicionar à lista e salvar
      usuarios.push(novoUsuario);
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));

      Alert.alert(
        'Sucesso', 
        'Usuário registrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpar campos
              setCpf('');
              setNome('');
              setEmail('');
              setSenha('');
              navigation.navigate('Login');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o usuário. Tente novamente.');
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Cadastro</Text>

        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
            placeholder="Digite seu Nome"
            value={nome}
            onChangeText={setNome}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          ref={emailRef}
          style={[styles.input, email.length > 0 && !validarEmail(email) && styles.inputError]}
          placeholder="Digite seu Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => senhaRef.current?.focus()}
        />
        {email.length > 0 && !validarEmail(email) && (
          <Text style={styles.errorText}>Email inválido</Text>
        )}

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          ref={senhaRef}
          style={styles.input}
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <View style={styles.buttonArea}>
          <TouchableOpacity 
            style={[styles.button, camposPreenchidos ? styles.buttonEnabled : styles.buttonDisabled]} 
            onPress={handleSalvar} 
            disabled={!camposPreenchidos}
          >
            <Text style={[styles.buttonText, camposPreenchidos ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Voltar para Login</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
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
  link: { fontSize: 16, color: '#007AFF', textDecorationLine: 'underline' },
});
