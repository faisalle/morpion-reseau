import './App.css';
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client'

const chooseSquare = square =>{

}

const Grid = () => {
    const [grid, setGrid] = useState (
        ['','','','','','','','',''] )
    return (
        <div>
        <h1 className='title'>TIK TAK TOE</h1>   
        <div className='gridcontainer'>
            <div className="block" onClick={() =>chooseSquare(0)}> {grid[0]}</div>
            <div className="block" onClick={() =>chooseSquare(1)}> {grid[1]}</div>
            <div className="block" onClick={() =>chooseSquare(2)}> {grid[2]}</div>
        </div>
        <div className='gridcontainer'>
            <div className="block" onClick={() =>chooseSquare(0)}> {grid[0]}</div>
            <div className="block" onClick={() =>chooseSquare(1)}> {grid[1]}</div>
            <div className="block" onClick={() =>chooseSquare(2)}> {grid[2]}</div>
        </div>
        <div className='gridcontainer'>
            <div className="block" onClick={() =>chooseSquare(0)}> {grid[0]}</div>
            <div className="block" onClick={() =>chooseSquare(1)}> {grid[1]}</div>
            <div className="block" onClick={() =>chooseSquare(2)}> {grid[2]}</div>
        </div>
            
        </div>
    )
}
const loading = ({socket, waiting})


const PreGame = ({socket, waiting}) => {
    return (
        <div className="App">
            <h1 className='title'> Jeux du morpion </h1>
            <div className="container">
                <button className="button"onClick={() => socket.emit("join game")}>join the game</button>
            </div>
            <div className='title'>{waiting}</div>
            <div className="containerLogout">
                <button className="button"onClick={() =>  socket.emit("logout")}> logout </button>
            </div>       
        </div>
    )
}

function App() {
    const [socket, setSocket] = useState(false)   
    const [waiting, setWaiting] = useState(false)  
    const [logout, setLogout] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
        const socket = io('http://localhost:8080')
        socket.on("waiting for player.....", () => {
            setWaiting('waiting for player............')
        })
        socket.on("game started",() => {
            setGameStarted(true)
        })
        setSocket(socket)
        return () => socket.disconnect()
    }, [])

    if (gameStarted)
        return <Grid/>
    else
        return <PreGame
                    socket={socket}
                    waiting={waiting}
                    logout={logout}

                />
}

export default App;
