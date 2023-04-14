const {DataTypes,Model} = require('sequelize');
const sequelize = require('../db/config');

class Contact extends Model {}

Contact.init({
},{
    sequelize,
    timestamps:true
});

module.exports = Contact ;