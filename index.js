const http = require('http');
const { insertar, consultar, editar, eliminar } = require('./consultas');
const fs = require('fs');
const url = require('url');

http.createServer(async (req, res) => {
	//INDEX
	if (req.url == '/' && req.method === 'GET') {
		res.setHeader('content-type', 'text/html');
		const html = fs.readFileSync('index.html', 'utf8');
		res.end(html);
	}
	// POST
	if (req.url == '/cancion' && req.method == 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk;
		});
		req.on('end', async () => {
			const datos = Object.values(JSON.parse(body));
			const respuesta = await insertar(datos);
			res.statusCode = 201;
			res.end(JSON.stringify(respuesta));
		});
	}
	//GET
	if (req.url == '/canciones' && req.method === 'GET') {
		const registros = await consultar();
		res.statusCode = 200;
		res.end(JSON.stringify(registros));
	}
	//PUT
	if (req.url == '/cancion' && req.method == 'PUT') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk;
		});
		console.log(body);
		req.on('end', async () => {
			const datos = Object.values(JSON.parse(body));
			await editar(datos);
			res.statusCode = 200;
			res.end('Recurso editado con éxito!');
		});
	}
	//DELETE
	if (req.url.startsWith('/cancion?') && req.method == 'DELETE') {
		const { id } = url.parse(req.url, true).query;
		await eliminar(id);
		res.statusCode = 200;
		res.end('Registro eliminado con éxito!');
	}
}).listen(3000);
