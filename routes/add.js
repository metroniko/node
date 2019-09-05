const {Router} = require('express')
const router = Router()
const Course = require('../models/coures')
router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})
router.post('/',async (req, res) => {
  console.log(req.body);
  const { title, price, img } = req.body
  const course = new Course(title, price, img)
  await course.save()
  res.redirect('/courses')// перенапраляет
  
})
module.exports = router