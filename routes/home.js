const {Router} = require('express')
const router = Router()


router.get('/', (req, res)=>{// сомое начальное обновдение страницы - веб запросс
  res.render('index', {
    title: 'Главная страница',
    isHome: true
  })
})

module.exports = router 