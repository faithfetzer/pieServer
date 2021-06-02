/*
items we want
first name- string
last name - string
email- string (limit 100 char/unique)
password- string
*/

const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100), 
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }
)

module.exports = User;