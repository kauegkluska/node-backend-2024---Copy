// O objetivo desse arquivo é configurar o express
const express = require("express");
const config = require("config");
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

// Guardando dentro da variável app uma propriedade
app.set("port", process.env.PORT || config.get("server.port"));
// Seto a template engine
app.set("view engine", "hbs");

// Middleware do Express que é usado para fazer o parsing dos dados enviados pelo cliente através de formulários HTML
app.use(express.urlencoded({ extended: false }));
// Middleware para criar rotas estáticas para todos os arquivos da pasta public
app.use(express.static("./public"));

// Utilizo um arquivo externo para definir as rotas WEB
app.use(webRoutes);
// Utilizo um arquivo externo para definir as rotas API
app.use(apiRoutes);

// exporta o objeto app configurado
module.exports = app;