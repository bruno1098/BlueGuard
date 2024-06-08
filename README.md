<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:6a11cb,100:2575fc&height=120&section=header"/>
<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=900&height=50&duration=5800&pause=1000&color=37435D&stroke=008000&lines=👋+Bem-vindo+ao+BlueGuard!" />
</h1>

<h1 align="center" > 🌊 BlueGuard 🌊 </h1>
<div align="center">
  
<img src="https://raw.githubusercontent.com/bruno1098/BlueGuard/main/assets/images/logo.png" alt="Blueguard" width="100"/>

</div>
 
<p style="text-align: justify;"> <strong>BlueGuard</strong> é um aplicativo inovador desenvolvido em <strong>React Native</strong> utilizando <strong>Expo</strong>, desenvolvido para mapear locais com informações ambientais de maneira eficiente. O aplicativo permite que os usuários registrem e visualizem dados detalhados sobre a qualidade da água, temperatura e outros aspectos ambientais relevantes. Além disso, os usuários podem adicionar novas informações e compartilhar esses dados com a comunidade, incentivando a conscientização e a proteção do meio ambiente. Com BlueGuard, torna-se mais fácil monitorar e preservar nossos recursos naturais.</p>

<h2 align="center">👥 Integrantes do Projeto 👥</h2>

<div align="center">
  <p><strong>Bruno Antunes</strong> - RM98470</p>
  <p><strong>Gabriel Figueiredo</strong> - RM99463</p>
  <p><strong>Gabriel Souza</strong> - RM98633</p>
  <p><strong>Pedro Ferrari</strong> - RM550231</p>
  <p><strong>Rafael Lino</strong> - RM551577</p>
</div>

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

<h2 align="center">🎥 Demonstração do Aplicativo 🎥</h2>

<div align="center">
  <a href="https://www.youtube.com/watch?v=zJTUvL5StFQ">
    <img src="https://img.youtube.com/vi/zJTUvL5StFQ/0.jpg" alt="Demonstração do BlueGuard" style="width: 80%; height: auto; border-radius: 10px;"/>
  </a>
  <p style="text-align: justify;">
    Clique na imagem e assista ao vídeo para ver o BlueGuard em ação! No vídeo, demonstramos como é fácil registrar um novo local, visualizar informações detalhadas no mapa, explorar a comunidade de locais cadastrados e gerenciar o perfil do usuário.
  </p>
</div>

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

- **Card**
  - `LocalCards.tsx`: Componente para exibição dos cartões de locais.

- **modals**
  - `ChangePasswordModal.tsx`: Modal para alteração de senha.
  - `LocationModals.tsx`: Modal para exibição de detalhes do local.
  - `LogoutModal.tsx`: Modal para confirmação de logout.
  - `MapModal.tsx`: Modal para seleção de localização no mapa.

- **styles**
  - `_layout.tsx`: Estilos para layout.
  - `+html.tsx`: Componente HTML.
  - `+not-found.tsx`: Tela padrão para rotas não encontradas.
  - `Cadastro.tsx`: Tela para cadastro de novos locais.
  - `EditarLocal.tsx`: Tela para edição de locais cadastrados.
  - `Perfil.tsx`: Tela de perfil do usuário.
  - `PublicarModal.tsx`: Modal para confirmação de publicação de locais.

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


# API
<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=900&height=50&duration=5800&pause=1000&color=37435D&stroke=008000&lines=📚+Documentação+da+API+BlueGuard"/>
</h1>
 <h2 align="center">🌐 Endpoints da API 🌐</h2>

### <h3 align="center">1. Obter Dados dos Usuários (Na prática esse metódo de listar todos não funciona por motivos de segurança, coloquei apenas para visualização) </h3>

## <h3 align="center">(Na prática esse metódo de listar todos não funciona por motivos de segurança, coloquei apenas para visualização) </h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/Usuarios.json`

**Método:** `GET`

**Descrição:** Obtém a lista de todos os usuários cadastrados.

**Exemplo de Requisição:**

```javascript
axios.get('https://experienceia-default-rtdb.firebaseio.com/Usuarios.json')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro ao obter dados dos usuários:', error);
  });
```

**Exemplo de Resposta:**

```json
{
  "-NzjVw54NHHJozNTx1_s": {
    "email": "rafael@gmail.com",
    "fotoPerfil": "https://media.linkedin.com/dms/image/D4D03AQHg5YL4Gtq/profile-displayphoto-shrink_400_400/0/16784263797?e=1723075200&v=beta&t=HX3Kj1h6F3n7mL_q5wE8Bf3",
    "idade": "19 anos",
    "nome": "Rafael Lino",
    "senha": "rafael"
  },
  "-NzjY4HHnmT7v_kTHu3N": {
    "email": "rafael@gmail.com",
    "idade": "19",
    "nome": "Rafael",
    "senha": "rafael123"
  }
}
```

### <h3 align="center">2. Adicionar Novo Usuário</h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/Usuarios.json`

**Método:** `POST`

**Descrição:** Adiciona um novo usuário à base de dados.

**Exemplo de Requisição:**

```javascript
const novoUsuario = {
  email: "novo@usuario.com",
  fotoPerfil: "https://exemplo.com/foto.jpg",
  idade: "25",
  nome: "Novo Usuário",
  senha: "senha123"
};

axios.post('https://experienceia-default-rtdb.firebaseio.com/Usuarios.json', novoUsuario)
  .then(response => {
    console.log('Usuário adicionado com ID:', response.data.name);
  })
  .catch(error => {
    console.error('Erro ao adicionar usuário:', error);
  });
```

**Exemplo de Resposta:**

```json
{
  "name": "-NzjZ7bHnmT7v_kTHu3N"
}
```

### <h3 align="center">3. Atualizar Foto de Perfil do Usuário</h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/Usuarios/{userKey}.json`

**Método:** `PATCH`

**Descrição:** Atualiza a foto de perfil de um usuário existente.

**Exemplo de Requisição:**

```javascript
const userKey = "-NzjVw54NHHJozNTx1_s"; // Chave do usuário
const novaFoto = { fotoPerfil: "https://nova-foto.com/foto.jpg" };

axios.patch(`https://experienceia-default-rtdb.firebaseio.com/Usuarios/${userKey}.json`, novaFoto)
  .then(response => {
    console.log('Foto de perfil atualizada:', response.data);
  })
  .catch(error => {
    console.error('Erro ao atualizar foto de perfil:', error);
  });
```

**Exemplo de Resposta:**

```json
{
  "fotoPerfil": "https://nova-foto.com/foto.jpg"
}
```

### <h3 align="center">4. Atualizar Senha do Usuário</h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/Usuarios/{userKey}.json`

**Método:** `PATCH`

**Descrição:** Atualiza a senha de um usuário existente.

**Exemplo de Requisição:**

```javascript
const userKey = "-NzjVw54NHHJozNTx1_s"; // Chave do usuário
const novaSenha = { senha: "novaSenha123" };

axios.patch(`https://experienceia-default-rtdb.firebaseio.com/Usuarios/${userKey}.json`, novaSenha)
  .then(response => {
    console.log('Senha atualizada:', response.data);
  })
  .catch(error => {
    console.error('Erro ao atualizar senha:', error);
  });
```

**Exemplo de Resposta:**

```json
{
  "senha": "novaSenha123"
}
```

### <h3 align="center">5. Obter Locais</h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/locais.json`

**Método:** `GET`

**Descrição:** Obtém a lista de todos os locais cadastrados.

**Exemplo de Requisição:**

```javascript
axios.get('https://experienceia-default-rtdb.firebaseio.com/locais.json')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro ao obter dados dos locais:', error);
  });
```

**Exemplo de Resposta:**

```json
{
  "-NzKeT6XFoDhTDHxpb9-": {
    "cadastradoPor": "Bruno",
    "editadoEm": "2024-06-07T01:29:47.897Z",
    "imagemLocal": "https://www.costacruz.com/content/dam/costa/costa-article-images/argentine-beaches/spiagge-argentina.jpg.image.648.487.high.jpg",
    "latitude": -35.10218936043119,
    "local": "Argentina",
    "longitude": -54.114462706976774,
    "nivel_de_sujeira": "Baixa",
    "observacoes": "Água limpa",
    "ph_da_agua": 3,
    "potavel": true,
    "publicado": true,
    "temperatura": 20,
    "timestamp": 1717276631214
  }
}
```

### <h3 align="center">6. Adicionar Novo Local</h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/locais.json`

**Método:** `POST`

**Descrição:** Adiciona um novo local à base de dados.

**Exemplo de Requisição:**

```javascript
const novoLocal = {
  local: "Nova Praia",
  latitude: -23.533773,
  longitude: -46.625290,
  nivel_de_sujeira: "Moderada",
  ph_da_agua: 7.2,
  temperatura: 22,
  potavel: false,
  observacoes: "Lugar muito bonito",
  imagemLocal: "https://exemplo.com/imagem.jpg",
  cadastradoPor: "Usuário Exemplo",
  timestamp: Date.now(),
  publicado: false
};

axios.post('https://experienceia-default-rtdb.firebaseio.com/locais.json', novoLocal)
  .then(response => {
    console.log('Local adicionado com ID:', response.data.name);
  })
  .catch(error => {
    console.error('Erro ao adicionar local:', error);
  });
```

**Exemplo de Resposta:**

```json
{
  "name": "-NzKeT6XFoDhTDHxpb9-"
}
```

### <h3 align="center">7. Atualizar Local</h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/locais/{localId}.json`

**Método:** `PUT`

**Descrição:** Atualiza as informações de um local existente.

**Exemplo de Requisição:**

```javascript
const localId = "-NzKeT6XFoDhTDHxpb9-"; // ID do local
const localAtualizado = {
  local: "Praia Atualizada",
  latitude: -23.533773,
  longitude: -46.625290,
  nivel_de_sujeira: "Alta",
  ph_da_agua: 6.8,
  temperatura: 25,
  potavel: true,
  observacoes: "Lugar atualizado",
  imagemLocal: "https://exemplo.com/imagem-atualizada.jpg",
  cadastradoPor: "Usuário Exemplo",
  timestamp: Date.now(),
  publicado: true,
  editadoEm: new Date().toISOString()
};

axios.put(`https://experienceia-default-rtdb.firebaseio.com/locais/${localId}.json`, localAtualizado)
  .then(() => {
    console.log('Local atualizado com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao atualizar local:', error);
  });
```

**Exemplo de Resposta:**

```json
{
  "local": "Praia Atualizada",
  "latitude": -23.533773,
  "longitude": -46.625290,
  "nivel_de_sujeira": "Alta",
  "ph_da_agua": 6.8,
  "temperatura": 25,
  "potavel": true,
  "observacoes": "Lugar atualizado",
  "imagemLocal": "https://exemplo.com/imagem-atualizada.jpg",
  "cadastradoPor": "Usuário Exemplo",
  "timestamp": 1717276631214,
  "publicado": true,
  "editadoEm": "2024-06-07T01:29:47.897Z"
}
```

### <h3 align="center">8. Deletar Local</h3>

**URL:** `https://experienceia-default-rtdb.firebaseio.com/locais/{localId}.json`

**Método:** `DELETE`

**Descrição:** Remove um local da base de dados.

**Exemplo de Requisição:**

```javascript
const localId = "-NzKeT6XFoDhTDHxpb9-"; // ID do local

axios.delete(`https://experienceia-default-rtdb.firebaseio.com/locais/${localId}.json`)
  .then(() => {
    console.log('Local deletado com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao deletar local:', error);
  });
```

**Exemplo de Resposta:**

```json
null
```

Essa documentação cobre os principais endpoints utilizados no projeto, com exemplos de como fazer as requisições utilizando `axios`.
