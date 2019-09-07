const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const HomeRoute = require('./routes/home')
const CardRoute = require('./routes/card')
const AddRuote = require('./routes/add')
const CouresRoute = require('./routes/courses')
const User = require('./models/user')


const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)//регистрируем в экспрессе что есть такой движок
app.set('view engine', 'hbs')//используем этот движок
app.set('views', 'views')
app.use(async (req, res, next ) => {
  try {
    const user = await User.findById('5d73d6fc6cece208308942da')
    req.user = user
    next()
  } catch (error) {
    console.log(error); 
  }
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', HomeRoute)
app.use('/add',AddRuote)
app.use('/courses',CouresRoute)
app.use('/card', CardRoute)
const password = 'YYGIj5cxVsi1AJfN'


app.get('/about.html', (req, res)=>{
  res.render('about', {
    title: 'что то там'
  })
})

const start = async () => {
  try {
    const url = 'mongodb+srv://Kolya:YYGIj5cxVsi1AJfN@cluster0-ne92z.mongodb.net/shop'
    await mongoose.connect(url, {useNewUrlParser: true, useFindAndModify: true},)
    const condidate = await User.findOne()// без параметра возвращает праметр хотя бы одного пользователя 
    
    if(!condidate) {
      const user = new User({
        email:'kolya@kolya.ru',
        name:'Kolya',
        card: {
          items:[]
        }
        
      })
      await user.save()// сохраняет объект в базу данных
    }
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {//запуск сервера на порту
      console.log(`Server is running on port ${PORT}`);    
    })  
  } catch (error) {
    console.log(error); 
  }
}
start()

