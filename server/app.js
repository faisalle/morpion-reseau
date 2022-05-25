const express = require('express');
const mysql = require('mysql');
const http = require('http');
const { emit } = require('process');
const app = express;
const server = http.createServer(app);
const port = 8080;
const socketIo = require('socket.io');
const { compileFunction } = require('vm');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:'password',
    database: "morpion"
});
db.connect(err => {
    if (err)
        console.log(err)
})

var client1 = false
var client2 = false
var player = 'X'

const io = socketIo(server, {
    cors: {
        origin:('http://localhost:3000')
    }
})
var grid = ['','','','','','','','','']


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
        console.log('logout')
        grid = ['','','','','','','','','']
        console.log(client1 ? true : false, client2 ? true : false)      
    })
    socket.on("quit",() => {
        client1.emit("quit")
        client2.emit("quit")
        grid = ['','','','','','','','','']
        client1=false 
        client2=false
        player='X'
        console.log(client1 ? true : false, client2 ? true : false)      
    })
    socket.on("getDataGame",() => {
        db.query("select * from stats", (err,res) => {
            if(err)
                console.log(err)
            else {
                console.log (res)
                socket.emit("dataGame",res[0])
            }
        })
    })
    socket.on("clickSquare",(pos) => {

        if((grid[pos]==='X' || grid[pos]==='O')){
          console.log('case taken ')
          socket.emit('case taken')
        }
       else if (socket===client1 && player==='X'){
            grid[pos] = 'X'
            console.log(`client1 clicked`)
            client1.emit('played',{pos,form:'X'})
            client2.emit('played',{pos,form:'X'})
            player='O'
        }
        else if(socket===client2 && player==='O') {
            grid[pos] = 'O'
            console.log(`client2 clicked`)
            client1.emit('played',{pos,form:'O'})
            client2.emit('played',{pos,form:'O'})
            player='X'
        }
        if ((grid[0]==='O'||grid[0]==='X')&&(grid[pos]==='X' || grid[pos]==='O')&&
        (grid[1]==='O'||grid[1]==='X')&& 
        (grid[2]==='O'||grid[2]==='X')&& 
        (grid[3]==='O'||grid[3]==='X')&& 
        (grid[4]==='O'||grid[4]==='X')&& 
        (grid[5]==='O'||grid[5]==='X')&& 
        (grid[6]==='O'||grid[6]==='X')&& 
        (grid[7]==='O'||grid[7]==='X')&&     
        (grid[8]==='O'||grid[8]==='X')){
            db.query("update stats set draw = draw + 1",(err,res) => {
                if(err)
                    console.log(err)
                else 
                    console.log (res)
            })
            client1.emit("draw")
            client2.emit('draw')
            console.log('draw')
            grid = ['','','','','','','','','']
            player='X'
        }

        else if((grid[0]==='X'&&grid[1]==='X'&&grid[2]==='X')||
            (grid[3]==='X'&&grid[4]==='X'&&grid[5]==='X')||
            (grid[6]==='X'&&grid[7]==='X'&&grid[8]==='X')||
            (grid[0]==='X'&&grid[3]==='X'&&grid[6]==='X')||
            (grid[1]==='X'&&grid[4]==='X'&&grid[7]==='X')||
            (grid[2]==='X'&&grid[5]==='X'&&grid[8]==='X')||
            (grid[0]==='X'&&grid[4]==='X'&&grid[8]==='X')||
            (grid[2]==='X'&&grid[4]==='X'&&grid[6]==='X')){
            db.query("update stats set winX = winX + 1",(err,res) => {
                if(err)
                    console.log(err)
                else 
                    console.log (res)
                
            })
            client1.emit('winX')
            client2.emit('winX') 
            console.log('winX')
            grid = ['','','','','','','','',''] 
            player='X'
            return
        }
        else if((grid[0]==='O'&&grid[1]==='O'&&grid[2]==='O')||
            (grid[3]==='O'&&grid[4]==='O'&&grid[5]==='O')||
            (grid[6]==='O'&&grid[7]==='O'&&grid[8]==='O')||
            (grid[0]==='O'&&grid[3]==='O'&&grid[6]==='O')||
            (grid[1]==='O'&&grid[4]==='O'&&grid[7]==='O')||
            (grid[2]==='O'&&grid[5]==='O'&&grid[8]==='O')||
            (grid[0]==='O'&&grid[4]==='O'&&grid[8]==='O')||
            (grid[2]==='O'&&grid[4]==='O'&&grid[6]==='O')){
            db.query("update stats set winO = winO + 1",(err,res) => {
                if(err)
                    console.log(err)
                else 
                    console.log (res)
            })
            client1.emit('winO')
            client2.emit('winO') 
            console.log('winO')
            grid = ['','','','','','','','','']
            player='X'
            
        }
    })
} )
server.listen(port,() => console.log(`Listening on port ${port}`));