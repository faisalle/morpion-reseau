import './App.css';
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client'

const Grid = ({socket, logout}) => {
    const [win, setWin] = useState(false)
    const [casetaken, setCaseTaken] = useState(false)
    const [grid, setGrid] = useState (
        ['','','','','','','','',''] )

    useEffect(() => {
        socket.on('played',({pos, form}) => {
            var newGrid = grid.slice()
            newGrid[pos]=form
            setGrid(newGrid)
            setWin(false)
            setCaseTaken(false)
        socket.on('winX',() => {
            setGrid(['','','','','','','','',''])
            setWin('partie gagné par X')
        })
        socket.on('winO',() => {
            setGrid(['','','','','','','','',''])
            setWin('partie gagné par O')

        })
        socket.on('draw',() => {
            setGrid(['','','','','','','','',''])
            setWin(`Pas de gagnant rejouer`)

        })
        socket.on('case taken',() => {
            setCaseTaken('case taken')
        })
        
        })
        return () => socket.off('played')
    }, [grid,socket])

    return (
        <div>
            <h1 className='title'>TIK TAK TOE</h1>   
            <div className='wincontainer'>
             <div className='winPrint'>{win}{casetaken}</div>
            </div>
            <div className='gridcontainer'>
                <div className="block" onClick={() =>socket.emit('clickSquare', 0)}> {grid[0]}</div>
                <div className="block" onClick={() =>socket.emit('clickSquare', 1)}> {grid[1]}</div> 
                <div className="block" onClick={() =>socket.emit('clickSquare', 2)}> {grid[2]}</div>
            </div>
            
            <div className='gridcontainer'>
                <div className="block" onClick={() =>socket.emit('clickSquare', 3)}> {grid[3]}</div>
                <div className="block" onClick={() =>socket.emit('clickSquare', 4)}> {grid[4]}</div>
                <div className="block" onClick={() =>socket.emit('clickSquare', 5)}> {grid[5]}</div>
            </div>
            <div className='gridcontainer'>
                <div className="block" onClick={() =>socket.emit('clickSquare', 6)}> {grid[6]}</div>
                <div className="block" onClick={() =>socket.emit('clickSquare', 7)}> {grid[7]}</div>
                <div className="block" onClick={() =>socket.emit('clickSquare', 8)}> {grid[8]}</div>
            </div>
            <div className='wincontainer'>
             <div className='winPrint'>{win}{casetaken}</div>
            </div>
         
            <button className="quitbutton" onClick={() => socket.emit("quit")}>Quit</button>
        </div>
    )  
}

const Loading = ({socket,waiting, logout}) =>{
    return(
        <React.Fragment>
            <div  className='loadingtitle'>{waiting}</div>
                <div className="containerLogout">
                    <button className="button"onClick={() =>  socket.emit("logout")}>{logout}</button>
            </div>  
        </React.Fragment>
    )

}

const PreGame = ({socket}) => {
    return (
        <div className="App">
            <h1 className='title'> Jeux du morpion </h1>
            <div className="joincontainer">
                <button className="button"onClick={() => socket.emit("join game")}>join the game</button>
            </div>  
        </div>
    )
}

function App() {
    const [socket, setSocket] = useState(false)   
    const [waiting, setWaiting] = useState(false)  
    const [loading, setLoading] = useState(false)
    const [logout, setLogout] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)

  
    useEffect(() => {
        const socket = io('http://localhost:8080')
        socket.on("loading ...", () => {
            setLoading(true)
            setWaiting('waiting for friend that you dont have...') 
            setLogout('Logout')
            setGameStarted(false)
        })
        socket.on("logout",() => {
            setLoading(false)
        })
        socket.on("game started",() => {
            setGameStarted(true)
            setLoading(false)
        })
        socket.on("quit",() => {
            console.log('quit')
            setGameStarted(false)
        })
        setSocket(socket)
        return () => socket.disconnect()
    }, [])

    if (gameStarted && !loading){
        console.log("gameStarted")
        return <Grid
                    logout={logout}
                    socket={socket}
                />
    }
    else if(loading){
        console.log("loading")
        return<Loading
        socket={socket}
        waiting={waiting}
        logout={logout}
        />
    }
    else{
        return <PreGame
                    socket={socket}                    
                />}
}

export default App;