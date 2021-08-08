const router = require('express').Router()
const { models: { User, Product, SaleItem, Sale } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const cart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false
      },
      include: [{ model: Product }],
      attributes: ['id', 'userId']
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
