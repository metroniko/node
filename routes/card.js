const {Router} = require('express')
const Course = require('../models/coures')
const router =  Router()

router.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id)
  await req.user.addToCart(course)
  res.redirect('/card')
})
router.get('/', async (req, res) => {
  // const card = await Card.fetch()
  // res.render('card', {
  //   title: 'Корзина',
  //   courses: card.courses, 
  //   price: card.price,
  //   isCard: true
  // })
  res.json({test: true})
})
router.delete('/remove/:id', async (req, res) => {
  const card = await Card.remove(req.params.id)
  console.log(card);
  
  res.status(200).json(card)
})
module.exports = router