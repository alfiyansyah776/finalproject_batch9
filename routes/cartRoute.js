import express from 'express';
import * as CartService from '../services/cartController.js'
import * as UserService from '../services/userController.js'

const cartRoute = express.Router();

cartRoute.post("/", UserService.validateToken, CartService.addCart);
cartRoute.get("/", UserService.validateToken, CartService.getCart);
cartRoute.put("/:id",UserService.validateToken, CartService.updateCart);
cartRoute.delete("/:id",UserService.validateToken, CartService.deleteCart);
cartRoute.get("/:id",UserService.validateToken, CartService.getTotalCountById);

export default cartRoute;