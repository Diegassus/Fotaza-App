const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db/config');

class Image extends Model {}

Image.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    resolution:{
        type:DataTypes.STRING,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    format:{
        type:DataTypes.STRING,
        allowNull:false
    },
    watermartk:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tags:{
        type:DataTypes.STRING
    },
    src:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    stars:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    timestamps:true
});

module.exports = Image ;