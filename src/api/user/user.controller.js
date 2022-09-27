
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const {
  sign,
  verify
} = require('jsonwebtoken');

module.exports = {
  createUser: async (req, res) => {
    const salt = genSaltSync(10);
    req.body.pass = hashSync(req.body.pass, salt);

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        return res.status(409).json({
          error: true,
          status: 409,
          message: "Este e-mail já foi cadastrado!"
        });
      }

      await prisma.user.create({ data: req.body });

      return res.status(201).json({
        error: false,
        status: 201,
        message: "Conta criada com sucesso!"
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: true,
        message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
        stack: error
      });
    }
  },

  updateUser: (req, res) => {
    updateUser(req.body, req.params.id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "A conexão com o banco de dados falhou."
        });
      }
      return res.status(200).json({
        success: true,
        message: "Usuário editado com sucesso.",
        data: results
      });
    });
  },

  deleteUser: (req, res) => {
    deleteUser(req.params.id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          data: { message: "O usuário não foi encontrado." }
        });
      }
      return res.status(200).json({
        success: true,
        data: { message: "Usuário deletado com sucesso!" }
      });
    });
  },

  findUserById: (req, res) => {
    const id = req.params.id;
    findUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          data: { message: "Nenhum usuário encontrado." }
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  },

  findAllUsers: async (req, res) => {

    try {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: true,
        message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
        stack: error
      });
    }
  },

  searchUser: (req, res) => {
    searchUser(req.query.q, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results || results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhum registro encontrado."
        });
      }

      results.forEach(user => {
        user.pass = undefined;
      });

      return res.status(200).json({
        success: true,
        rows: results.length,
        data: results
      });
    });
  },

  loadSession: (req, res) => {

    let token = req.get("authorization");

    console.log(token);

    token = token.slice(7);

    verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);

        return res.status(401).json({
          success: false,
          message: "Não autorizado."
        });
      }
      return res.status(200).json({
        success: true,
        token,
        user: decoded.user
      });
    })
  },

  signin: async (req, res) => {

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      //if there are no records
      if (!user) {
        return res.status(400).json({
          error: true,
          status: 400,
          message: "E-mail ou senha inválidos! Tente novamente."
        });
      }

      //compare if password is correct
      const isRight = compareSync(req.body.pass, user.pass);

      if (isRight) {

        delete user.pass;

        const jwt = {
          //data transfer to jwt
          payload: { user },
          secret: process.env.SECRET_KEY,
          options: {
            issuer: "auth-api",
            algorithm: "HS256",
            expiresIn: "86400000ms"
          }
        };

        sign(jwt.payload, jwt.secret, jwt.options, (error, token) => {
          if (error) {
            console.log("[jwt error]: ", err);
          }

          return res.status(202).json({
            error: false,
            status: 202,
            message: "Login efetuado com sucesso!",
            token: token
          });
        });
      } else {
        return res.status(400).json({
          error: true,
          status: 400,
          message: "E-mail ou senha inválidos! Tente novamente."
        });
      }

    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: true,
        message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
        stack: error
      });
    }

  }
};
