// Import sqlite/sqlite3 components to create/open database
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Create database at start and make accessible in public/database
export const setupDatabase = () => {
    return open({
        filename: './public/database/candies.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.exec(`
            CREATE TABLE IF NOT EXISTS candies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                price REAL,
                description TEXT,
                flavor TEXT,
                inStock BOOLEAN,
				image TEXT
            )
        `)
        .then(() => db)
        .then(() => {
            console.log('Table created successfully.');
        })
        .catch((error) => {
            console.error('Error creating table:', error);
        });
    });
};


// Insert data into the table after it's creation
export const setupTable = () => {
    return open({
        filename: './public/database/candies.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.run(`
            INSERT INTO candies (name, price, description, flavor, inStock, image)
            VALUES
                ('Cotton Candy Dream', 3.99, 'Fluffy clouds of pink and blue sweetness that melt in your mouth', 'Strawberry & Blue Raspberry', 1, 'CC_Dream.jpg'),
                ('Bubble Gum Blast', 2.49, 'Classic chewy bubble gum balls in assorted fruity flavors', 'Mixed Berry', 1, 'Berry_Blast.jpeg'),
                ('Rainbow Lollipop', 1.99, 'Swirled rainbow colors on a stick, perfect for any sweet tooth', 'Cherry & Lime', 1, 'Rainbow_Lolli.jpg'),
                ('Sour Gummy Bears', 4.49, 'Tangy gummy bears coated in sour sugar crystals', 'Citrus Mix', 1, 'Sour_Bears.jpg'),
                ('Chocolate Fudge Bites', 5.99, 'Rich, creamy chocolate fudge pieces that melt in your mouth', 'Dark Chocolate', 1, 'Fudge_Bites.jpg'),
                ('Strawberry Taffy', 3.49, 'Soft and chewy taffy bursting with strawberry flavor', 'Strawberry', 1, 'Strawberry_Taffy.jpg'),
        `)
        .then(() => {
            console.log('Data inserted into Table successfully.');
        })
        .catch((error) => {
            console.error('Error inserting data into table:', error);
        });
    });
};


// Connect to database after creation in public/database
export const getDbConnection = () => {
    return open({
        filename: './public/database/candies.db',
        driver: sqlite3.Database
    });
};