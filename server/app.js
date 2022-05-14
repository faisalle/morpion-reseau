const express = require('express')
const http = require('http');
const { emit } = require('process');
const app = express;
const server = http.createServer(app);
const port = 8080;
const socketIo = require('socket.io');
const { compileFunction } = require('vm');

var client1 = false
var client2 = false

const io = socketIo(server, {
    cors: {
        origin:'http://localhost:3000'
    }
})

io.on("connection", socket => {
    console.log("connection .............")
    socket.on("join game",() => {
        console.log("game joined")
        if (!client1) 
            client1 = socket
        else if (!client2 && socket !== client1 ) 
            client2 = socket     
        if (!client2) {
            socket.emit("loading ...")
        }
        else if(client1 && client2){
            client1.emit("game started")
            client2.emit("game started")
        }

        console.log(client1 ? true : false, client2 ? true : false)      
        
    })
    socket.on("logout",() =>{
        client1=false
        socket.emit("logout")
        console.log(client1 ? true : false, client2 ? true : false)      
    })
    socket.on("quit",() => {
        client1.emit("quit")
        client2.emit("quit")
        client1=false 
        client2=false
        console.log(client1 ? true : false, client2 ? true : false)      
    
    })
    
} )
server.listen(port,() => console.log(`Listening on port ${port}`));