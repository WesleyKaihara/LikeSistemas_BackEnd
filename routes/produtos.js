const express = require('express');
const router = express.Router();

const mysql = require('../mysql').pool;

//retorno todos Produtos
router.get("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT produto.ID,produto.NOME,produto.VALOR,SUBCATEGORIA.NOME as SUBCATEGORIA FROM produto INNER JOIN subCategoria ON produto.SUBCATEGORIA = subcategoria.ID',
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

//inserção de produto
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

        res.redirect(201, 'back');
      }
    );
  });
});

//retorna um produto
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


//altera um produto
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

//deleta produto
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