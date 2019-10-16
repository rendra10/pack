var http = require('http');
var fs = require('fs');
var path = require('path');

/*function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

http.createServer(onRequest).listen(3000);*/
http.createServer(function(req, res){
    if(req.url === '/'){
        fs.readFile("./index.html", "UTF-8", function(err, data){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        });
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(cssPath);
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    }/*else if(req.url.match("\.jpg$")){
        var imgPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imgPath);
        res.writeHead(200, {"Content-Type": "text/jpg"});
        fileStream.pipe(res);
    }else if(req.url.match("\.png$")){
        var imgpPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imgpPath);
        res.writeHead(200, {"Content-Type": "text/png"});
        fileStream.pipe(res);
    }*/else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }
}).listen(8080);