import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = () => {
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
  };

  const validarEmail = (email) => {
    return email.includes('@') && email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1;
  };

  const camposPreenchidos = email.trim().length > 0 && senha.trim().length > 0 && validarEmail(email);

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
        <Button title="ENTRAR" onPress={realizarLogin} disabled={!camposPreenchidos} />
      </View>

      <View style={styles.linksContainer}>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Registrar-se</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.link}>Redefinir a Senha</Text>
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
  linksContainer: { alignItems: 'center', gap: 15 },
  link: { fontSize: 16, color: '#007AFF', textDecorationLine: 'underline' },
});
