const { DataTypes , Model} = require("sequelize");
const sequelize = require('../db/config');

class User extends Model {}

User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    sequelize,
    timestamps:true
});

module.exports = User ;
