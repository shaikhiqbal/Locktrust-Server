import { Router } from "express";

import { registerUser, loginUser } from "../controllers/user.controller.js";

const routes = Router();

routes.post("/register", registerUser);

routes.post("/login", loginUser);

// routes.post("/permission",permissionManage)

export default routes;
