
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:6a11cb,100:2575fc&height=120&section=header"/>

<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=900&height=50&duration=5800&pause=1000&color=37435D&stroke=008000&lines=Ol%C3%A1!+👋;+Bem-vindo+ao+BlueGuard!" />
</h1>

<h1 align="center" > 🌊 BlueGuard 🌊 </h1>
 
BlueGuard é um aplicativo desenvolvido em **React Native** utilizando **Expo**, focado em mapear locais com informações ambientais, permitindo que os usuários registrem e visualizem dados sobre qualidade da água, temperatura e outros aspectos relevantes. Os usuários podem ver, adicionar e compartilhar essas informações com a comunidade, promovendo a conscientização e a proteção do meio ambiente.

<h2 align="center">Tecnologias Utilizadas</h2>
<p align="center">
  <img src="https://img.shields.io/badge/-React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/-Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript" />
  <img src="https://img.shields.io/badge/-iPhone-000000?style=for-the-badge&logo=apple&logoColor=white" alt="iPhone" />
  <img src="https://img.shields.io/badge/-MacBook-000000?style=for-the-badge&logo=apple&logoColor=white" alt="MacBook" />
</p>

<h2 align="center"> 📁 Estrutura do Projeto</h2>

<h3 align="center">🌟 Diretórios e Arquivos Principais 🌟</h3>

#### 📂 **app**

- **logtabs**
  - `_layout.tsx`: Configuração de layout das abas.
  - `Comunidade.tsx`: Tela de comunidade onde os usuários podem ver os locais cadastrados.
  - `Mapa.tsx`: Tela de mapa onde os usuários podem visualizar e pesquisar locais no mapa.

- **tabs**
  - `_layout.tsx`: Configuração de layout principal.
  - `index.tsx`: Tela principal de entrada.
  - `Login.tsx`: Tela de login e registro de usuários.
  - `Cadastro.tsx`: Tela para cadastro de novos locais.
  - `Perfil.tsx`: Tela de perfil do usuário.
  - `+html.tsx`: Componente HTML.
  - `+not-found.tsx`: Tela padrão para rotas não encontradas.

#### 🖼️ **assets**

Contém fontes, imagens e outros recursos estáticos.

#### 🧩 **components**

- **ThemedView.tsx**: Componente de view com suporte a temas.
- **ThemedText.tsx**: Componente de texto com suporte a temas.
- **ParallaxScrollView.tsx**: Componente de scroll view com efeito parallax.
- **HelloWave.tsx**: Componente de animação de saudação.
- **navigation/TabBarIcon.tsx**: Ícones personalizados para a barra de navegação.

#### 🎨 **constants**

- **Colors.ts**: Definições de cores utilizadas na aplicação, com suporte a temas claro e escuro.

#### 🔗 **hooks**

Hooks personalizados para temas e outras funcionalidades.

<h2 align="center">🔧 Funcionalidades do Aplicativo 🔧</h2>

### 🔑 **Tela de Login**

- **Autenticação**: Permite que os usuários façam login utilizando email e senha.
- **Registro de Usuários**: Permite a criação de contas com nome, idade, email e senha.
- **Mensagens de Erro**: Exibe mensagens de erro caso o login não seja bem-sucedido ou os campos estejam incorretos.
- **Validação**: Verifica se os campos de email e senha estão preenchidos corretamente.
- **Recuperação de Senha**: Caso o usuário esqueça a senha, pode solicitar a atualização informando o email e a nova senha.

### 🏠 **Tela Principal (Home)**

- **Parallax Scroll View**: Utiliza o componente ParallaxScrollView para uma apresentação visual atraente, com uma imagem de cabeçalho e seções informativas.
- **Informações Educativas**: Exibe seções com textos educativos sobre a importância da conservação marinha, desafios atuais, soluções propostas pelo BlueGuard e o impacto das Áreas Marinhas Protegidas (AMPs).
- **Imagens Ilustrativas**: Inclui imagens relacionadas aos tópicos abordados para maior impacto visual e engajamento.
- **Botão "Saiba Mais"**: Um botão interativo para que os usuários possam explorar mais sobre o aplicativo e suas funcionalidades.

### 🌍 **Mapa**

- **Visualização de Locais**: Mostra locais cadastrados no mapa, com pings azuis indicando locais cadastrados pelo usuário e pings vermelhos para locais cadastrados por outros usuários.
- **Busca e Filtro**: Permite a busca de locais específicos através de uma barra de pesquisa.
- **Detalhes do Local**: Ao clicar em um marcador, exibe um modal com informações detalhadas sobre o local.
- **Navegação**: Opções para navegar para a tela de Cadastro ou Perfil a partir do menu.
- **Animações**: Utiliza animações para a exibição e ocultação do modal de detalhes do local.

### 👥 **Comunidade**

- **Lista de Locais**: Exibe uma lista de locais cadastrados pela comunidade.
- **Detalhes do Local**: Inclui informações como a hora do cadastro, nome de quem cadastrou e outras informações relevantes sobre o local.
- **Atualização**: Possibilidade de atualizar a lista com um gesto de "pull to refresh".
- **Imagens dos Locais**: Exibe imagens dos locais cadastrados pela comunidade, melhorando a visualização e interação com os dados.

### 📝 **Cadastro**

- **Registro de Novos Locais**: Permite que os usuários registrem novos locais com informações detalhadas, incluindo nome, localização (latitude e longitude), nível de sujeira, pH da água, temperatura, potabilidade e observações.
- **Seleção no Mapa**: Os usuários podem selecionar a localização diretamente no mapa.
- **Adição de Imagens**: Permite aos usuários adicionar uma imagem do local.
- **Publicação**: Opção para publicar o local na comunidade após o cadastro.

### 👤 **Perfil**

- **Informações do Usuário**: Exibe informações pessoais do usuário, como nome, email e idade.
- **Atualização de Foto de Perfil**: Permite aos usuários atualizar sua foto de perfil.
- **Alteração de Senha**: Funcionalidade para alterar a senha do usuário.
- **Logout**: Opção para fazer logout da conta.
- **Alteração de Dados**: Permite aos usuários alterarem seus dados pessoais diretamente na tela de perfil.

<h2 align="center">☁️ Uso do Firebase ☁️ </h2>


O projeto utiliza **Firebase** para armazenamento e gerenciamento dos dados dos locais e usuários:

- **Firebase Realtime Database**: Utilizado para armazenar e recuperar informações sobre os locais e usuários.

 <h2 align="center"> 📦 Dependências </h2>

As principais dependências do projeto incluem:

- **React Native** <img src="https://reactnative.dev/img/header_logo.svg" alt="React Native" width="40" height="40" style="border-radius: 10px;" align="center">
- **Expo** <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqraOHvKPXZSOqupeY7eWe82qIYO8q81S6mA&s" alt="Expo" width="40" height="40" style="border-radius: 10px;" align="center">
- **TypeScript** <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="TypeScript" width="40" height="40" style="border-radius: 10px;" align="center">
- **react-native-maps** <img src="https://cdn-icons-png.flaticon.com/128/2335/2335353.png" alt="react-native-maps" width="40" height="40" style="border-radius: 10px;" align="center">
- **axios** <img src="https://user-images.githubusercontent.com/8939680/57233884-20344080-6fe5-11e9-8df3-0df1282e1574.png" alt="axios" width="40" height="40" style="border-radius: 10px;" align="center">
- **AsyncStorage** <img src="https://www.rcac.purdue.edu/files/icons/storage.svg" alt="AsyncStorage" width="40" height="40" style="border-radius: 10px;" align="center">
- **react-native-paper** <img src="https://callstack.github.io/react-native-paper/images/paper-logo.svg" alt="react-native-paper" width="40" height="40" style="border-radius: 10px;" align="center">
- **expo-image-picker** <img src="https://cdnlogo.com/logos/e/67/expo.svg" width="40" height="40" style="border-radius: 10px;" align="center">
- **native-base** <img src="https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png" alt="native-base" width="40" height="40" style="border-radius: 10px;" align="center">
- **Firebase** <img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-vertical.png" alt="Firebase" width="40" height="40" style="border-radius: 10px;" align="center">

Veja o arquivo `package.json` para uma lista completa de dependências.

 <h2 align="center">🛠️ Instalação e Execução 🛠️</h2>

Para executar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/BlueGuard.git
   cd BlueGuard
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o aplicativo:**
   ```bash
   expo start
   ```
   ou
   ```bash
   npx expo start
   ```

<h2 align="center">⚙️ Configuração ⚙️</h2>

O projeto utiliza a estrutura de rotas do **Expo Router** e a configuração de temas de acordo com o esquema de cores do dispositivo. Para configurar corretamente, veja os arquivos:

- `app.json`: Configurações principais do Expo.
- `app.config.js`: Alternativa

<h2 align="center"> 🔒 Segurança e Privacidade 🔒</h2>

- **Armazenamento Seguro de Dados**: Utiliza **AsyncStorage** para armazenar dados de usuário de forma segura.
- **Atualização de Senha**: A funcionalidade de alteração de senha oferece uma camada adicional de segurança para os usuários.
