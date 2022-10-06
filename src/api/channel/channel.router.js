const router = require("express").Router();

const { checkToken } = require("../../auth/check.token");

/**
 *
 *
 *
 * Channel controller
 */
const {
  findAllChannels, createChannel, deleteChannel, updateChannel, findChannelById
} = require("./channel.controller");

router.get("/:id", checkToken, findChannelById);

router.get("/", checkToken, findAllChannels);
router.post("/", checkToken, createChannel);
router.delete("/", checkToken, deleteChannel);
router.put("/", checkToken, updateChannel);

module.exports = router;