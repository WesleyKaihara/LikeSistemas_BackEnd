//cria serviço http
const http = require('http');
const app = require('./app');
//porta existente ou 3000
const port = process.env.PORT || 5000;
const server = http.createServer(app);
//server rodando na porta - 5000
server.listen(port);