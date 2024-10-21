const DataBase = require('../config/DataBase');

(async () => {
    try {
        await DataBase.executeSQLFile('sqlbanco.sql');
    } catch (error) {
        console.error('Erro ao executar o arquivo SQL:', error);
    }
})();