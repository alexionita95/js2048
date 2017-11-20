class Tile{
	constructor(x,y,width,height,context,value){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.context=context;
	this.value=value;
}

componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

convertToColor(value)
{
	var max = Math.log2(2048);
	var colorMax = 255;
	var colorStart=100;
	var colorRange=colorMax-colorStart;
	var percentage = Math.log2(value)/(max);
	var blue = colorStart+ Math.floor(colorRange * percentage);
	var green = Math.floor(colorRange * (1-percentage)*1.5);
	var red = Math.floor(colorRange * (1 - percentage)*0.5);
	return "#"+this.componentToHex(red)+this.componentToHex(green)+this.componentToHex(blue);
} 

getFont() {
	var fontBase = 100,                 // selected default width for canvas
    fontSize = 40;                     // default size for font
    var ratio = fontSize / fontBase;   // calc ratio
    var size = this.width * ratio;   // get font size based on current width
    return (size|0) + 'px Arial'; // set font
}

render(){
	var gap=5;
	if(this.value===0)
	{
		this.context.fillStyle="#666666";
	}
	else{
		this.context.fillStyle=this.convertToColor(this.value);
	}
	this.context.fillRect(this.x+gap,this.y+gap,this.width-2*gap,this.height - 2*gap);
	//this.context.fillStyle="#000000";
	//this.context.stroke();
	if(this.value!==0)
	{
		this.context.font = this.getFont();
		this.context.fillStyle = "white";
		this.context.textAlign = "left";
		var text_width = this.context.measureText(this.value).width;
		this.context.textBaseline="middle";
		this.context.fillText(this.value, this.x + (this.width-text_width)/2, this.y+(this.height)/2);
	}	
}


};