# TM_Candy_Shop

## Install Instructions
This project uses node, express, ejs6 standards, and sqllite to work.
The follwing install are necessary to perform.

1. npm init -y
This will create the package.json file
2. In the package.json file change the value in "type:" to "module".

3. npm install node
4. npm install express
5. npm install ejs
6. npm install sqlite sqlite3 body-parser

The package-lock.json file and the package.json file update accordingly during install.

When new developers pull from repo, thanks to the package-lock.json file, they simply need to run:

1. npm ci

and node will only install the packages from the package-lock.json file.

## Note
To ensure the node_modules folder is not uploaded to github a file called '.gitignore' in the root directory of TM_CANDY_SHOP. Inside the .gitignore file, add the text 'node_modules/'. This will allow you to keep node_modules locally while not pushing the update to github.

## Run the app
Access the terminal and navigate to the projects root folder and then in the terminal run:
1. node app.js
2. Open your browser and navigate to http://localhost:3000 to view the web page


## Design Strategy
This section will explain the projects design strategy in terms of (1) separation of converns, and (2) setting up the routes and linking the routes to our menu.

1. Separation of Concerns
app.js - 
database.js - 
public/ - 
    /css/
        style.css - 
    /data/
        data.js - 
    /database/
        candies.db - 
    /images/
        favicon & images - 
views/ - 
    /pages/
        about.ejs - 
        contact.ejs - 
        index.ejs -
    /partials/
        candymodal.ejs - 
        footer.ejs - 
        head.ejs - 
        menu.ejs - 



2. Routes & Linking
GET '/' -
GET '/about' - 
GET '/contact' - 

How menu is linked to the routes:
