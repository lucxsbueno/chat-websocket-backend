## Backend do `Chat Websocket`

Organizei as principais **tecnologias** que venho estudando ao longo do tempo para criar uma aplicação **fullstack** completa do **zero**.

### 💥 Tecnologias utilizadas

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### 💻 Instalação e inicialização

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

> **Nota**: no arquivo `src/server.js` descomente a linha `5` para que seja possível utilizar variáveis de ambiente. Eu utilizei `PostgreSQL`, porém na documentação do [prisma](https://www.prisma.io/) você pode escolher algum banco de dados da sua preferência.
> 

Ao terminar a instalação rode o comando:
```sh
npm run dev
```
A api será disponibilizada na porta inserida no arquivo `.env`!

Enjoy! 😁 