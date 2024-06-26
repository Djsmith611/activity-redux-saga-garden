const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "plants";
  `;
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error in GET /api/plants', err);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  const queryText = `
    SELECT * FROM "plants"
      WHERE id=$1;
  `;
  pool.query(queryText, [req.params.id])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error in GET /api/plants/:id', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log("in POST");
  const newPlant = req.body;
  const queryText = `
    INSERT INTO "plants"
      ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7);
  `;
  const queryValues = [
    newPlant.name,
    newPlant.kingdom,
    newPlant.clade,
    newPlant.order,
    newPlant.family,
    newPlant.subfamily,
    newPlant.genus,
  ];
  pool.query(queryText, queryValues)
    .then((result) => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error in POST /api/plants', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const updatedPlant = req.body;

  const queryText = `
    UPDATE "plants"
      SET 
        "name"=$1, 
        "kingdom"=$2, 
        "clade"=$3, 
        "order"=$4, 
        "family"=$5, 
        "subfamily"=$6, 
        "genus"=$7
      WHERE
        id=$8;
  `;

  const queryValues = [
    updatedPlant.name,
    updatedPlant.kingdom,
    updatedPlant.clade,
    updatedPlant.order,
    updatedPlant.family,
    updatedPlant.subfamily,
    updatedPlant.genus,
    updatedPlant.id,
  ];

  pool.query(queryText, queryValues)
    .then((result) => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in PUT /api/plants/:id', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const queryText = `
    DELETE FROM "plants" 
      WHERE id=$1
  `;
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in DELETE /api/plants/:id', err);
      res.sendStatus(500);
    });
});

module.exports = router;
