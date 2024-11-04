const express = require("express");
const router = express.Router();
const DataBase = require("../config/DataBase");

router.get("/", (request, response) => {
    response.render("index");
});

router.get("/recurso", (request, response) => {
    response.render("Recurso/index");
});

router.get("/produto", async (request, response) => {
    const produtos = await DataBase.executeSQLQuery(`SELECT Produto.*,
                                                            TipoProduto.descricao as TipoProduto_descricao
                                                    FROM Produto
                                                    JOIN TipoProduto ON Produto.TipoProduto_id = TipoProduto.id`);
    //response.send({ produtos: produtos });
    response.render("Produto/index", { produtos: produtos });
});

router.get("/produto/create", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.render("Produto/create", { tipoProdutos: tipoProdutos });
});

router.post("/produto", async (request, response) => {
    const numero = request.body.numero;
    const nome = request.body.nome;
    const preco = request.body.preco;
    const TipoProduto_id = request.body.TipoProduto_id;
    const ingredientes = request.body.ingredientes;
    const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    const dataAtualizacao = timestamp;
    const dataCriacao = timestamp;
    const result = await DataBase.executeSQLQuery(`INSERT INTO Produto VALUES(null, ?, ?, ?, ?, ?, ?, ?)`,
        [
            numero,
            nome,
            preco,
            TipoProduto_id,
            ingredientes,
            dataAtualizacao,
            dataCriacao
        ]
    );
    response.redirect("/produto");
});


router.get("/tipoproduto", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.render("TipoProduto/index", { tipoProdutos: tipoProdutos });
});

router.get("/tipoproduto/create", async (request, response) => {
    response.render("TipoProduto/create");
});

router.post("/tipoproduto", async (request, response) => {
    const descricao = request.body.descricao;
    const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    const dataAtualizacao = timestamp;
    const dataCriacao = timestamp;
    const result = await DataBase.executeSQLQuery(`INSERT INTO TipoProduto VALUES(null, ?, ?, ?)`,
        [
            descricao,
            dataAtualizacao,
            dataCriacao
        ]
    );
    response.redirect("/tipoproduto");
});

module.exports = router;