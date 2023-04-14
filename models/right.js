const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db/config');

class Right extends Model{}

Right.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true
});

module.exports = Right ;