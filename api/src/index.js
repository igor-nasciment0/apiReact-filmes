import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import usuarioController from './controller/usuarioController.js';
import filmesController from './controller/filmesController.js';

const servidor = express();

servidor.use(cors());
servidor.use(express.json());
servidor.use(usuarioController);
servidor.use(filmesController);

servidor.listen(process.env.PORT, () => console.log(`API ONLINE NA PORTA ${process.env.PORT}`));