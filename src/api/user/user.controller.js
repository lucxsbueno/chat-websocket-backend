
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const {
  sign,
  verify
} = require("jsonwebtoken");

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

  updateUser: async (req, res) => {
    try {
      await prisma.user.update({
        where: {
          id: req.params.id
        },
        data: req.body
      });

      return res.status(200).json({
        success: true,
        message: "Conta atualizada com sucesso."
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

  deleteUser: async (req, res) => {
    try {
      await prisma.user.delete({
        where: {
          id: req.params.id
        }
      });

      return res.status(200).json({
        success: true,
        message: "Conta deletada com sucesso."
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: true,
        message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
        stack: error.message
      });
    }
  },

  findUserById: async (req, res) => {
    const id = req.params.id;

    try {
      const users = await prisma.user.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          email: true,
          channels: {
            select: {
              id: true,
              name: true,
              description: true
            }
          },
          messages: {
            orderBy: {
              created_at: "asc"
            },
            select: {
              id: true,
              type: true,
              body: true,
              chat_id: true
            }
          },
          _count: {
            select: {
              channels: true,
              messages: true
            }
          }
        }
      });

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

  findAllUsers: async (req, res) => {
    const search = req.query.q;

    try {
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: search
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          _count: {
            select: {
              channels: true,
              messages: true
            }
          }
        }
      });

      // Select de vários campos com count
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      //   channels: {
      //     select: {
      //       id: true,
      //       name: true,
      //       description: true
      //     }
      //   },
      //   messages: {
      //     orderBy: {
      //       created_at: "asc"
      //     },
      //     select: {
      //       id: true,
      //       type: true,
      //       body: true,
      //       chat_id: true
      //     }
      //   },
      //     _count: {
      //       select: {
      //         channels: true,
      //         messages: true
      //       }
      //     }
      //   }
      // });

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
