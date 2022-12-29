const express = require("express")
const app = express()
const server = require("http").createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const ejs = require('ejs')
const path = require("path")

port = 3000

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs')

app.get("/", (req,res)=>{
    res.render("index")
})

const names = {}

//Event emitter. We are listenning for event of someone connecting
io.on("connection", (socket)=>{

    if(socket.id){
    socket.on("set name", (name)=>{
        names[socket.id]=name
        console.log("user "+names[socket.id]+" connected")
        
    })}
    

    socket.on("chat msg", (msg)=>{
        console.log("message: "+msg)
        msg = names[socket.id]+": "+msg
        io.emit("send chat msg", msg)
    })

    socket.on("disconnect",()=>{
        console.log("user "+names[socket.id]+" disconnected")
    })
})

server.listen(port, ()=>{
    console.log("im all ears on "+port)
})