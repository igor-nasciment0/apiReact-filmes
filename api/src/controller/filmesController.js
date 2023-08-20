import { Router } from "express";
import { cadastrarFilme, inserirImagem } from "../repository/filmesRepository.js";
import multer from 'multer';

const upload = multer({ dest: 'storage/capasFilmes'});
const endpoints = Router();

endpoints.post('/filme', async (req, resp) => {
    try {
        let novoFilme = req.body;
        let filme = await cadastrarFilme(novoFilme);

        resp.send(filme);
    }
    catch (err) {
        resp.send(err.message);
    }
})

endpoints.put('/filme/:id/imagem', upload.single('capa'), async (req, resp) => {
    try {
        let id = req.params.id;
        let imagem = req.file.path;

        let resposta = await inserirImagem(imagem, id);

        if(resposta.affectedRows != 1)
        {
            throw new Error('Não foi possível carregar a imagem.')
        }

        resp.send(resposta);
    } catch (err) {
        resp.status(400).send(err.message);
    }
})

export default endpoints;