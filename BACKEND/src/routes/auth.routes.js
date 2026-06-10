const { Router } = require("express");
const {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
} = require("../controllers/auth.controller");

const { authUser } = require("../middlewares/auth.middleware");

const authRouter = Router();

/* ---------------- REGISTER ---------------- */
authRouter.post("/register", registerUserController);

/* ---------------- LOGIN ---------------- */
authRouter.post("/login", loginUserController);

/* ---------------- LOGOUT ---------------- */
authRouter.post("/logout", authUser, logoutUserController);

/* ---------------- GET CURRENT USER ---------------- */
authRouter.get("/get-me", authUser, getMeController);

module.exports = authRouter;