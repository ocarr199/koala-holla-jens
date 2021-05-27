const express = require("express");
const koalaRouter = express.Router();

const pool = require("../module/pool");

// DB CONNECTION

// GET
koalaRouter.get('/', (req, res) => {
    // variable to hold sql command
    let queryText = 'SELECT * FROM "koalas" ORDER BY "id";';
    
    pool.query(queryText)
    // make that promise
    .then( result => {
        // send the results in an object
        res.send(result.rows);
    })
    .catch( error => {
        console.log('Error getting Koalas!', error);
        // send back a 500 error
        res.sendStatus(500);
    });
});

// POST

// PUT

// DELETE

module.exports = koalaRouter;
