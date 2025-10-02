import { setupDatabase, setupTable, getDbConnection } from './database.js';

import express from 'express';      // Bring in express, import (ES6)
const app = express();              // Create an instance of Express
const port = 3000;                  // Use port 3000

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the current directory
app.use(express.static(__dirname + "/public")); // make the public folder the default one

//Set the view engine with app.set,
// Express loads the modue internally and stores it in app reference
app.set('view engine', 'ejs');  //

// expose current request path to all views so the nav can mark the active link
// used in menu.ejs to highlight active link
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});


// Set the landing page route
// Send the index.ejs file in the pages folder, to client
// File will have an extension of .ejs, Embedded JavaScript
app.get('/', (req, res) => {
    setupDatabase().then(() => {    // Ensure database (table) is created before querying
        getDbConnection()
            .then((db) => { // Query database for all candies and return as object 'candies'
                return db.all('SELECT * FROM candies');
            })
            .then((candies) => {   // access returned object 'candies' and verify it's not an empty list
                if (!candies || candies.length === 0) {
                    return setupTable().then(() => { // If 'candies' is empty, then populate table with data
                        return getDbConnection()
                        .then((db) => { // create new connection and access database to query table
                            return db.all('SELECT * FROM candies'); // query table and return results
                        });
                    })
                    .then((newcandies) => {    // access new object 'newcandies', not the empty object 'candies', and render page
                        res.render("pages/index", {
                            data: newcandies,
                            title: "Candy Store"
                        });
                    });
                }
                else {  // if 'candies' is not empty, render the page using 'candies'
                    res.render("pages/index", {
                        data: candies,
                        title: "Candy Store"
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: "About the Sweet Treats" });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { title: "Contact Sweet Treats" });
});

// Listen for requests
app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});