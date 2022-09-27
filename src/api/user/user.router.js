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
  searchUser,
  loadSession,
  findAllUsers,
  findUserById
} = require("./user.controller");

router.post("/signin", signin);
router.post("/signup", createUser);

router.post("/load-session", checkToken, loadSession);

router.post("/search", checkToken, searchUser);
router.patch("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser)
router.get("/:id", checkToken, findUserById);
router.get("/", checkToken, findAllUsers);

module.exports = router;