## Backend do `Chat Websocket`

Organizei as principais **tecnologias** que venho estudando ao longo do tempo para criar uma aplicação **fullstack** completa do **zero**.

### Tecnologias utilizadas

1. [Node](https://nodejs.org/en/)
2. [Socket.IO](https://socket.io/)
3. [JSON Web Tokens](https://jwt.io/)
4. [Prisma: Next-generation ORM for Node.js & TypeScript](https://www.prisma.io/)
5. [PostgreSQL: The world's most advanced open source database](https://www.postgresql.org/)
6. [Express - framework de aplicativo da web Node.js (expressjs.com)](https://expressjs.com/pt-br/)

### Instalação e inicialização

Na pasta do projeto, rode o comando:

```sh
npm install
```

Após isso, crie um arquivo `.env` e insira as variáveis de ambiente:

```env
#server
PORT=

#jwt secret key
SECRET_KEY=

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

> Utilizei postgresql porém na documentação do [prisma](https://www.prisma.io/) você pode escolher algum banco de dados da sua preferência.

Ao terminar a instalação rode o comando:
```sh
npm run dev
```
A api será disponibilizada na porta inserida no arquivo `.env`!

Enjoy! 😁 