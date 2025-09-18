# ead-03

App Expo com telas de Login, Cadastro e Redefinição de Senha para prática de estado, inputs, navegação e validação.

## Telas
- Login: valida email simples, navega para Cadastro e Redefinição de Senha.
- Cadastro: CPF, Nome, Email, Senha. Botão Salvar habilita somente quando todos preenchidos e email válido. Ao salvar mostra alerta de sucesso e volta ao Login.
- Redefinição de Senha: Senha e Confirmar Senha. Se diferentes alerta e foca no primeiro campo. Sucesso mostra alerta e volta ao Login.

## Dependências Principais
- react-navigation/native
- @react-navigation/native-stack
- react-native-screens / react-native-safe-area-context (instaladas via `expo install`).

## Executar
```bash
expo start
```
Escolha o ambiente (Android/iOS/Web) no Expo.

## Estrutura
```
App.js                # Configuração do NavigationContainer e Stack
src/screens/LoginScreen.js
src/screens/RegisterScreen.js
src/screens/ResetPasswordScreen.js
```

## Observações
Persistência de dados não implementada (mock). Para armazenar usuários reais, integrar AsyncStorage, SecureStore ou backend.
