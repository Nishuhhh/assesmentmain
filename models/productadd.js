const Sequelize =  require('sequelize')
const sequelize =  require('../util/database')

const Product = sequelize.define('product', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    productId:{
        type : Sequelize.STRING ,
        allowNull : false 
    } ,

    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type : Sequelize.INTEGER ,
        allowNull :  false ,
    },
    Quantity:{
        type: Sequelize.INTEGER ,
        allowNull : false ,
                

    }
    
    



   
})

module.exports = Product
