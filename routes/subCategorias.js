const express = require('express');
const router = express.Router();

const mysql = require('../mysql').pool;

//retorno todas subCategorias
router.get("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM subCategoria',
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

//inserção de subCategoria
router.post('/', (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'INSERT INTO subCategoria (NOME) VALUES (?)',
      [req.body.nome],
      //callback da query
      (error, resultado, field) => {
        //liberar conexões
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          })
        }

        res.redirect(201, '/subcategorias');
      }
    );
  });
});

//retorna um produto
router.get("/:idSubCategoria", (req, res, next) => {

  //parametro da requisição com nome idSubCategoria
  const id = req.params.idSubCategoria;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'SELECT * FROM subCategoria WHERE ID = ?',
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


//altera uma subCategoria
router.patch("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'UPDATE subCategoria SET NOME = ? WHERE ID = ?',
      [req.body.nome, req.body.idSubCategoria],
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
          mensagem: 'subCategoria alterada com sucesso'
        });
      }
    );
  });
});

//deleta subCategoria
router.delete("/", (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      })
    }
    conn.query(
      'DELETE FROM subCategoria WHERE ID = ?',
      [req.body.idSubCategoria],
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
          mensagem: 'subCategoria deletada com sucesso'
        });
      }
    );
  });


});



module.exports = router;