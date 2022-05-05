const sequelize = require('sequelize');
require("dotenv").config();

const connection = new sequelize('guiaperguntas','root',process.env.PASSWORD,{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;