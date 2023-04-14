const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db//config');

class Like extends Model {}

Like.init({
    stars:{
        type:DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN
    }
},{
    sequelize,
    timestamps:true
});

module.exports = Like ;