const MesaModel = require("../models/MesaModel");

class WebMesaController {
    /**
    * Mostra uma tela com todos os recursos
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async index(req, res) {
        try {
            const message = req.session.message ? req.session.message : null;
            if (message) delete req.session.message;
            const mesas = await MesaModel.findAll();
            return res.render("Mesa/index", {
                layout: "Layouts/main", title: "Index de Mesa", mesas: mesas, message: message, csrfToken: req.csrfToken()
            });
        } catch (error) {
            return res.render("Mesa/index", { layout: "Layouts/main", title: "Index de Mesa", mesas: [], message: ["danger", JSON.stringify(error)] });
        }
    }

    /**
    * Mostra um formulário para criação de um novo recurso
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async create(req, res) {
        try {
            return res.render("Mesa/create", { layout: "Layouts/main", title: "Create de Mesa", csrfToken: req.csrfToken() });
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/mesa");
    }

    /**
    * Salva um novo recurso no banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async store(req, res) {
        try {
            const mesa = new MesaModel();
            mesa.numero = req.body.numero;
            mesa.estado = 'A'; // estado aberta
            const result = await mesa.save();
            req.session.message = ["success", `Mesa ${result.numero} salva com sucesso.`];
            return res.redirect("/mesa");
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/mesa");
    }

    /**
    * Mostra um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (mesa) {
                return res.render("Mesa/show", { layout: "Layouts/main", title: "Show de Mesa", mesa: mesa });
            }
            req.session.message = ["warning", "Mesa não encontrada."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/mesa");
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (mesa) {
                return res.render("Mesa/edit", { layout: "Layouts/main", title: "Show de Mesa", mesa: mesa, csrfToken: req.csrfToken() });
            }
            req.session.message = ["warning", "Mesa não encontrada."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/mesa");
    }

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async update(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (!mesa) {
                req.session.message = ["warning", "Mesa não encontrada."];
                return res.redirect("/tipoproduto");
            }
            mesa.descricao = req.body.descricao;
            const result = await mesa.update();
            req.session.message = ["success", `Mesa ${result.id}-${result.descricao} atualizada com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/mesa");
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (!mesa) {
                req.session.message = ["warning", "Mesa não encontrada."];
                return res.redirect("/tipoproduto");
            }
            const result = await mesa.delete();
            req.session.message = ["success", `Mesa ${result.id}-${result.descricao} removida com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/mesa");
    }
}
module.exports = new WebMesaController();