const {Router} = require('express')
const Course = require('../models/coures')
const router =  Router()

const mapCartItems = (cart) => {

  
  return cart.items.map(i => ({
    ...i.courseId._doc, count: i.count
  }))
}
const computePrice = (courses) => {
  return courses.reduce((total, course)=>{
    return total += course.price*course.count// метод reduce проходится по массиву и сохраняет промежуточное значение в переменную total
  },0) 

}

router.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id)
  await req.user.addToCart(course)
  res.redirect('/card')
})
router.get('/', async (req, res) => {
  const user = await req.user.populate('cart.items.courseId').execPopulate()// предположение execPopulate для выполнения функции популайт если там указан длинный путь

  
  const courses = mapCartItems(user.cart)
 

  res.render('card', {
    title: 'Корзина',
    courses, 
    price: computePrice(courses) || 0 ,
    isCard: true
  })
})
router.delete('/remove/:id', async (req, res) => {
  await req.user.removeFromCard(req.params.id)// params так как мы берём его из адрессной строки
  const user = await req.user.populate('cart.items.courseId').execPopulate()
  const courses = mapCartItems(user.cart)
  const price = computePrice(courses)
  const card = {
    courses,
    price
  }
  res.status(200).json(card)
})
module.exports = router