import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ProfileScreen({ route, navigation }) {
  const usuario = route?.params?.usuario;
  const name = route?.params?.name;
  const avatarUrl = route?.params?.avatarUrl;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {(avatarUrl || usuario?.avatarUrl) && (
        <Image
          source={{ uri: avatarUrl || usuario?.avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
      )}

      <Text style={styles.label}>Nome</Text>
      <Text style={styles.value}>{name || usuario?.nome || '—'}</Text>

      {usuario?.email && (
        <>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{usuario.email}</Text>
        </>
      )}

      <Text style={styles.message}>Este é o seu perfil ✨</Text>

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#222', marginBottom: 30, textAlign: 'center' },
  avatar: { width: 160, height: 160, borderRadius: 80, alignSelf: 'center', marginBottom: 20, backgroundColor: '#eee' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginTop: 16 },
  value: { fontSize: 18, color: '#222', marginTop: 6 },
  message: { marginTop: 24, textAlign: 'center', fontSize: 16, color: '#333' },
  button: { marginTop: 32, height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  logout: { backgroundColor: '#007AFF' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
