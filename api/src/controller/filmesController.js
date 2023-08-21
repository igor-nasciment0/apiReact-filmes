import { Router } from "express";
import { cadastrarFilme, inserirImagem, listarFilmes, listarPorNome, buscarPorID } from "../repository/filmesRepository.js";
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

endpoints.get('/filme', async (req, resp) => {
    try {

        let filmes = await listarFilmes();
        resp.send(filmes);

    } catch (err) {
        resp.status(400).send(err.message);
    }
});

endpoints.get('/filme/busca', async (req, resp) => {
    try {

        let nome = req.query.nome;
        let filmes = await listarPorNome(nome);
        resp.send(filmes);

    } catch (err) {
        
        resp.status(400).send(err.message);
    }
})

endpoints.get('/filme/:id', async (req, resp) => {
    try {
        
        let id = Number(req.params.id);
        let filme = await buscarPorID(id);
        
        if(!filme)
        {
            resp.status(404).send('Filme não encontrado');
        }

        resp.send(filme);

    } catch (err) {

        resp.status(400).send(err.message);

    }
})

export default endpoints;