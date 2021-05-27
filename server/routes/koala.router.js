const express = require("express");
const koalaRouter = express.Router();

const pool = require("../module/pool");

// DB CONNECTION

// GET


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
    })
})

module.exports = koalaRouter;
