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

export async function listarFilmes()
{
    const sql = 
    `SELECT ID_FILME        id,
            NM_FILME        nome,
            VL_AVALIACAO    avaliacao,
            DT_LANCAMENTO   dataLancamento,
            BT_DISPONIVEL   disponivel
       FROM TB_FILME 
    `

    let [filmes] = await conexao.query(sql);

    return filmes;
}

export async function listarPorNome(nome)
{
    const sql = 
    `SELECT ID_FILME        id,
            NM_FILME        nome,
            VL_AVALIACAO    avaliacao,
            DT_LANCAMENTO   dataLancamento,
            BT_DISPONIVEL   disponivel
       FROM TB_FILME
      WHERE NM_FILME        LIKE ? 
    `

    let [filmes] = await conexao.query(sql, [`%${nome}%`]);

    return filmes;
}

export async function buscarPorID(id)
{
    const sql = 
    `SELECT ID_FILME        id,
            NM_FILME        nome,
            DS_SINOPSE      sinopse,
            VL_AVALIACAO    avaliacao,
            DT_LANCAMENTO   dataLancamento,
            BT_DISPONIVEL   disponivel,
            IMG_FILME       imagem
       FROM TB_FILME
      WHERE ID_FILME = ?
    `

    let [filme] = await conexao.query(sql, [id]);

    return filme[0];
}

export async function deletarFilme(id) {
    const sql = 
    `DELETE FROM TB_FILME
           WHERE ID_FILME = ?
    `

    let [resposta] = await conexao.query(sql, [id]);

    return resposta;
}

export async function alterarFilme(id, newData) {
    const sql =
    `UPDATE TB_FILME
        SET ID_USUARIO      = ?,
            NM_FILME        = ?,
            DS_SINOPSE      = ?,
            VL_AVALIACAO    = ?,
            DT_LANCAMENTO   = ?,
            BT_DISPONIVEL   = ?,
            IMG_FILME       = ?
      WHERE ID_FILME        = ?
    `

    let resposta = conexao.query(sql, [newData.id_usuario, newData.nome, newData.sinopse, newData.avaliacao, newData.lancamento, newData.disponivel, newData.imagem, id]);

    return resposta;
}