class Button{
	constructor(x,y,width,height,context,value){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.context=context;
	this.value=value;
	this.fontSize=10;
	}
	render(){
		this.context.fillStyle="#000000";
		this.context.fillRect(this.x,this.y,this.width,this.height);
		this.context.font = this.getFont();
		this.context.fillStyle = "white";
		this.context.textAlign = "left";
		var text_width = this.context.measureText(this.value).width;
		this.context.textBaseline="middle";
		this.context.fillText(this.value, this.x + (this.width-text_width)/2, this.y+(this.height)/2);
	}
	onClick(x, y,callback){

		if(x>this.x && x<this.x +this.width && y>this.y && y<this.y+this.height)
		{
			if(callback !=null)
			callback();
		}
	}
	
	getFont() {
	var fontBase =50,                 // selected default width for canvas
    fontSize = this.fontSize;                     // default size for font
    var ratio = fontSize / fontBase;   // calc ratio
    var size = this.width * ratio;   // get font size based on current width
    return (size|0) + 'px Arial'; // set font
}
};