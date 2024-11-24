const ProdutoModel = require("../models/ProdutoModel");
const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebProdutoController {
    /**
    * Mostra uma tela com todos os recursos
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async index(req, res) {
        const produtos = await ProdutoModel.findAllWithTipoProdutoDescricao();
        return res.render("Produto/index", { layout: "Layouts/main", title: "Index de Produto", produtos: produtos });
    }

    /**
    * Mostra um formulário para criação de um novo recurso
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async create(req, res) {
        const tipoProdutos = await TipoProdutoModel.findAll();
        return res.render("Produto/create", { layout: "Layouts/main", title: "Create de Produto", tipoProdutos: tipoProdutos });
    }

    /**
    * Salva um novo recurso no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async store(req, res) {
        const produto = new ProdutoModel();
        produto.numero = req.body.numero;
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.TipoProduto_id = req.body.TipoProduto_id;
        produto.ingredientes = req.body.ingredientes;
        const result = await produto.save();
        return res.redirect("/produto");
    }

    /**
    * Mostra um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        return res.send("show");
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async edit(req, res) {

    }
    
    /**
    * Atualiza um recurso existente no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async update(req, res) {

    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        if(produto){
            await produto.delete();
        }
        return res.redirect(303, "/produto");
    }
}
module.exports = new WebProdutoController();