const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db/config');

class Profile extends Model {}

Profile.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    likes:{
        type:DataTypes.STRING
    },
    lastname:{
        type:DataTypes.STRING
    },
    birth:{
        type:DataTypes.DATE
    },
    imageSrc:{
        type:DataTypes.STRING
    },
    portrait:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    sequelize,
    timestamps:true
});

module.exports = Profile ;