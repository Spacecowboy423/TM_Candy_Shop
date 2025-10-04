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

and `node` will only install the packages from the package-lock.json file.

## Note
To ensure the node_modules folder is not uploaded to github a file called `.gitignore` in the root directory of TM_CANDY_SHOP. Inside the .gitignore file, add the text `node_modules/`. This will allow you to keep node_modules locally while not pushing the update to github.

## Run the app
Access the terminal and navigate to the projects root folder and then in the terminal run:
1. node app.js
2. Open your browser and navigate to http://localhost:3000 to view the web page


## Design Strategy
This section will explain the projects design strategy in terms of (1) separation of converns, and (2) setting up the routes and linking the routes to our menu.

1. Separation of Concerns
- app.js - setup Express, server, middleware, route definitions, and ensure database is configured upon start (no duplicates)
- database.js - database creation, seeding, and helper function to initialize database.

- public/ - contains the static assets, standards templates follow this structure to access assets
-     /css/
        style.css - contains the reusable styling across web suite
-     /data/
        data.js - contains the array of data used in web suite, accessed when database is empty at start or no database file exists
-     /database/
        candies.db - contains the database accessed by sqlite3 which is used to populate index.ejs with data
-     /images/
        favicon & images - contains the physical images access across the web suite, favicon for browser and the remaining are for the products

- views/ - templates used for web suite. Pages contains the web pages and Partials contains the reusable components used across the web suite.
-     /pages/
        about.ejs - contains the content/structure for the `About Us` page
        contact.ejs - contains the content/structure for the `Contact Us` page
        index.ejs - contains the content/structure for the main page
-     /partials/
        candymodal.ejs - modal fragment presenting more information on any selected product from user.
        footer.ejs - contains the content for the footer
        head.ejs - contains the content for the header
        menu.ejs - contains the content for the menu



2. Routes & Linking
- GET `/` - renders the main page and calls the database if needed. Passes the array and `title` to `index.ejs`
- GET `/about` - renders the about.ejs page with the `title`
- GET `/contact` - renders the contact.ejs with the `title`

How menu is linked to the routes:
- The navigation markup lives in `menu.ejs`. The menu contains anchor links that match the route paths to the designated page.
- Each page template includes the `menu.ejs` partial to ensure every page renders the same navigation markup, keeping the links consistent across routes and pages.
- When a user clicks a menu item, the browser requests the route from `Express` and `app.js` handles it. The page is then rendered by the corresponding view. The `title` passed to the view can be used to show the active page in the menu.


## Data Transmission Between UI and Backend
- Data is passed from backend to frontend server-side: no SPA or API calls.
- Backend queries SQLite for candy data, then passes an array to EJS as data.
- In the EJS template, this data array is iterated to render the cards and modal structures.
- Data such as candy name, price, flavor, image and description populates the UI elements statically.
- The modal triggers are linked dynamically using unique indexes for correct maping.


## How Promises Are Used to Coordinate Database Access
- Database interactions are Promises to handle asynchronous file IO cleanly.
- setupDatbase() creates the SQLite table and returns a Promise resolving the DB instance.
+ Upon GET `/`, the server chains promises:
    1. Ensure DB and table exist.
    2. Query candies from DB `db.all() returns Promise`.
    3. If DB is empty, insert default candies `setupTable()` using insert promises.
    4. Query candies again after insertion.
    5. Render the page after the data is fetched.
- Promises guarantee sequential execution: ensuring no rendering happens before database is ready.
- Errors caught via `.catch()` help debug DB or server issues.


## How Data is Received from the Database and Displayed
- SQL query returns an array of candy objects.
- This array is passed to EJS template as data.
- The `index.ejs` loops over the candy array with `<% data.forEach(...) %>`.
- Each object’s properties ( `name`, `price`, `image`, etc. ) fill the templates places.
- Cards and modals are generated dynamically for each candy.
- Buttons trigger modals with the candy’s specific information.
- Bootstrap and custom CSS styles ensure a responsive and interactive UI.
- Detailed candy info appears in modals on demand without page reload.
