const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken")

app.use(express.json());
app.use(cors());


app.post("/signup" , async function(req,res){
    const username = req.body.username
    const password = req.body.password

    try { 
        const user = await todo.create({
            username : username ,
            password : password,
            todos : []
        })
        if(!user){
            return res.status(411).json({msg : "Internal server error"})
        }
        else {
            res.json({msg : "User Created Successfully"})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({msg : "Internal server error"})
    }
})

app.post("/signin" , async function(req,res){
    try {
        const user = await todo.findOne({
            username : req.body.username,
            password : req.body.password
        })
        if(!user){
            return res.status(411).json({msg : "User not found"})
        }
        const token = jwt.sign({username : req.body.username , password : req.body.password} , "Secret")
        res.json({token : token})
        
    }catch(error){
        res.status(500).json("Internal Server Error");
    }
})


function authoMiddleware(req, res, next){
    const token = req.headers["authorization"]
    jwt.verify(token , "Secret" , function(err,user){
        if(err){
            return res.status(401).json({msg : "Not Authorized"})
        }
        req.user = user;
        next()
    })
    
  };
  app.get("/getTodo", authoMiddleware , async function(req, res) {
    const user = req.user.username;
    try {
        const userr = await todo.findOne(
            { username : user },
            { todos : 1 }
        );
        res.json({ todos : userr.todos }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" });
    }
});

    app.post("/addtodo", authoMiddleware , async function(req, res) {
        const user = req.user.username;

        // Check if request body contains title and description
        if (!req.body.title || !req.body.description) {
            return res.status(400).json({ msg: "Title and description are required" });
        }

        try {
            const updateUser = await todo.findOneAndUpdate(
                { username : user },
                { $push: { todos: { title: req.body.title, description: req.body.description } } },
                { new: true }
            );
            res.json({ todos: updateUser.todos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal Server error" });
        }
    });


app.put("/completedtodo/:todoid" ,authoMiddleware , async function(req,res){
    const id = req.params.todoid;
    try{
        const updatetodo = await todo.findOneAndUpdate(
            { "todos._id": id }, 
            { $set: { "todos.$.completed": true } },
            { new: true }
        )
        if(!updatetodo){
            res.status(403).json({msg : "todo not found "})
        }
        res.json({todos : updatetodo.todos })
    }catch(error){
        res.status(500).json("internal server error")
    }
})

app.delete("/deletetodo/:todoid", authoMiddleware, async function(req, res) {
    const id = req.params.todoid;

    try {
        const deletedTodo = await todo.findOneAndUpdate(
            { "todos._id": id }, 
            { $pull: { todos: { _id: id } } }, 
            { new: true }
        );

        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.json({ todos: deletedTodo.todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});






app.listen(3000);