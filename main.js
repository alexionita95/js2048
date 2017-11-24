var game=new Game();
window.onload = function(){game.init();
document.addEventListener('touchstart', handleTouchStart, {passive: false});        
document.addEventListener('touchmove', handleTouchMove, {passive: false});
window.onresize=function(){game.update()}
document.onkeydown = checkKey;
game.canvas.onclick=function(e){game.handleClick(e)};
resetGame();
};

function resetGame(){
game.reset();
}
function increaseBoard()
{
	if(game.board_size <10)
	game.board_size++;
	resetGame();
}
function decreaseBoard()
{
	if(game.board_size > 3)
	game.board_size--;
	resetGame();
}
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
		game.moveUp();
        // up arrow
    }
    else if (e.keyCode == '40') {
		game.moveDown();
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
	    game.moveLeft();
    }
    else if (e.keyCode == '39') {
		game.moveRight();
       // right arrow
    }
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
            game.moveLeft();
			//alert('left!');
        } else {/* right swipe */
            game.moveRight();
			//alert('right!');
        }                       
    } else {
        if ( yDiff > 0 ) {/* up swipe */
            //alert('Up!');
				game.moveUp();
        } else { /* down swipe */
            game.moveDown();
			//alert('Down!');
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;
    }
};

