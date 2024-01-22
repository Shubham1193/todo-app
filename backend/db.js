const mongoose = require("mongoose");

// mongodb+srv://kirags123:8qPEa8KTKBEh2bss@cluster0.f3qlbuo.mongodb.net/todos
// .env
//shubham
mongoose.connect("mongodb+srv://admin:Shubham1173@cluster0.8uttq.mongodb.net/todos")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: {type : Boolean , default : false}
})

const userSchmema = mongoose.Schema({
    username : String,
    password : String,
    todos : [todoSchema]
})

const todo = mongoose.model('User_Todo', userSchmema);

module.exports = {
    todo
}