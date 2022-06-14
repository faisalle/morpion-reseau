const { draw,winO,winX } = require("./checkWin")



const manageSocket = (db,socket,data) => {

    socket.on("join game",() => {
        console.log("game joined")
        if (!data.client1) 
            data.client1 = socket
        else if (!data.client2 && socket !== data.client1 ) 
            data.client2 = socket     
        if (!data.client2) {
            socket.emit("loading ...")
        }
        else if(data.client1 && data.client2){
            data.client1.emit("game started")
            data.client2.emit("game started")
        }
        console.log(data.client1 ? true : false, data.client2 ? true : false)      
    })
    //---------------BOUTON LOGOUT------------------------------
    socket.on("logout",() =>{
        data.client1=false
        socket.emit("logout")
        console.log('logout')
        data.grid = ['','','','','','','','','']
        console.log(data.client1 ? true : false, data.client2 ? true : false)      
    })
    //---------------BOUTON QUIT --------------------------------
    socket.on("quit",() => {
        data.client1.emit("quit")
        data.client2.emit("quit")
        data.grid = ['','','','','','','','','']
        data.client1=false 
        data.client2=false
        data.player='X'
        console.log(data.client1 ? true : false, data.client2 ? true : false)      
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
        if((data.grid[pos]==='X' || data.grid[pos]==='O')){
          console.log('case taken ')
          socket.emit('case taken')
        }
        else if (socket===data.client1 && data.player==='X'){
            data.grid[pos] = 'X'
            console.log(`data.client1 clicked`)
            data.client1.emit('played',{pos,form:'X'})
            data.client2.emit('played',{pos,form:'X'})
            data.player='O'
        }
        else if(socket===data.client2 && data.player==='O') {
            data.grid[pos] = 'O'
            console.log(`data.client2 clicked`)
            data.client1.emit('played',{pos,form:'O'})
            data.client2.emit('played',{pos,form:'O'})
            data.player='X'
        }
        if (draw(data.grid,pos)){    
            db.query("update stats set draw = draw + 1",(err,res) => {
                if(err)
                    console.log(err)
                else 
                    console.log (res)
            })
            data.client1.emit("draw")
            data.client2.emit('draw')
            console.log('draw')
            data.grid = ['','','','','','','','','']
            data.player='X'
        }
        else if (winX (data.grid)) {
            db.query("update stats set winX = winX + 1",(err,res) => {
                if(err)
                    console.log(err)
                else 
                    console.log (res)
            })
            data.client1.emit('winX')
            data.client2.emit('winX') 
            console.log('winX')
            data.grid = ['','','','','','','','',''] 
            data.player='X' 
        }
        else if (winO (data.grid)) {
            db.query("update stats set winO = winO + 1",(err,res) => {
                if(err)
                    console.log(err)
                else 
                    console.log (res)
            })
            data.client1.emit('winO')
            data.client2.emit('winO') 
            console.log('winO')
            data.grid = ['','','','','','','','','']
            data.player='X'
        }
    })
}







module.exports={manageSocket}