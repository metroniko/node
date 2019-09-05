const {Router} = require('express')
const Course = require('../models/coures')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.getAll() 
  
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
  const course = await Course.getById(req.params.id)
  res.render('course-edit', {
    title: course.title,
    course
  })
})
router.post('/edit', async (req, res) => {
  console.log('djn')
  
  await Course.updateCourse(req.body)
  res.redirect('/courses')
})
router.get('/:id', async (req, res) => {
  const course = await Course.getById(req.params.id)
  console.log(req.params);
  res.render('course', {
    layout: 'empty',
    title: `курс ${course.title}`,
    course
  })
})

module.exports = router