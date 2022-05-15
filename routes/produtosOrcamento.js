const express = require('express');
const router = express.Router();

const mysql = require('../mysql').pool;

//retorno todos Orçamentos de Produtos
router.get("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM produtosOrcamento',
      //callback da query
      (error, resultado, field) => {
        //liberar conexões
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(200).send({
          response: resultado
        });
      }
    );
  });


});

//inserção de Orçamentos de Produtos
router.post('/', (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'INSERT INTO produto (NOME,VALOR,SUBCATEGORIA) VALUES (?,?,?)',
      [req.body.nome, req.body.valor, req.body.idSubCategoria],
      //callback da query
      (error, resultado, field) => {
        //liberar conexões
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          })
        }

        res.status(201).send({
          mensagem: 'Produto criado com sucesso',
          ID: resultado.insertId,
        })
      }
    );
  });
});

//retorna um Orçamento de Produto
router.get("/:idProduto", (req, res, next) => {

  //parametro da requisição com nome idProduto
  const id = req.params.idProduto;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM produto WHERE ID = ?',
      [id],
      //callback da query
      (error, resultado, field) => {
        //liberar conexões
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(202).send({
          response: resultado
        });
      }
    );
  });

});


//altera um Orçamento de Produto
router.patch("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'UPDATE produto SET NOME = ? ,VALOR = ? , SUBCATEGORIA = ? WHERE ID = ?',
      [req.body.nome, req.body.valor, req.body.subcategoria, req.body.idProduto],
      //callback da query
      (error, resultado, field) => {
        //liberar conexões
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(202).send({
          mensagem: 'produto alterado com sucesso'
        });
      }
    );
  });


});

//deleta Orçamento de Produto
router.delete("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'DELETE FROM produto WHERE ID = ?',
      [req.body.idProduto],
      //callback da query
      (error, resultado, field) => {
        //liberar conexões
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(202).send({
          mensagem: 'produto deletado com sucesso'
        });
      }
    );
  });


});


module.exports = router;