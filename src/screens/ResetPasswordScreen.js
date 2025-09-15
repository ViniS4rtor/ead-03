import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

export default function ResetPasswordScreen({ navigation }) {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const senhaRef = useRef(null);
  const confirmarRef = useRef(null);

  const validar = useMemo(() => {
    return senha.trim().length > 0 && confirmarSenha.trim().length > 0;
  }, [senha, confirmarSenha]);

  const handleSalvar = () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Senhas não são iguais');
      senhaRef.current?.focus();
      return;
    }
    Alert.alert('Senha redefinida com sucesso');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Redefinir Senha</Text>

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
