const Sequelize = require('sequelize')

const sequelize = new Sequelize('assesment' , 'root' , 'nishu123' ,{
 dialect : 'mysql' ,
 host : 'localhost'


})


module.exports = sequelize ;