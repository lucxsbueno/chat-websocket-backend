const router = require("express").Router();

const { checkToken } = require("../../auth/check.token");

/**
 *
 *
 *
 * Channel controller
 */
const {
  findAllChannels, createChannel, deleteChannel, updateChannel, findChannelById, sendMessage
} = require("./channel.controller");

router.get("/:id", checkToken, findChannelById);

router.get("/", checkToken, findAllChannels);
router.post("/", checkToken, createChannel);
router.delete("/:id", checkToken, deleteChannel);
router.put("/:id", checkToken, updateChannel);

router.post("/:id/message", checkToken, sendMessage)

module.exports = router;