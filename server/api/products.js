const router = require('express').Router()
const { models: { Product, Cart, User } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId/users/:userId', async (req, res, next) => {
  try {
    // Get the product that we want to add to the cart
    const product = await Product.findByPk(req.params.productId)

    // Get the user
    const user = await User.findByPk(req.params.userId)

    const userCart = await Cart.findAll()

    console.log("USER CART", userCart)

    // If the product is in the cart, update the qty

    // If the product is not in the cart, associate the product and the user
    await product.addUser(req.params.userId)

    // Send back the product that was added to the user's cart
    res.send(product)
  } catch (err) {
    next(err)
  }
})
