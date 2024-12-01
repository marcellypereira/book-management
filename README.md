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

- Controle de Acesso Baseado em Usuários: Implementação de controle de acesso com usuários comuns e administradores, onde o primeiro usuário registrado é um administrador com permissões para criar e remover outros administradores.

- CRUD de Livros para Administradores: Desenvolvimento de funcionalidades de CRUD (Criar, Editar, Deletar) para livros, com restrições para usuários comuns que apenas visualizam os livros.

- CRUD de Usuários para Administradores: Funcionalidade de CRUD (Criar, Editar, Remover) para gerenciar usuários, acessível apenas aos administradores.

- Listagem de Livros e Usuários: Implementação de filtros e ordenação na lista de livros, proporcionando uma navegação mais eficiente para administradores.

- Simulação com Banco de Dados (db.json): Uso do db.json com JSON Server para simular uma API RESTful, facilitando o desenvolvimento e a integração da aplicação com dados simulados.

## :rocket: Como Rodar o Projeto

1. Clone o repositório para sua máquina local.
2. Navegue até a pasta do projeto utilizando o terminal.
3. Verifique se está utilizando a última versão do Node.js.
4. Execute o comando npm install para instalar as dependências necessárias.
5. Em um terminal, execute o comando json-server `--watch db.json --port 3001 para rodar a simulação da API`.
6. Em outro terminal, execute o comando `yarn start` para iniciar o servidor de desenvolvimento e a aplicação.

## :key: Usuário Administrador Padrão

Email: admin@gmail.com

Senha: Admin123#


## :tada: Visualização Administradores

![admin](https://github.com/user-attachments/assets/d0d9dcdb-77b2-4187-8971-9d76804660eb)

## :tada: Visualização Usuários Comuns

![user](https://github.com/user-attachments/assets/f1ecddb9-9fee-4bbd-97e0-3946d9526717)

<div align="center">Feito com 💜!</div>
