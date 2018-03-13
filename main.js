// core variables
var xpos = window.innerWidth / 2;
var ypos = window.innerHeight - 20;
var width = 30;
var height = 30;
var dy = 10;

function random(x, y){
	x = Math.floor(Math.random() * x);
	y = Math.floor(Math.random() * y);

	return x, y;
}

// Creating player object
var player = {
	x : xpos,
	y : ypos,
	width: width,
	height: height,
	draw: function(){
		fill(0,255,0);
		ellipse(this.x, this.y, this.width, this.height);
	}
}

// Creating Enemies

var enemies = new Array();

function Enemies(I){
	I.activate = true;
	I.x = Math.random() + window.innerWidth;
	I.y = 0;
	I.height= 5;
	I.Width = 3;
	I.yVelocity=10;
	I.inBound = () => {
		return I.y >=0 && I.y <= window.innerHeight - I.height;
	}
	I.draw = () => {
		fill(255, 0, 0);
		ellipse(I.x, I.y, I.Width, I.height);
	}
	I.update = function (){
		I.activate = I.activate && I.inBound;
		I.y += I.yVelocity;
	}

		console.log(I.y);

	return I;
}

// Bullets array
var shoot = new Array();

// Bullet object
function Shoot(I){
	I.activate = true;
	I.x = player.x + player.width / 2;
	I.y = player.y + player.height / 2;
	I.height= 5;
	I.Width = 3;
	I.yVelocity=10;
	I.inBound = () => {
		return I.y >=0 && I.y <= window.innerHeight - I.height;
	}
	I.draw = () => {
		fill(255, 0, 0);
		ellipse(I.x, I.y, I.Width, I.height);
	}
	I.update = function (){
		I.activate = I.activate && I.inBound;
		I.y -= I.yVelocity;
	}

		console.log(I.y);

	return I;
}


// initializing P5 js
function setup() {
	createCanvas(window.innerWidth,window.innerHeight);
	var bdy = document.querySelector("body");
	bdy.style.margin = 0;
	bdy.style.padding = 0;
	bdy.style.overflow = "hidden";

}

// Drawing elements to the canvas
function draw(){
	background(52);
	player.draw();

	if(keyIsDown(37)){
		//console.log(player.x);
		if(player.x - 10 >= 0){
			player.x -= 10;
		}else{
			player.x = 0;
		}
	}

	if (keyIsDown(39)){
		if(player.x + 10 <= window.innerWidth){
			player.x += 10;
		}
	}

	if(keyIsDown(32)){
		shoot.push(Shoot({}));
	}


	shoot.forEach((shoot)=>{
		shoot.update();
		shoot.draw();
	});

	enemies=enemies.filter((enemies)=>{
		return enemies.activate();
	});

	enemies.forEach((enemies)=>{
		enemies.update();
		enemies.draw();
	});

}
