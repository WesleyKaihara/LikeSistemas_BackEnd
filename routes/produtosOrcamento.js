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
      'INSERT INTO produtosOrcamento (PRODUTO,ORCAMENTO,QUANTIDADE) VALUES (?,?,?)',
      [req.body.produto, req.body.cliente, req.body.quantidade],
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
          mensagem: 'Orçamento criado com sucesso',
          ID: resultado.insertId
        })
      }
    );
  });
});

//retorna um Orçamento de Produto
router.get("/:PRODUTO", (req, res, next) => {

  //parametro da requisição com nome idProduto
  const id = req.params.PRODUTO;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM produto WHERE PRODUTO = ?',
      [PRODUTO],
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
      'UPDATE produtosOrcamento SET PRODUTO = ? ,ORCAMENTO = ? , QUANTIDADE = ? WHERE PRODUTO = ?',
      [req.body.produto, req.body.orcamento, req.body.quantidade, req.body.IDorcamento],
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
          mensagem: 'Orçamento modificado com sucesso'
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
      'DELETE FROM produtosOrcamento WHERE PRODUTO = ?',
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


router.post('/teste', (req, res, next) => {

  res.send(req.body)
  // mysql.getConnection((error, conn) => {
  //   if (error) {
  //     return res.status(500).send({
  //       error: error
  //     })
  //   }
  //   conn.query(
  //     `${req.body.mensagem}`,
  //     //callback da query
  //     (error, resultado, field) => {
  //       //liberar conexões
  //       conn.release();

  //       if (error) {
  //         return res.status(500).send({
  //           error: error
  //         })
  //       }

  //       res.status(201).send({
  //         mensagem: 'Orçamento criada com sucesso'
  //       })
  //     }
  //   );
  // });

});


module.exports = router;