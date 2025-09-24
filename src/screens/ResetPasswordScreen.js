import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_STORAGE_KEY = '@usuarios_registrados';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const senhaRef = useRef(null);
  const confirmarRef = useRef(null);

  const validarEmail = (v) => v.includes('@') && v.indexOf('@') > 0 && v.indexOf('@') < v.length - 1;
  const validar = useMemo(() => {
    return validarEmail(email.trim()) && senha.trim().length > 0 && confirmarSenha.trim().length > 0;
  }, [email, senha, confirmarSenha]);

  const handleSalvar = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Senhas não são iguais');
      senhaRef.current?.focus();
      return;
    }
    try {
      const data = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const usuarios = data ? JSON.parse(data) : [];
      const idx = usuarios.findIndex(u => u.email === email.trim().toLowerCase());

      if (idx === -1) {
        Alert.alert('Erro', 'Email não encontrado.');
        return;
      }

      usuarios[idx] = { ...usuarios[idx], senha: senha.trim() };
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));

      Alert.alert('Sucesso', 'Senha redefinida com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (e) {
      console.error('Erro ao redefinir senha:', e);
      Alert.alert('Erro', 'Não foi possível redefinir a senha.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Redefinir Senha</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => senhaRef.current?.focus()}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          ref={senhaRef}
          style={styles.input}
          placeholder="Digite a nova senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => confirmarRef.current?.focus()}
        />

        <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput
          ref={confirmarRef}
          style={styles.input}
          placeholder="Confirme a nova senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <View style={styles.buttonArea}>
          <TouchableOpacity 
            style={[styles.button, validar ? styles.buttonEnabled : styles.buttonDisabled]} 
            onPress={handleSalvar} 
            disabled={!validar}
          >
            <Text style={[styles.buttonText, validar ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Voltar para Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', color: '#222', marginBottom: 30 },
  label: { alignSelf: 'flex-start', fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { width: '100%', height: 48, borderWidth: 1, borderColor: '#aaa', borderRadius: 8, paddingHorizontal: 12, fontSize: 16, marginBottom: 16 },
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
