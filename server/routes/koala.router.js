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
koalaRouter.post('/',  (req, res) => {
    let newKoala = req.body;
    console.log(`Adding Koala`, newKoala);
  
    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready-to-transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding the Koala :`, error);
        res.sendStatus(500);
      });
  });
  


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
