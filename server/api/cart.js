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

    await oldCart.setProducts(req.body.map(product => product.id));
    const newCart = await Sale.findByPk(oldCart.id, {
      include: [{ model: Product }],
      attributes: ['id', 'userId'],
    })

    res.send(newCart);
  } catch (err) {
    next(err);
  }
});
