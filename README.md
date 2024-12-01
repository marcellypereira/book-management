# AutoVist

## :book: Sobre o projeto

O design foi criado por mim no Figma, e você pode conferi-lo [aqui](https://www.figma.com/design/qpgEpcPm2SJPvSSJbJKZOf/Books-Management?node-id=0-1&node-type=canvas&t=saAso9SDBRs4Vz2h-0).

## :computer: Tecnologias

- [React](https://legacy.reactjs.org/docs/create-a-new-react-app.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/docs/width)
- [React Query](https://www.npmjs.com/package/react-query)
- [Json Server](https://www.npmjs.com/package/json-server)


### 🎯 Objetivo do Projeto

O objetivo deste projeto é criar uma **aplicação web** para o gerenciamento de livros com:

- **Diferentes níveis de acesso**: Usuários comuns e administradores.
- **Sistema de gerenciamento de usuários**: Administradores podem criar, editar e excluir usuários, enquanto usuários comuns só podem visualizar livros.
- **Simulação de banco de dados**: Usando **Json Server** para simular o armazenamento de dados.

---

### 🔑 Funcionalidades

#### 🔐 Acesso para Administradores:
- **Criar, editar e excluir livros**.
- **Gerenciar usuários**: Administradores podem criar, editar e excluir outros usuários (não podem excluir a si próprios).
- **Criar outros administradores**.

#### 👀 Acesso para Usuários Comuns:
- **Visualização de livros**: Usuários comuns podem apenas visualizar livros e suas informações.

#### 🌟 Funcionalidades Adicionais:
- **Proteção de rotas**: Verifique se o usuário tem permissão antes de acessar páginas específicas.
- **Logout**: Ao fazer logout, as informações do usuário são removidas do **Local Storage**.
- **Paginação**: Paginação na listagem de livros e usuários para melhorar a navegação.
- **Validações de formulário**: Utilizando **Yup** para garantir que os dados sejam validados antes de enviar os formulários.
- **Layout responsivo e atrativo**, criado no **Figma** 🎨.

---

### 👤 Usuário Padrão

Após a criação de um novo usuário pelo signUp, ele será **usuário comum** por padrão. Apenas **administradores** podem criar outros administradores.

#### Dados do Usuário Padrão Administrador:
- **E-mail**: `admin@gmail.com` 📧
- **Senha**: `Admin123#` 🔑

---

### 🚀 Como Rodar o Projeto

1. **Clone o repositório**:

```bash
git clone https://link-do-repositorio.git
cd nome-do-projeto
```

2. **Crie um arquivo .env na raiz do projeto e adicione**:

```bash
REACT_APP_API_URL=http://localhost:3001
```

3. **Instale as dependências**:

```bash
npm install
```

4. **Instale o Json Server globalmente (caso não tenha)**:

```bash
npm install -g json-server
```
5. **Inicie o Json Server em um terminal separado**:

```bash
json-server --watch db.json --port 3001
```
6. **Inicie a aplicação**:

```bash
npm start
```

## :tada: Visualização Administradores

![admin](https://github.com/user-attachments/assets/eb670493-699d-4808-9ed2-b25e0ca48096)

## :tada: Visualização Usuários Comuns

![user](https://github.com/user-attachments/assets/f1ecddb9-9fee-4bbd-97e0-3946d9526717)

<div align="center">Feito com 💜!</div>
