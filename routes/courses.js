const {Router} = require('express')
const Course = require('../models/coures')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find().populate('userId', 'email name').select('title price img')
  console.log('курсы ',courses);
  res.render('courses', {
    title: 'Курсы',
    isCouses: true,
    courses
  })
})
router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  const course = await Course.findById(req.params.id)
  res.render('course-edit', {
    title: course.title,
    course
  })
})
router.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({_id: req.body.id})  
    res.redirect('/courses')
  } catch (error) {
    console.log(error);
    
  }

})
router.post('/edit', async (req, res) => {
  const {id} = req.body
  delete req.body.id
  await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/courses')
})
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)
  console.log(req.params);
  res.render('course', {
    layout: 'empty',
    title: `курс ${course.title}`,
    course
  })
})

module.exports = router