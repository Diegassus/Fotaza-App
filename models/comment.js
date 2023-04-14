const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db/config');

class Comment extends Model {}

Comment.init({
    description:{
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

module.exports = Comment;