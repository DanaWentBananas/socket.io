const path = require("path")
const http = require("http")
const express = require("express")
const app = express()
const server = http.createServer(app)

//adding this will give our server accesss to localhost/socket.io/socket.io.js
const io = require("socket.io")(server)

port = 3000

app.use(express.static(path.join(__dirname, "/../public")))

server.listen(3000, console.log("im all ears on "+3000))
