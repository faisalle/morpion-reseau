 //----------------IF DRAW----------------
 const draw = (grid,pos) => {
    if ((grid[0]==='O'||grid[0]==='X')&&(grid[pos]==='X' || grid[pos]==='O')&&
    (grid[1]==='O'||grid[1]==='X')&& 
    (grid[2]==='O'||grid[2]==='X')&& 
    (grid[3]==='O'||grid[3]==='X')&& 
    (grid[4]==='O'||grid[4]==='X')&& 
    (grid[5]==='O'||grid[5]==='X')&& 
    (grid[6]==='O'||grid[6]==='X')&& 
    (grid[7]==='O'||grid[7]==='X')&&     
    (grid[8]==='O'||grid[8]==='X'))
        return true
}
//---------------IF WINX------------------
const winX = (grid) => {
    if ((grid[0]==='X'&&grid[1]==='X'&&grid[2]==='X')||
    (grid[3]==='X'&&grid[4]==='X'&&grid[5]==='X')||
    (grid[6]==='X'&&grid[7]==='X'&&grid[8]==='X')||
    (grid[0]==='X'&&grid[3]==='X'&&grid[6]==='X')||
    (grid[1]==='X'&&grid[4]==='X'&&grid[7]==='X')||
    (grid[2]==='X'&&grid[5]==='X'&&grid[8]==='X')||
    (grid[0]==='X'&&grid[4]==='X'&&grid[8]==='X')||
    (grid[2]==='X'&&grid[4]==='X'&&grid[6]==='X'))
        return true
    return false
}
//-------------------IF WINO----------------
const winO = (grid) => {
    if ((grid[0]==='O'&&grid[1]==='O'&&grid[2]==='O')||
    (grid[3]==='O'&&grid[4]==='O'&&grid[5]==='O')||
    (grid[6]==='O'&&grid[7]==='O'&&grid[8]==='O')||
    (grid[0]==='O'&&grid[3]==='O'&&grid[6]==='O')||
    (grid[1]==='O'&&grid[4]==='O'&&grid[7]==='O')||
    (grid[2]==='O'&&grid[5]==='O'&&grid[8]==='O')||
    (grid[0]==='O'&&grid[4]==='O'&&grid[8]==='O')||
    (grid[2]==='O'&&grid[4]==='O'&&grid[6]==='O'))
        return true
    return false
}

module.exports={winX,winO,draw}