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
// Removes a Koala from Database
koalaRouter.delete('/:id', (req, res) => {
    // Grab the item
    const koalaToDelete = req.params.id
    const queryText = `DELETE FROM "koalas" WHERE "koalas".id = $1;`;
    console.log('Koala to Delete', koalaToDelete)
    // send the text with koalaToDelete in an array
    pool.query(queryText, [koalaToDelete]).then(result => {
        console.log(`We Deleted koala with id ${koalaToDelete}`);
        // send OK message
        res.sendStatus(200)
    }).catch(error => {
        console.log(error);
        // Send back a 500 status error
        res.sendStatus(500)
    })
})

module.exports = koalaRouter;
