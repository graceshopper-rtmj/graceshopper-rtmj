const router = require('express').Router()
const { models: { Product, User } } = require('../db')
const Sale = require('../db/models/Sale') // do these need to be pulled from /db ?
const SaleItem = require('../db/models/SaleItem') // do these need to be pulled from /db ?
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

// PUT /api/products/:productId/users/:userId
router.put('/:productId/users/:userId', async (req, res, next) => {
  try {
    // Get the user
    const user = await User.findByPk(req.params.userId);

    // Get the product
    const product = await Product.findByPk(req.params.productId)

    // Get current cart
    let currCart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false,
      },
      include: [
        { model: Product },
      ]
    })

    // If the user doesn't have a current cart, create one
    if (!currCart) {
      // Create a cart and associate it with the user
      await Sale.create({ isPurchased: false, userId: user.id })
      // Retrieve newly created cart
      currCart = await Sale.findOne({
        where: {
          userId: user.id,
          isPurchased: false,
        },
      })
      // Add the product to that cart
      await currCart.addProduct(product)
    }
    else // If there is a current cart
    {
      const cartItemIds = currCart.products.map(product => product.id)
      // Check if the product is in the cart
      if (currCart.products && cartItemIds.includes(product.id)) {
        const currSaleItem = await SaleItem.findOne({
          where: {
            saleId: currCart.id,
            productId: product.id
          }
        })
        await currSaleItem.update({ quantity: currSaleItem.quantity + 1 })
      }
      else {
        // Associate the product to the sale instance
        await currCart.addProduct(product)
      }
    }
  } catch (err) {
    next(err)
  }
})
