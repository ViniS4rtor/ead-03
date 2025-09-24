import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const canProceed = useMemo(() => name.trim().length > 0 && avatarUrl.trim().length > 0, [name, avatarUrl]);

  const goToProfile = () => {
    navigation.navigate('Profile', { name: name.trim(), avatarUrl: avatarUrl.trim() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Text style={styles.label}>Nome do usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        returnKeyType="next"
      />

      <Text style={styles.label}>URL da imagem de avatar</Text>
      <TextInput
        style={styles.input}
        placeholder="https://exemplo.com/avatar.png"
        value={avatarUrl}
        onChangeText={setAvatarUrl}
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.button, canProceed ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={goToProfile}
        disabled={!canProceed}
      >
        <Text style={[styles.buttonText, canProceed ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>Ir para o Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#222', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { height: 48, borderWidth: 1, borderColor: '#aaa', borderRadius: 8, paddingHorizontal: 12, fontSize: 16, marginBottom: 16 },
  button: { height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonEnabled: { backgroundColor: '#007AFF' },
  buttonDisabled: { backgroundColor: '#cccccc' },
  buttonText: { fontSize: 16, fontWeight: '600' },
  buttonTextEnabled: { color: '#ffffff' },
  buttonTextDisabled: { color: '#666666' },
});
