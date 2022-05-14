import './App.css';
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client'

const chooseSquare = square =>{

}

const Grid = ({socket, logout}) => {
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
        <button className="button" onClick={() => socket.emit("quit")}>Quit</button>
        </div>
    )
}

const Loading = ({socket,waiting, logout}) =>{
    return(
        <React.Fragment>
            <div className='title'>{waiting}</div>
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
            <div className="container">
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
            setWaiting('waiting for player............')
            setLogout('Logout')
            setGameStarted(false)
        })
        socket.on("game started",() => {
            setGameStarted(true)
            setLoading(false)
        })
        socket.on("logout",() => {
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