import './App.css';
import React, { useState } from 'react';
//match NUL
const draw = (grid) => {
    if (( grid[0]==='O'||grid[0]==='X')&&
    (grid[1]==='O'||grid[1]==='X')&& 
    (grid[2]==='O'||grid[2]==='X')&& 
    (grid[3]==='O'||grid[3]==='X')&& 
    (grid[4]==='O'||grid[4]==='X')&& 
    (grid[5]==='O'||grid[5]==='X')&& 
    (grid[6]==='O'||grid[6]==='X')&& 
    (grid[7]==='O'||grid[7]==='X')&&     
    (grid[8]==='O'||grid[8]==='X'))
        return true
    return false
}

//Gagnant X
const vicX = (newGrid) => {
    if((newGrid[0]==='X'&&newGrid[1]==='X'&&newGrid[2]==='X')||
    (newGrid[3]==='X'&&newGrid[4]==='X'&&newGrid[5]==='X')||
    (newGrid[6]==='X'&&newGrid[7]==='X'&&newGrid[8]==='X')||
    (newGrid[0]==='X'&&newGrid[3]==='X'&&newGrid[6]==='X')||
    (newGrid[1]==='X'&&newGrid[4]==='X'&&newGrid[7]==='X')||
    (newGrid[2]==='X'&&newGrid[5]==='X'&&newGrid[8]==='X')||
    (newGrid[0]==='X'&&newGrid[4]==='X'&&newGrid[8]==='X')||
    (newGrid[2]==='X'&&newGrid[4]==='X'&&newGrid[6]==='X'))   
        return true
    return false
}

//Gagant O
const vicO = (newGrid) => {
  
    if((newGrid[0]==='O'&&newGrid[1]==='O'&&newGrid[2]==='O')||
    (newGrid[3]==='O'&&newGrid[4]==='O'&&newGrid[5]==='O')|| 
    (newGrid[6]==='O'&&newGrid[7]==='O'&&newGrid[8]==='O')||
    (newGrid[0]==='O'&&newGrid[3]==='O'&&newGrid[6]==='O')||
    (newGrid[1]==='O'&&newGrid[4]==='O'&&newGrid[7]==='O')||
    (newGrid[2]==='O'&&newGrid[5]==='O'&&newGrid[8]==='O')||
    (newGrid[0]==='O'&&newGrid[4]==='O'&&newGrid[8]==='O')||
    (newGrid[2]==='O'&&newGrid[4]==='O'&&newGrid[6]==='O'))
        return true
    return false
}


function App() {
    const [victoryx, setVictoryX] = useState(0)
    const [victoryo, setVictoryO] = useState(0)
    const [nowin, setNowin] = useState(0)
    const [grid, setGrid] = useState (
    ['','','','','','','','',''] )
    const [turn ,setTurn]= useState('X') 
    const [win,setWin] = useState (false)

    if (win){
        console.log(win)
        alert(win)
    }
  
    const chooseSquare = square => {
    console.log ('chooseSquare')

    if (win){
        setGrid(['','','','','','','','',''])
        setWin(false)
        return
    }

    if (draw(grid)){    
        setGrid(['','','','','','','','',''])
        alert ('match nul recommencez la partie !')
        setTurn('X')
        setNowin(nowin+1)
        return
    }

    else if ((grid[square]==='O'||grid[square]==='X')){
        alert ('case deja occuper')
        return 
    }
    
    const newGrid = grid.slice()
    newGrid[square]= turn ; 
    setGrid (newGrid);
    if (turn === 'X')
        setTurn ('O')
    else if (turn === 'O') 
        setTurn('X')  

    if (vicO(newGrid)){
        setWin('Le joueur O a gagné')
        setTurn('X')
        setVictoryO(victoryo+1)
    } 
    else if (vicX(newGrid)){
        setWin ('Le joueur X a gagné')
        setTurn('X')
        setVictoryX(victoryx+1)
        return
    }
}
  
    const page = (
        <React.Fragment>
            <h1 className='title'>MORPION</h1>
            {/*premier container*/}
            <div className="container">
                <div className="block" onClick={() =>chooseSquare(0)}> {grid[0]}</div>
                <div className="block" onClick={() =>chooseSquare(1)}> {grid[1]}</div>
                <div className="block" onClick={() =>chooseSquare(2)}> {grid[2]}</div>
            </div>
            {/*deuxieme container*/}
            <div className="container">
                <div className="block" onClick={() =>chooseSquare(3)}> {grid[3]} </div>
                <div className="block" onClick={() =>chooseSquare(4)}> {grid[4]} </div>
                <div className="block" onClick={() =>chooseSquare(5)}> {grid[5]} </div>
            </div>
            {/*premier container*/}
            <div className="container">
                <div className="block" onClick={() =>chooseSquare(6)}> {grid[6]} </div>
                <div className="block" onClick={() =>chooseSquare(7)}> {grid[7]} </div>
                <div className="block" onClick={() =>chooseSquare(8)}> {grid[8]} </div>
            </div>
            <div className='victoryX'>X victory : {[victoryx]}</div>
            <div className='victoryO'>O victory : {[victoryo]}</div>
            <div className='victoryN'>match nul : {[nowin]}</div>
            <h1 className='title'>{win}</h1>
        </React.Fragment> 
    ) 
    return page
}
export default App;
