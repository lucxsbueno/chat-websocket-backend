const router = require("express").Router();

const { checkToken } = require("../../auth/check.token");

/**
 *
 *
 *
 * User controller
 */
const {
  signin,
  createUser,
  updateUser,
  deleteUser,
  findAllUsers,
  findUserById
} = require("./user.controller");

router.post("/signin", signin);
router.post("/signup", createUser);

router.put("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser)
router.get("/:id", checkToken, findUserById);
router.get("/", checkToken, findAllUsers);

module.exports = router;