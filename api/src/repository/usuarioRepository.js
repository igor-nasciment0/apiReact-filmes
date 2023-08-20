import conexao from "./conexao"

export async function login(email, senha) {
    const sql = 
    `SELECT ID_USUARIO  ID
            NM_USUARIO  USUARIO  
            DS_EMAIL    EMAIL
       FROM TB_USUARIO
      WHERE DS_EMAIL    = ?
        AND DS_SENHA    = ?`

    let [resp] = await conexao.query(sql, [email, senha]);
    return resp[0];
}