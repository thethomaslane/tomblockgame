var timestep = 1000/ 60;
var delta = 0;
var lastFrameTimeMs = 0;

function main (timestamp) {
	delta += timestamp - lastFrameTimeMs;
	lastFrameTimeMs = timestamp;
	while (delta >= timestep) {
		update(timestep);
		delta -= timestep;
	}
	draw();
  window.requestAnimationFrame( main );
 
  // Whatever your main loop needs to do
};

var seed = Math.floor(Math.random()*1000);
var rng =  new Random(seed);

 // Start the cycle

var sent = 0;

var rot = 0;
var red = 'red';
var blue = 'blue';
var enemy = red;
var x = 10;
var y = 120;

var cloudx= 0;
var cloudy = 50;

var speed = 0.3;

	var dy = -30;
	var ddy = 10;
	var sy;
	var negdy = -dy;
	var setjump = 0;

var redx = 500;
var redy = 120;
var redheight = 25;
var redwidth = 25;

var score= 0;

var lost = 0;

var rsqrd = Math.pow((25/Math.sqrt(2)),2);
window.requestAnimationFrame(main)
function update(delta) {

	if (redy >= y + 25 & redx <40 & enemy == blue)
	{
		sy = redy -25;
	}
	else {sy = 120}

	if (redx - x < 25 &( redy + 25)> y & (y + 25) >redy)
	{
		lost = 1; 
	};
	
	document.getElementById('main').addEventListener('keydown', move);
	document.getElementById('main').addEventListener('keyup', stopjump);

	document.getElementById('main').addEventListener('touchstart', move);
	document.getElementById('main').addEventListener('touchend', stopjump);
	
/*
	var key;

	if (key) {
	alert(key);
}*/
	
	

	if (setjump | y < sy)
	{

		jump();
	}
	else 
	{
		sy = y;
	};
	redx -= speed * timestep;

	
	if (redx <= -25) 
	{
		var extrax = Math.floor((rng.next() / 4294967294) * 300);
		
		redx = 300 + extrax;
		redy =120 -  Math.floor((rng.next() / 4294967294) * 150);
		console.log(redy);
		if (redy % 2 == 0) {redy=120};
		if (redy % 3 == 0) {enemy = blue;}
		else { enemy = red;}
		score += 1;
		speed =  0.3 +(rng.next() / 4294967294)*1.5
		
	};

	

	
}


function move(event) {
	



	if (event.key =='j' | event.type == 'touchstart') {
		setjump += 1;
	};
	if ((event.key =='r' | event.type== 'touchstart' )& lost == 1) {
		var x = document.getElementById("seed").value;
		if (x) {seed = x};
		redx = 500;
		redy=120;
		speed = 0.3;
		enemy = red;
		rng = new Random(seed);
		lost= 0;
		score = 0;
		sent=0;
	};
}


function jump() {


	if (setjump) {
		setjump += 2;
	} else if (y < sy) {
		dy =0;
	}
	if (setjump > 8)
	{
		setjump = 9;
	}
	

	if (dy < negdy)
	{
		dy += ddy;
		dy -= setjump;
	};
	y += dy;

	if (y >= sy)
	{
		y = sy;
		setjump = 0;
		dy = -30;
	};





}

function stopjump() {
	setjump = 0;
}

function lose() {

	if (!sent) {
	sendData();
}
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	redx = 500;
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,300,150);

	ctx.font = '48px serif';
	ctx.fillStyle = 'red';
	ctx.fillText("You Lose", 50,50);

	ctx.font = '24px serif';
	ctx.fillText("press r to restart", 75,100);
	ctx.fillText("Score: " + score, 75,125);
	
	


	
	
	
	function restart() {
		
			lost = 0;
			redx = 500;
			
			//window.requestAnimationFrame(main);
		
	
}
}


function Random(seed) {
  this._seed = seed % 2147483647;
  if (this._seed <= 0) this._seed += 2147483646;
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */
Random.prototype.next = function () {
  return this._seed = this._seed * 16807 % 2147483647;
};


function sendData() {
	sent = 1
	var xhttp = new XMLHttpRequest();
	var name = document.getElementById('name').value
	var seedname = seed.toString()


	xhttp.open("POST", "http://localhost:5000/" + "score?name=" + name + "&seed="+seedname+"&score="+score.toString(), true);
  	xhttp.send();
  	document.getElementById('scores').src += " ";
}

function draw() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, 300, 300); // clear canvas
	ctx.fillStyle = 'aqua';
	ctx.fillRect(0,0,300,145)
	ctx.fillStyle = 'green';
	ctx.fillRect(0, 145, 300,300);


	
	if (lost) {
		lose()
	}
	else {
	
	ctx.fillStyle = enemy;
	ctx.fillRect(redx,redy,
		redwidth,redheight);

	
	rot +=1;
	if (rot == 15) {rot == 0}
	ctx.fillStyle = 'black';
	ctx.save();
	ctx.translate(x+ 13, y + 13);
	ctx.rotate(rot  * Math.PI / 30);
	ctx.translate(-x- 13, -y - 13);
	ctx.fillRect(x,y,25,25);
	ctx.restore();
	ctx.font = "16px serif";
	ctx.fillText(score, 12,16)
}}