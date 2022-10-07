
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {

  findChannelById: async (req, res) => {
    const id = req.params.id;

    try {
      const chat = await prisma.chat.findMany({
        where: {
          channel_id: id
        },
        select: {
          messages: {
            orderBy: {
              created_at: "asc"
            },
            select: {
              id: true,
              type: true,
              body: true,
              created_at: true,
              user: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      });

      return res.status(200).json(chat[0]?.messages);
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: true,
        message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
        stack: error
      });
    }
  },

  findAllChannels: async (req, res) => {
    const search = req.query.q;

    try {
      const channels = await prisma.channel.findMany({
        where: {
          name: {
            contains: search
          }
        },
        select: {
          id: true,
          name: true,
          description: true,
          // chat: {
          //   select: {
          //     id: true,
          //     messages: {
          //       select: {
          //         id: true,
          //         type: true,
          //         body: true,
          //         user: {
          //           select: {
          //             id: true,
          //             name: true
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
        }
      });

      return res.status(200).json(channels);
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: true,
        message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
        stack: error
      });
    }
  },

  createChannel: async (req, res) => {
    try {
      const channel = await prisma.channel.create({
        data: req.body
      });

      const chat = await prisma.chat.create({
        data: {
          channel_id: channel.id
        }
      });

      return res.status(200).json({
        error: false,
        status: 200,
        message: "Canal criado com sucesso!",
        channel: {
          id: channel.id,
          chat_id: chat.id,
          name: channel.name,
          description: channel.description,
        }
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

  updateChannel: async (req, res) => {
    try {
      await prisma.channel.update({
        where: {
          id: req.params.id
        },
        data: req.body
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Canal atualizada com sucesso!"
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

  deleteChannel: async (req, res) => {
    try {
      await prisma.channel.delete({
        where: {
          id: req.params.id
        }
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Cannal deletado com sucesso!"
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
};
