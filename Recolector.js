
var http = require('http'),
    url = require('url');

var procesarRegistrar = function(request, response, urlParseada) {
	if (request.method == 'GET') {
		response.writeHead(200, { 
			'Content-Type' : 'text/html'
		});			
		response.write('<p>Instancia ' + 
					   urlParseada.query.instancia + 
					   ' registrada</p>');
	} else {
		response.writeHead(405);
	}
	response.end();
}	
	
var procesarEstadistica = function(request, response) {
	if (request.method == 'POST') {
		var datos = '';
		var contador = 0;
		
		request.on('data', function(nuevosDatos) {
			datos = datos + nuevosDatos.toString();
			contador = contador+1;
		});
		request.on('end', function() {
			// !!!
			response.writeHead(200);
			console.log('****************************');
			console.log(datos);
			console.log(contador);
			console.log('****************************');
			response.end();
		});
	} else {
		response.writeHead(405);
		response.end();
	}
}
	
var procesador = function(request, response) {
	var urlParseada = url.parse(request.url, true);
	
	if (urlParseada.pathname == '/registrar') {
		procesarRegistrar(request, response, urlParseada);
	} else if (urlParseada.pathname = '/estadistica') {
		procesarEstadistica(request, response);
	} else {
		response.writeHead(404);
		response.end();
	}
}

var server = http.createServer(procesador);
server.listen(80);


