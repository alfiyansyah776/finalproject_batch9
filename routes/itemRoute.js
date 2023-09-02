import express from 'express';
import * as ItemService from '../services/itemController.js'

const itemRoute = express.Router();

itemRoute.post("/", ItemService.addItem);
itemRoute.get("/", ItemService.getItem);
itemRoute.put("/:id", ItemService.updateItem);
itemRoute.delete("/:id", ItemService.deleteItem);

export default itemRoute;