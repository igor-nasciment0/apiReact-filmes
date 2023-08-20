import conexao  from "./conexao.js";

export async function cadastrarFilme(filme)
{
    const sql =  
    `INSERT INTO TB_FILME (ID_USUARIO, NM_FILME, DS_SINOPSE, VL_AVALIACAO, DT_LANCAMENTO, BT_DISPONIVEL)
                   VALUES (?, ?, ?, ?, ?, ?)`

    let [resposta] = await conexao.query(sql, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = resposta.insertId;

    return filme;
}

export async function inserirImagem(imagem, id)
{
    const sql = 
    `UPDATE TB_FILME
        SET IMG_FILME = ?
      WHERE ID_FILME  = ?
    `

    let [resposta] = await conexao.query(sql, [imagem, id]);

    return resposta;
}