import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  const validarEmail = (value) => value.includes('@') && value.indexOf('@') > 0 && value.indexOf('@') < value.length - 1;
  const camposPreenchidos = cpf.trim() && nome.trim() && email.trim() && senha.trim() && validarEmail(email);

  const handleSalvar = () => {
    Alert.alert('Usuário registrado com sucesso');
    navigation.navigate('Login');
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
          <Button title="Salvar" onPress={handleSalvar} disabled={!camposPreenchidos} />
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
  link: { fontSize: 16, color: '#007AFF', textDecorationLine: 'underline' },
});
