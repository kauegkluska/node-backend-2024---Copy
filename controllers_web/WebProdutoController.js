const ProdutoModel = require("../models/ProdutoModel");
const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebProdutoController {
    /**
    * Mostra uma tela com todos os recursos
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    /** 
    * Mostra uma tela com todos os recursos 
    * @param {*} req Requisição da rota do express 
    * @param {*} res Resposta da rota do express 
    */
    async index(req, res) {
        try {
            const message = req.session.message ? req.session.message : null;
            if (message) delete req.session.message;
            const produtos = await ProdutoModel.findAllWithTipoProdutoDescricao();
            return res.render("Produto/index", { layout: "Layouts/main", title: "Index de Produto", produtos: produtos, message: message });
        } catch (error) {
            return res.render("Produto/index", { layout: "Layouts/main", title: "Index de Produto", produtos: [], message: ["danger", JSON.stringify(error)] });
        }
    }

    /** 
    * Mostra um formulário para criação de um novo recurso 
    * @param {*} req Requisição da rota do express 
    * @param {*} res Resposta da rota do express 
    */
    async create(req, res) {
        try {
            const tipoProdutos = await TipoProdutoModel.findAll();
            return res.render("Produto/create", { layout: "Layouts/main", title: "Create de Produto", tipoProdutos: tipoProdutos });
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
            return res.redirect("/produto");
        }
    }

    /** 
   * Salva um novo recurso no banco de dados 
   * @param {*} req Requisição da rota do express 
   * @param {*} res Resposta da rota do express 
   */
    async store(req, res) {
        try {
            const produto = new ProdutoModel();
            produto.numero = req.body.numero;
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.TipoProduto_id = req.body.TipoProduto_id;
            produto.ingredientes = req.body.ingredientes;
            const result = await produto.save();
            req.session.message = ["success", `Produto ${result.id}-${result.nome} salvo com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/produto");
    }


    /**
    * Mostra um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        const produto = await ProdutoModel.findOneWithTipoProdutoDescricao(req.params.produtoId);
        return res.render("Produto/show", { layout: "Layouts/main", title: "Show de Produto", produto: produto });
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        const tipoProdutos = await TipoProdutoModel.findAll();
        return res.render("Produto/edit", { layout: "Layouts/main", title: "Edit de Produto", tipoProdutos: tipoProdutos, produto: produto });
    }

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async update(req, res) {
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        if (produto) {
            produto.numero = req.body.numero;
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.TipoProduto_id = req.body.TipoProduto_id;
            produto.ingredientes = req.body.ingredientes;
            const result = await produto.update();
        }
        res.redirect("/produto");
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        if (produto) {
            await produto.delete();
        }
        return res.redirect(303, "/produto");
    }
}
module.exports = new WebProdutoController();