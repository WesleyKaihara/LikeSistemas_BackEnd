const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//criar instancia do express
const app = express();

//importação das rotas
const rotaSubCategorias = require('./routes/subCategorias');
const rotasProdutos = require('./routes/produtos');
const rotasOrcamentoProdutos = require('./routes/produtosOrcamento');
const rotasOrcamento = require('./routes/orcamento');

//No ambiente de desenvolvimento faz log dos eventos 
app.use(morgan('dev'));
//dados simples
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) //receber apenas corpos no formato json

//configurações de header /cabeçalho
app.use((req, res, next) => {
  res.header('Access-Control-Alow-Origin', '*');
  res.header('Acess-Control-Alow-Header',
    'Content-Type',
    'X-Requested-With',
    'Accept',
    'Authorization');

  //metodos aceitos 
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).send({})
  }
  next();
}

);

//Rotas
app.use('/subCategorias', rotaSubCategorias);
app.use('/produtos', rotasProdutos);
app.use('/orcamento', rotasOrcamento);

//tratamento de erro rotas
app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message
    }
  })
})


module.exports = app;