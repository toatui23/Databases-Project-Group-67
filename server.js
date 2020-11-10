var http = require('http');
var fs = require('fs');
var url = require('url');

const m = new Map();

function renderFile(path, res){
	fs.readFile(path, function(error, data){
		if(error){
			res.writeHead(404);
			res.write('File not found');
		}
		else{
			res.writeHead(200);

			if(m.has(path)){
				data = m.get(path);
				res.write(data);
			}
			else{
				res.write(data);
				m.set(path, data);
				console.log('data read');
			}
		}
		res.end();
	});
}

function requestHandler(req, res){
//	console.log("<> Request aqquired");
//	console.log("<><> req.method", req.method);
//	console.log("<><> req.url:", req.url);
//	console.log("<><> req.headers", req.headers);

	var path = req.url;

	switch(path){
		case '/user':
			renderFile('./public/user.html', res);
      break;
		case '/logs':
			renderFile('./public/logs.html', res);
      break;
    case '/workouts':
      renderFile('./public/workouts.html', res);
			break;
    case '/create':
      renderFile('./public/create.html', res);
      break;
		case '/plans_lifts':
	    renderFile('./public/plans_lifts.html', res);
	    break;
		case '/lifts_muscles':
			renderFile('./public/lifts_muscles.html', res);
			break;
		case '/index.js':
			renderFile('./public/index.js', res);
			break;
		case '/style.css':
			renderFile('./public/style.css', res);
			break;
		case '/404.html':
			renderFile('./public/404.html', res);
			break;
		case '/':
			renderFile('./public/logs.html', res);
			break;
		default:
			fs.readFile('./public/404.html', function(error, data){
				res.writeHead(404);
				res.write(data);
				res.end();
			});
  }
}

var server = http.createServer(requestHandler);
var port = process.env.PORT || 8611;
server.listen(port);
