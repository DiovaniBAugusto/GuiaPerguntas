const Sequelize = require('sequelize');
const connection = require("./database");

const Resposta = connection.define("resposta",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    idpergunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Resposta.sync({force: false});

module.exports = Resposta;