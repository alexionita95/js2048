class Game{
	constructor(){
		this.board=null;
		this.board_size=6;
		this.score=0;
		this.context=null;
		this.tile_width=0;
		this.canvas=null;
		this.gameOver=false;
		this.resetButton=null;
		this.baseY=75;
		this.base_tile_width=0;
		this.uiY=0;
	
}
zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : this.zeros(dimensions.slice(1)));
    }

    return array;
}
initBoard(board)
{
	for(var i=0;i<this.board_size;i++)
	{
		for(var j=0;j<this.board_size;j++)
			board[i][j]=0;
	}
	return board;
}
init(){
this.board_size=4;
this.baseY=75;
this.reset();
}
reset(){
this.board=this.initBoard(this.zeros([this.board_size,this.board_size]));
this.score=0;
this.context=null;
this.tile_width=0;
this.canvas=null;
this.gameOver=false;
this.canvas = document.getElementById("mainCanvas");
this.context = this.canvas.getContext("2d");
this.resetButton=new Button(0,this.uiY,75,50,this.context,"Reset");
this.plusButton=new Button(0,this.uiY,50,50,this.context,"+");
this.minusButton=new Button(0,this.uiY,50,50,this.context,"-");
this.board=this.insertRandom(this.board);
this.updateUI();
this.update();
}
updateUI()
{
	this.resetButton.x=this.canvas.width-2*this.base_tile_width-1;
	this.plusButton.x=this.canvas.width-this.base_tile_width/4;
	this.minusButton.x=this.canvas.width-this.base_tile_width;
	this.resetButton.width=this.base_tile_width;
	this.resetButton.height=this.base_tile_width/4;
	this.resetButton.fontSize=10;
	this.plusButton.width=this.base_tile_width/4;
	this.plusButton.height=this.base_tile_width/4;
	this.plusButton.fontSize=30;
	this.minusButton.width=this.base_tile_width/4;
	this.minusButton.height=this.base_tile_width/4;
	this.minusButton.fontSize=30;
}

insertRandom(board)
{
	do
	{
		var i= Math.floor(Math.random()*(this.board_size));
		var j= Math.floor(Math.random()*(this.board_size));
	}
	while(board[i][j] != 0)
		
	board[i][j]=2;
	return board;
}

update()
{

var canvasWidth=Math.min(document.body.clientWidth,document.body.clientHeight)-50;
this.canvas.width=canvasWidth;
this.canvas.height=canvasWidth+this.baseY;
this.tile_width=Math.floor(this.canvas.width/this.board_size);
this.base_tile_width=this.canvas.width/4;
this.baseY=this.base_tile_width/2;
this.updateUI();
this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
this.context.fillStyle="#333333";
this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
this.context.font =this.getFont(300,15); //"30px Arial";
this.context.fillStyle = "white";
this.context.textAlign="left"
this.context.fillText("Score: "+this.score,10, this.baseY-5); 
for(var i=0;i<this.board_size; i++)
{
	for(var j=0;j<this.board_size; j++)
	{
		var tile=new Tile(j*this.tile_width,this.baseY+i*this.tile_width,this.tile_width,this.tile_width,this.context,this.board[i][j]);
		tile.render();
	}
	
}
this.context.fillStyle="#666666";
this.context.fillRect(this.canvas.width-this.base_tile_width,this.uiY,1.5*this.base_tile_width,this.base_tile_width/4);
this.context.fillStyle="white";
this.context.font=this.getFont(400,20);
this.context.textAlign="left";
var txt=this.board_size+"x"+this.board_size;
var text_width = this.context.measureText(txt).width;
var text_pos=this.canvas.width-0.75*this.base_tile_width+text_width/4;
this.context.fillText(txt,text_pos,this.uiY+this.base_tile_width/8);


this.resetButton.render();
this.plusButton.render();
this.minusButton.render();
}


rotate(board)
{
	var newMat=this.initBoard(this.zeros([this.board_size,this.board_size]));
for(var i=0;i<this.board_size; i++)
{
	for(var j=0;j<this.board_size; j++)
	{
		newMat[i][j]=board[this.board_size-1-j][i];
	}
	
}

return newMat;
}

slideLeft(line)
{
	var newLine=this.zeros([this.board_size]);
	var pos=0;
	for(var i=0;i<this.board_size;i++)
	{
		if(line[i]!=0)
		{
			newLine[pos++]=line[i];
		}
	}
	return newLine;
}
computeLeft(line)
{
	for(var i=0;i<this.board_size-1;i++)
	{
		if(line[i]!=0 && line[i+1]!=0 && line[i]==line[i+1])
		{
			line[i] += line[i+1];
			line[i+1]=0;
			this.score += line[i];
		}
	}
	return line;
}
processLine(line)
{
	line = this.slideLeft(line);
	line = this.computeLeft(line);
	line = this.slideLeft(line);
	return line;
}
computeBoardLeft(board)
{
	for(var i=0;i<this.board_size;i++)
	{
		board[i] = this.processLine(board[i]);
	}
	return board;
}
checkContinue(board,oldBoard)
{
	if(!this.equals(oldBoard,board))
	{
	if(this.canInsert(board))
		this. board = this.insertRandom(board);
	
	
	this.update();
	if(!this.movesAvailable(board))
	{
		this.doGameOver();
	}
	}
}
doGameOver()
{
	this.context.fillStyle="rgba(0,0,0,0.8)";
	this.context.fillRect(0,50,this.canvas.width,this.canvas.height-50);
	this.context.fillStyle="rgba(255,255,255,1";
	this.context.textAlign="left";
	this.context.textBaseline="middle";
	this.context.font = this.getFont();
	var text_width = this.context.measureText("Game Over").width;
	this.context.fillText("Game Over", (this.canvas.width-text_width)/2,(this.canvas.height)/2);
}
movesAvailable(board)
{
var leftBoard=this.copyBoard(board);
leftBoard=this.internalLeft(leftBoard);
var rightBoard=this.copyBoard(board);
rightBoard=this.internalRight(rightBoard);
var topBoard=this.copyBoard(board);
topBoard=this.internalUp(topBoard);
var downBoard=this.copyBoard(board);
downBoard=this.internalDown(downBoard);
if(this.equals(leftBoard,board) && this.equals(rightBoard,board) && this.equals(topBoard,board) && this.equals(downBoard,board))
	return false;

return true;
}
copyBoard(board)
{
var newBoard=this.initBoard(this.zeros([this.board_size,this.board_size]));
for(var i=0;i<this.board_size;i++)
{
	for(var j=0;j<this.board_size;j++)
	{
		newBoard[i][j]=board[i][j];
	}
}
return newBoard;
}

equals(board1, board2)
{
	for(var i=0;i<this.board_size;i++)
{
	for(var j=0;j<this.board_size;j++)
	{
		if(board1[i][j]!=board2[i][j])
		{
			return false;
		}
	}
}
	return true;
}

canInsert(board)
{
	for(var i=0;i<this.board_size;i++)
	{
		for(var j=0;j<this.board_size;j++)
		{
			if(board[i][j]==0)
				return true;
		}
	}
	return false;
}


getFont(fontBase=500,fontSize=40) {
	//var fontBase = 500,                 // selected default width for canvas
    //fontSize = 40;                     // default size for font
    var ratio = fontSize / fontBase;   // calc ratio
    var size = this.canvas.width * ratio;   // get font size based on current width
    return (size|0) + 'px Arial'; // set font
}

internalLeft(board)
{
	return this.computeBoardLeft(board);
}
internalRight(board)
{
	board=this.rotate(board);
	board=this.rotate(board);
	board=this.computeBoardLeft(board);
	board = this.rotate(board);
	return	this.rotate(board);
}
internalUp(board)
{
	board = this.rotate(board);
	board = this.rotate(board);
	board = this.rotate(board);
	board=this.computeBoardLeft(board);
	return this.rotate(board);
}
internalDown(board)
{
	board = this.rotate(board);
	board = this.computeBoardLeft(board);
	board = this.rotate(board);
	board = this.rotate(board);
	return this.rotate(board);
}
moveLeft()
{
	var oldBoard= this.copyBoard(this.board);
	this.board=this.internalLeft(this.board);
	this.checkContinue(this.board,oldBoard);
}
moveRight()
{
	var oldBoard= this.copyBoard(this.board);
	this.board=this.internalRight(this.board);
	this.checkContinue(this.board,oldBoard);
}
moveUp()
{
	var oldBoard= this.copyBoard(this.board);
	this.board=this.internalUp(this.board);
	this.checkContinue(this.board,oldBoard);
}
moveDown()
{
	var oldBoard= this.copyBoard(this.board);
	this.board=this.internalDown(this.board);
	this.checkContinue(this.board,oldBoard);
}
handleClick(e){
var rect= this.canvas.getBoundingClientRect();
var x=e.clientX-rect.left;
var y=e.clientY-rect.top;
this.resetButton.onClick(x,y,resetGame);
this.plusButton.onClick(x,y,increaseBoard);
this.minusButton.onClick(x,y,decreaseBoard);
}
};