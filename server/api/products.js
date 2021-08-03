const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/products', async (req, res, next) => {
    try {
      const products = await Product.findAll({

      })
      res.json(products)
    } catch (err) {
      next(err)
    }
  })

  router.get('/products/:id', async (req, res, next) => {
    try {
      const product = await Product.findfindByPk(req.params.id)
      res.json(product)
    } catch (err) {
      next(err)
    }
  })