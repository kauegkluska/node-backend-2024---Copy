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

router.get("/tipoproduto", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.render("TipoProduto/index", { tipoProdutos: tipoProdutos });
});

module.exports = router;