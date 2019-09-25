

var fs = require("fs");
var http = require("http");
var url = require("url");
var ejs = require('ejs');

var content = fs.readFileSync('game.html', 'utf-8');
var compiled = ejs.compile(content);

http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");


    response.writeHead(200);

    if(pathname == "/") {
    	
        fs.readFile('highscore.txt','utf8', function(err, data) {
        	if (err) throw err;
        	console.log('2');

        	var scores = data.split(',');
        	var first = scores[0].split(' ');
        	var Name1 = first[0];
    		var Score1 = first[1];
    		var Seed1 = first[2];
    		var second = scores[1].split(' ');
        	var Name2 = second[0];
    		var Score2 = second[1];
    		var Seed2 = second[2];
    		var third = scores[2].split(' ');
        	var Name3 = third[0];
    		var Score3 = third[1];
    		var Seed3 = third[2];


    	
    	
    	response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(compiled({Name1: Name1, Score1: Score1, Seed1:Seed1, Name2: Name2, 
			Score2: Score2, Seed2:Seed2,Name3: Name3, Score3: Score3, Seed3:Seed3}));
		response.end();
		});}
    
        
    else if (pathname == "/game.js") {
        script = fs.readFileSync("game.js", "utf8");
        response.write(script);
        response.end();
    }
    else if (pathname == "/score") {
    	var q = url.parse(request.url,true);
    	var userscore = q.query;
    	highscore(userscore);

    }


    
}).listen(8080);

console.log("Listening to server on 8080...");

function highscore(userscore) {
	console.log('highscores');
	var highscores = '';
	var user = userscore.name + ' ' + userscore.score+ ' ' + userscore.seed;
	fs.readFile('highscore.txt','utf8', function(err, data) {
		var scores = data.split(",");
		
		for (var i = 0; i <= 2; i++) {
		 
			j = scores[i].split(" ");
			k = user.split(' ');
			console.log(j[1],k[1]);
			console.log(parseInt(j[1]),parseInt(k[1]))
			if (parseInt(j[1]) < parseInt(k[1]))
			{
				highscores += user + ',';
				console.log('win');
				user = scores[i];
			}
			else if (i < 2){
				highscores += scores[i] + ',';
				
			}else{highscores += scores[i]}
		}
		fs.writeFile('highscore.txt', highscores,  (error) => { });

	})
}
    
  
