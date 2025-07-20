import express from 'express';
import authorizationController from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta de login
router.post("/", authorizationController.login);

export default router;