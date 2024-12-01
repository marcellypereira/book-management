# AutoVist

## :book: Sobre o projeto

O design foi criado por mim no Figma, e você pode conferi-lo [aqui](https://www.figma.com/design/qpgEpcPm2SJPvSSJbJKZOf/Books-Management?node-id=0-1&node-type=canvas&t=saAso9SDBRs4Vz2h-0).

## :computer: Tecnologias

- [React](https://legacy.reactjs.org/docs/create-a-new-react-app.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/docs/width)
- [React Query](https://www.npmjs.com/package/react-query)
- [Json Server](https://www.npmjs.com/package/json-server)


## :sparkles: Funcionalidades

- **Controle de Acesso Baseado em Usuários:**
  - O sistema implementa um controle de acesso baseado em dois tipos de usuários: **usuários comuns** e **administradores**.
  - Um **usuário administrador** já está registrado por padrão no sistema, com e-mail e senha definidos. Apenas **administradores** podem criar outros administradores ou remover administradores existentes.
  - **Usuários comuns** são criados por meio do formulário de cadastro. Todo usuário criado através desse formulário será automaticamente registrado como **usuário comum**, com permissões restritas. Usuários comuns têm acesso apenas para visualizar os livros, sem poder editar ou remover nenhum item.
  - **Usuários administradores** possuem a capacidade de gerenciar o nível de acesso dos outros usuários, podendo alterá-los para **administradores** ou **usuários comuns**. Ou seja, apenas administradores têm a permissão para criar novos administradores ou alterar os privilégios dos usuários já existentes.

- **CRUD de Livros para Administradores:**
  - Os administradores têm acesso completo ao **CRUD (Criar, Editar, Deletar)** de livros.
  - Eles podem adicionar novos livros ao sistema, editar as informações dos livros existentes e removê-los conforme necessário.
  - **Usuários comuns** têm acesso apenas para visualizar os livros, sem permissões para editá-los ou excluí-los.

- **CRUD de Usuários para Administradores:**
  - Os administradores podem gerenciar usuários através de um **CRUD (Criar, Editar, Remover)**. 
  - Eles podem criar novos usuários, editar os dados dos usuários existentes e excluir usuários.
  - **Administração de permissões de acesso**: Além disso, somente administradores podem definir o tipo de usuário (comum ou administrador) durante o processo de criação ou edição de um usuário.

- **Simulação com Banco de Dados (db.json):**
  - O projeto utiliza o **db.json** com **JSON Server** para simular uma API RESTful. Isso permite que o sistema seja testado e utilizado de forma interativa sem a necessidade de um back-end real.
  - O JSON Server serve como um banco de dados temporário, armazenando as informações dos usuários e livros enquanto a aplicação está sendo executada.


## :rocket: Como Rodar o Projeto

1. Clone o repositório para sua máquina local.
2. Navegue até a pasta do projeto utilizando o terminal.
3. Verifique se está utilizando a última versão do Node.js.
4. Execute o comando `npm install` para instalar as dependências necessárias.
5. Em um terminal, execute o comando json-server `json-server --watch db.json --port 3001` para rodar a simulação da API.
6. Em outro terminal, execute o comando `yarn start` para iniciar o servidor de desenvolvimento e a aplicação.

## :key: Usuário Administrador Padrão

Email: admin@gmail.com

Senha: Admin123#


## :tada: Visualização Administradores

![admin](https://github.com/user-attachments/assets/d0d9dcdb-77b2-4187-8971-9d76804660eb)

## :tada: Visualização Usuários Comuns

![user](https://github.com/user-attachments/assets/f1ecddb9-9fee-4bbd-97e0-3946d9526717)

<div align="center">Feito com 💜!</div>
