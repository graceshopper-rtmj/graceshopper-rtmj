const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('carts', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = Cart;
