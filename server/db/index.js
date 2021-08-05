//this is the access point for all things database related!

const db = require('./db')
const Product = require('./models/Products')
const User = require('./models/User')
const SaleItem = require('./models/SaleItem')

//associations could go here!
// User.belongsToMany(Product, { through: "saleItem" });
// Product.belongsToMany(User, { through: "saleItem" });

module.exports = {
  db,
  models: {
    User,
    Product,
    SaleItem,
  },
}
