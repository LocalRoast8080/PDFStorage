const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', null, {
    dialect: 'mysql'
  })