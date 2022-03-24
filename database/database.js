const sequelize = require('sequelize');

const connection = new sequelize('guiaperguntas','root','oraclo662607015',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;