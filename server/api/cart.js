const router = require('express').Router();
const { models: { User, Product, SaleItem, Sale } } = require('../db');
const { requireToken } = require('./gatekeepingMiddleware')
module.exports = router;

// GET /api/cart
router.get('/', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false,
      },
      include: [{ model: Product }],
      attributes: ['id', 'userId'],
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart
router.put('/', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const oldCart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false,
      },
      include: [{ model: Product }],
      attributes: ['id', 'userId'],
    });
    if (req.body.method === 'delete') {
      await oldCart.setProducts(req.body.cart.map((product) => product.id));
      const newCart = await Sale.findByPk(oldCart.id, {
        include: [{ model: Product }],
        attributes: ['id', 'userId'],
      });

      res.send(newCart);
    } else if (req.body.method === 'increment') {
      const currSaleItem = await SaleItem.findOne({
        where: {
          saleId: oldCart.id,
          productId: req.body.cart
          //req.body.cart is the product id here
        }
      })
      await currSaleItem.update({ quantity: currSaleItem.quantity + 1 })
      let newCart = await Sale.findByPk(oldCart.id, {
        include: [{ model: Product }],
        attributes: ['id', 'userId'],
      });
      res.send(newCart);


    } else if (req.body.method === 'decrement') {
      const currSaleItem = await SaleItem.findOne({
        where: {
          saleId: oldCart.id,
          productId: req.body.cart
          //req.body.cart is the product id here
        }
      })
     
      await currSaleItem.update({ quantity: currSaleItem.quantity - 1 })
      let newCart = await Sale.findByPk(oldCart.id, {
        include: [{ model: Product }],
        attributes: ['id', 'userId'],
      });
      res.send(newCart);
    }
  } catch (err) {
    next(err);
  }
});

//POST api/cart
router.post('/guestcheckout', async (req, res, next) => {
  try {
    const newSale = await Sale.create({isPurchased: true});
    const ids = req.body.map(product => product.productId);
    await newSale.setProducts(ids);
    res.sendStatus(201);
  } catch (err) {
      next(err);
  }
}) 

//PUT api/cart/usercheckout
router.put('/usercheckout', async (req, res, next) => {
  try {
    const sale = await Sale.findByPk(req.body.id)
    await sale.update({isPurchased: true})
    res.send(201)
  } catch (err) {
    next(err);
  }
})