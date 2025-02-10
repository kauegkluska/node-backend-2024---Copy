const express = require("express");
const webProdutoController = require("../controllers_web/WebProdutoController");
const webTipoProdutoController = require("../controllers_web/WebTipoProdutoController");
const webMesaController = require("../controllers_web/WebMesaController");
const webUsuarioController = require("../controllers_web/WebUsuarioController");
const router = express.Router();

// Rotas de TipoProduto
router.get("/tipoproduto", webTipoProdutoController.index);
router.get("/tipoproduto/create", webTipoProdutoController.create);
router.post("/tipoproduto", webTipoProdutoController.store);
router.get("/tipoproduto/:tipoProdutoId", webTipoProdutoController.show);
router.get("/tipoproduto/:tipoProdutoId/edit", webTipoProdutoController.edit);
router.put("/tipoproduto/:tipoProdutoId", webTipoProdutoController.update);
router.delete("/tipoproduto/:tipoProdutoId", webTipoProdutoController.destroy);

// Rotas de Produto
router.get("/produto", webProdutoController.index);
router.get("/produto/create", webProdutoController.create);
router.post("/produto", webProdutoController.store);
router.get("/produto/:produtoId", webProdutoController.show);
router.get("/produto/:produtoId/edit", webProdutoController.edit);
router.put("/produto/:produtoId", webProdutoController.update);
router.delete("/produto/:produtoId", webProdutoController.destroy);

// Rotas de Mesa
router.get("/mesa", webMesaController.index);
router.get("/mesa/create", webMesaController.create);
router.post("/mesa", webMesaController.store);
router.get("/mesa/:mesaId", webMesaController.show);
router.get("/mesa/:mesaId/edit", webMesaController.edit);
router.put("/mesa/:mesaId", webMesaController.update);
router.delete("/mesa/:mesaId", webMesaController.destroy);

// Demais rotas ainda sem controlador (iremos criar um controlador para essas rotas no futuro)
router.get("/recurso", async (request, response) => {
    response.render("Recurso/index", {layout: "Layouts/main", title: "Recursos"});
});

router.get("/", async (request, response) => {
    response.render("index", {layout: "Layouts/main", title: "Página inicial"});
});

// Rotas de Autenticação
router.get("/usuario/login", webUsuarioController.loginForm);
router.post("/usuario/login", webUsuarioController.login);
router.post("/usuario/logout", webUsuarioController.logout);

// Rotas de Usuário
router.get("/usuario", webUsuarioController.index);
router.get("/usuario/create", webUsuarioController.create);
router.post("/usuario", webUsuarioController.store);
router.get("/usuario/:id", webUsuarioController.show);
router.get("/usuario/:id/edit", webUsuarioController.edit);
router.get("/usuario/:id/editemailpassword", webUsuarioController.editEmailPassword);
router.put("/usuario/:id/editemailpassword", webUsuarioController.updateEmailPassword);
router.put("/usuario/:id", webUsuarioController.update);
router.delete("/usuario/:id", webUsuarioController.destroy);



module.exports = router;