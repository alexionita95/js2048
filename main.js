class PlayerSquare{
 	constructor(x,y,width,height,context,value){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.context=context;
	this.value=value;
}
render(){
	var gap=5;
	if(this.value===0)
	{
		this.context.fillStyle="#E6D1B8";
	}
	else{
		this.context.fillStyle="#EE825A";
	}
	this.context.fillRect(this.x+gap,this.y+gap,this.width-2*gap,this.height - 2*gap);
	//this.context.fillStyle="#000000";
	//this.context.stroke();
	if(this.value!==0)
	{
	this.context.font = "60px Arial";
	this.context.fillStyle = "white";
	this.context.textAlign = "center";
	this.context.fillText(this.value, this.x + this.width/2, this.y+this.height/2);
	}	
}
};

var board=[
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,0,0,0]
];
var len=4;
var score=0;
var context;
var width;
var canvas;
var gameOver=false;
function init(){
canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
context = ctx;
width=canvas.width/4;
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
insertRandom();
update();
}
function update()
{
var baseY=200;
context.clearRect(0, 0, canvas.width, canvas.height);
context.fillStyle="#D0D1B8";
context.fillRect(0,0,canvas.width,canvas.height);
context.font = "30px Arial";
context.fillStyle = "white";
context.textAlign="left"
context.fillText("Score: "+score,10, baseY-40); 
for(var i=0;i<len; i++)
{
	for(var j=0;j<len; j++)
	{
		var square=new PlayerSquare(j*width,baseY+i*width,width,width,context,board[i][j]);
		square.render();
	}
	
}
if(gameOver)
{
}
}
function gameOver()
{
	context.font = "30px Arial";
	context.fillStyle = "red";
	context.fillText("Game Over",10, 20); 
}
function rotate()
{
	var newMat=[
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,0,0,0]
];
for(var i=0;i<len; i++)
{
	for(var j=0;j<len; j++)
	{
		newMat[i][j]=board[len-1-j][i];
	}
	
}

board = newMat;
}
function slideLeft(line)
{
	var newLine=[0,0,0,0];
	var pos=0;
	for(var i=0;i<len;i++)
	{
		if(line[i]!=0)
		{
			newLine[pos++]=line[i];
		}
	}
	return newLine;
}
function computeLeft(line)
{
	for(var i=0;i<len-1;i++)
	{
		if(line[i]!=0 && line[i+1]!=0 && line[i]==line[i+1])
		{
			line[i] += line[i+1];
			line[i+1]=0;
			score += line[i];
		}
	}
	return line;
}
function processLine(line)
{
	line = slideLeft(line);
	line = computeLeft(line);
	line = slideLeft(line);
	return line;
}
function computeBoardLeft()
{
	let oldBoard=board.slice(0);
	for(var i=0;i<len;i++)
	{
		board[i]=processLine(board[i]);
	}
	if(board!==oldBoard)
	{
	if(canInsert())
		insertRandom();
	else
		gameOver();
	}
}
function insertRandom()
{
	do
	{
		var i= Math.floor(Math.random()*(len));
		var j= Math.floor(Math.random()*(len));
		console.log(i+" "+j);
	}
	while(board[i][j] != 0)
	board[i][j]=2;
}
function canInsert()
{
	for(var i=0;i<len;i++)
	{
		for(var j=0;j<len;j++)
		{
			if(board[i][j]==0)
				return true;
		}
	}
	return false;
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
		rotate();
		rotate();
		rotate();
		computeBoardLeft();
		rotate();
        // up arrow
    }
    else if (e.keyCode == '40') {
		rotate();
		computeBoardLeft();
		rotate();
		rotate();
		rotate();
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
	    computeBoardLeft();
    }
    else if (e.keyCode == '39') {
		rotate();
		rotate();
		computeBoardLeft();
		rotate();
		rotate();
       // right arrow
    }
	update();
}
var xDown = null;                                                        
var yDown = null;                                                        
function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if(Math.abs( xDiff )+Math.abs( yDiff )>150){ //to deal with to short swipes

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {/* left swipe */ 
            alert('left!');
        } else {/* right swipe */
            alert('right!');
        }                       
    } else {
        if ( yDiff > 0 ) {/* up swipe */
            alert('Up!'); 
            alert('Up!'); 
        } else { /* down swipe */
            alert('Down!');
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;
    }
};

window.onload = init;
