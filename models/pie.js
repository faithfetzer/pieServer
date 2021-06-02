const { DataTypes} = require('sequelize'); //1
const db = require('../db'); //2

const Pie = db.define('pie', { //3
    nameOfPie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    baseOfPie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    crust: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeToBake: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    servings: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ratings: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Pie;
/*
1- object destructuring is used to extrapolate the DataTypes object from the sequelize dependency
2- we import the connection to our database that we set up in db.js
3- this is where the definition and the creation of th emodel takes place. we call the .define() method. this is a sequelize method that will map model properties

(as a notes- table names are pluralized in postgres- we clal it singular, it does plural)
*/