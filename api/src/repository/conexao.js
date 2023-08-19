import mysql from 'mysql2';

let config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
};

const conexao = await mysql.createConnection(config);

export default conexao;