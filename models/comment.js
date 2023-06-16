const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db/config');

class Comment extends Model {}

Comment.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ImageId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true
});

module.exports = Comment;