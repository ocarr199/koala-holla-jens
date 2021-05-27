const express = require("express");
const koalaRouter = express.Router();

const pool = require("../module/pool");

// DB CONNECTION

// GET


// POST

// PUT
koalaRouter.put('/:id', (req, res) =>{
    const koalaTransferUpdate = req.params.id;
    console.log('book updated to read', koalaTransferUpdate);
    // make queryString target ready-to-transfer column and make boolean true
    const queryString = `UPDATE "koalas" SET "ready-to-transfer"=NOT "ready-to-transfer" WHERE "koalas".id = $1;`; 

    pool.query(queryString, [koalaTransferUpdate])
    .then( response => {
        console.log(response);
        console.log(`we updated koala transfer with id ${koalaTransferUpdate}`);
        res.sendStatus(200); // confirms on client side that info updated
    }).catch((err) => {
        console.log('error in server', err);
        res.sendStatus(500); // shows error on this server route
    })

})
// DELETE

module.exports = koalaRouter;
