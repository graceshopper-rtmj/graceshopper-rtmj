const router = require('express').Router()
const { models: { Product } } = require('../db')
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
    // Get the product
    const product = await Product.findByPk(req.params.productId)
    // Associate the product and the user
    await product.addUser(req.params.userId)
    // Send back the product that was added to the user's cart
    res.send(product)
  } catch (err) {
    next(err)
  }
})
