import { Router } from "express";
import { login } from "../repository/usuarioRepository.js";


const endPoints = Router();

endPoints.post('/usuario/login', async (req, resp) => {
        try{
            let [email, senha] = req.body;

            let dados = await login(email, senha);

            if(!dados)
            {
                throw new Error('Credenciais Inválidas');
            }

            resp.send(dados);
        } 
        catch(err)
        {
            resp.send(err.message)
        }
})