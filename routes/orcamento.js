const express = require('express');
const router = express.Router();

const mysql = require('../mysql').pool;

//retorno todos orcamentos
router.get("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM orcamento',
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

//inserção de orcamento
router.post('/', (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'INSERT INTO orcamento (NOME_CLIENTE,DATA_CRIACAO) VALUES (?,?)',
      [req.body.nomeCliente, new Date()],
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
          mensagem: 'Orcamento criado com sucesso'
        })
      }
    );
  });
});

//retorna um orcamento
router.get("/:idOrcamento", (req, res, next) => {

  //parametro da requisição com nome idOrcamento
  const id = req.params.idOrcamento;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM orcamento WHERE ID = ?',
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


//altera um orcamento
router.patch("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'UPDATE orcamento SET NOME_CLIENTE = ?  WHERE ID = ?',
      [req.body.nomeCliente, req.body.idOrcamento],
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
          mensagem: 'Orcamento alterado com sucesso'
        });
      }
    );
  });


});

//deleta orcamento
router.delete("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'DELETE FROM orcamento WHERE ID = ?',
      [req.body.idOrcamento],
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
          mensagem: 'Orcamento deletado com sucesso'
        });
      }
    );
  });


});


module.exports = router;