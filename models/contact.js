const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db/config');

class Contact extends Model {}

Contact.init({
    status:{
        type:DataTypes.BOOLEAN
    }
},{
    sequelize,
    timestamps:true
});

module.exports = Contact ;