const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('fotaza','root',null,{
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize