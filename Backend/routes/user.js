const express = require("express");
const {
  login,
  createUser,
  logout,
  getAllUsers,
  updateUser,
  deleteUser,
  updateTeamMember,
  getUser,
} = require("../controllers/user");
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/create", createUser);
userRouter.get("/logout", logout);
userRouter.get("/users", getAllUsers);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUser);
userRouter.put("/team/:id", updateTeamMember);

module.exports = userRouter;
