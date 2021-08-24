const { Sequelize,QueryTypes } = require('sequelize');

const db = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWD, {
  host: 'localhost',
  dialect:'postgres'
});

module.exports = {db,QueryTypes};