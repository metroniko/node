const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')
class Course {
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img    
    this.id = uuid()
  }
  toJSON() {
    return {//преобразует js в строку json
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    }  
  }
  async save() {//метод сохраняет данные в файле
    const courses = await Course.getAll()
    courses.push(this.toJSON())
    console.log(courses);
    return new Promise((resolve, reject)=>{
      fs.writeFile(
        path.join(__dirname,'..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)            
          } else {
            resolve()
          }
        } 
      )
    })

  }

  static getAll() {//статический метод получает данные из файла
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname,'..', 'data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) reject(err)  
          resolve(JSON.parse(content))//получает JSON строку и парсит её в обычную
      })
    })
  }
  static async getById(id) {
    
    const courses = await Course.getAll()
    return courses.find(c => c.id === id )
  }

  static async updateCourse(course) {
    
    const courses = await Course.getAll()
    const idx = courses.findIndex(crs => crs.id === course.id)    
    courses[idx] = course
    return new Promise((resolve, reject)=>{
      fs.writeFile(
        path.join(__dirname,'..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)            
          } else {
            resolve()
          }
        } 
      )
    })
  }
}
module.exports = Course