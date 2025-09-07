import { useState } from 'react';
import { View, Text, Image, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';

export default function App() {

  // Estado para armazenar e-mail e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função chamada ao clicar no botão ENTRAR
  const realizarLogin = () => {
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
  };

  // Função para o link de registro
  const abrirRegistro = () => {
    Alert.alert('Informação', 'Tela de Registro em breve!');
  };

  // Função para o link de redefinir senha
  const redefinirSenha = () => {
    Alert.alert('Informação', 'Tela de redefinição de senha em breve!');
  };

  // Função para validar email
  const validarEmail = (email) => {
    return email.includes('@') && email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1;
  };

  // Verifica se ambos os campos estão preenchidos e email é válido
  const camposPreenchidos = email.trim().length > 0 && 
                           senha.trim().length > 0 && 
                           validarEmail(email);

  return (
    <View style={styles.container}>
      {/* Imagem/Logo acima dos campos */}
      <Image
        source={require('./assets/bk_logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Login</Text>

      {/* Campo E-mail */}
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

      {/* Campo Senha */}
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />

      {/* Botão ENTRAR - desabilitado até ambos campos serem preenchidos */}
      <View style={styles.buttonArea}>
        <Button 
          title="ENTRAR" 
          onPress={realizarLogin} 
          disabled={!camposPreenchidos} 
        />
      </View>

      {/* Links clicáveis */}
      <View style={styles.linksContainer}>
        <Pressable onPress={abrirRegistro}>
          <Text style={styles.link}>Registrar-se</Text>
        </Pressable>
        
        <Pressable onPress={redefinirSenha}>
          <Text style={styles.link}>Redefinir a Senha</Text>
        </Pressable>
      </View>
    </View>
  );
}

// FOLHA DE ESTILOS - é criada dinamicamente quando o programa entra no ar
const styles = StyleSheet.create({
  container: {
    flex: 1,                       // ocupa a tela toda
    justifyContent: 'center',      // centraliza verticalmente
    alignItems: 'center',          // centraliza horizontalmente
    padding: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#ff0000',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: -12,
    marginBottom: 8,
  },
  buttonArea: {
    width: '100%',
    marginTop: 8,
    marginBottom: 20,
  },
  linksContainer: {
    alignItems: 'center',
    gap: 15,
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
