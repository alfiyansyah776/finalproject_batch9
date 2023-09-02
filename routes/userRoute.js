import express from 'express';
import * as UserService from '../services/userController.js'

const userRoute = express.Router();

userRoute.post("/", UserService.createUser);
userRoute.get("/", UserService.getUser);
userRoute.put("/:id", UserService.updateUser);
userRoute.delete("/:id", UserService.deleteUser);

export default userRoute;
