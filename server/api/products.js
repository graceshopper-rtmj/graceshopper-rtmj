const router = require('express').Router()
const { models: { Product, SaleItem, Sale } } = require('../db')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  const productId = req.params.id

  try {
    // Case: productId is not a number
    if (isNaN(productId)) {
      res.status(403).send(`Product with id '${productId}' was not found!`)
    }

    // Case: productId is a number
    else {
      const product = await Product.findByPk(productId)

      // Case: product with given productId does not exist
      if (!product) {
        res.status(404).send(`Product with id '${productId}' was not found!`)
      }

      // Case: product with given productId does exists
      else {
        res.json(product)
      }
    }
  } catch (err) {
    next(err)
  }
})

// PUT /api/products/:productId/users/:userId
router.put('/:productId/users/:userId', requireToken, async (req, res, next) => {
  try {
    // Get the user
    const user = req.user;
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
      currCart = await Sale.create({ isPurchased: false, userId: user.id })
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
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//POST api/products (admin access)
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    next(err);
  }
});

//PUT /api/products/:productId (admin access)
router.put('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const updateProduct = await Product.findByPk(req.params.productId);
    await updateProduct.update(req.body);
    res.status(201).send(updateProduct);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/products/:productId (admin access)
router.delete('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByPk(req.params.productId);
    await deleteProduct.destroy();
    res.send(deleteProduct);
  } catch (err) {
    next(err);
  }
})