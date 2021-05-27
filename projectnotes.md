- Database
    [ ] koala_inventory
        - table name
            [ ] koalas
            - table rows names and data type
                [ ] name - varchar(80)
                [ ] gender - varchar(1)
                [ ] age - INT
                [ ] ready-to-transfer - boolean
                [ ] notes varchar(100)

CREATE DATABASE.sql file

- Client side
    -CRUD Create Read Update Put/ POST GET PUT DELETE
    [ ] POST
        - send info to server for storage
    [ ] GET
        - Render to DOM logic
    [ ] PUT - One base, ready-to-transfer
    [ ] DELETE - Stretch goal


- Server side
    [ ] make module folder
    
            [ ] config pool.js
                [ ] Layout of pool.js

                    const pg = require('pg')

                    const pool = new pg.Pool(config);

                    config = {
                            database: 'koala_inventory', 
                            host: 'localhost', 
                            port: 5432
                            }

                    pool.on("connect", () => {
                    console.log("connected to postgres");
                    });

                    pool.on("error", (err) => {
                    console.log("error connecting to postgres", err);
                    });

                    module.exports = pool;
    - Routes
        - koala.router.js file
            - [ ] "Import" const pool = require("../modules/pool")
