const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const HomeRoute = require('./routes/home')
const CardRoute = require('./routes/card')
const AddRuote = require('./routes/add')
const CouresRoute = require('./routes/courses')


const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)//регистрируем в экспрессе что есть такой движок
app.set('view engine', 'hbs')//используем этот движок
app.set('views', 'views')
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
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {//запуск сервера на порту
      console.log(`Server is running on port ${PORT}`);    
    })  
  } catch (error) {
    console.log(error); 
  }
}
start()

