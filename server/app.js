const express = require('express');
const mysql = require('mysql');
const http = require('http');
const { emit } = require('process');
const app = express;
const server = http.createServer(app);
const port = 8080;
const socketIo = require('socket.io');
const { compileFunction } = require('vm');
const {manageSocket} = require('./manageSocket')

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

var data = {
    client1 : false,
    client2 : false,
    player : 'X',
    grid : ['','','','','','','','',''],
}

const io = socketIo(server, {
    cors: {
        origin:('http://localhost:3000')
    }
})

//-----------CONNECTION--------------------
io.on("connection", socket  => {
    console.log("connection .............")
  manageSocket (db,socket,data)

})

server.listen(port,() => console.log(`Listening on port ${port}`));