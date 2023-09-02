import express from 'express';
import * as UserService from '../services/userController.js';

const authRoute = express.Router()

authRoute.post("/", UserService.auth);

export default authRoute;