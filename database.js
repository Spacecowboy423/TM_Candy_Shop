import pkg from 'sqlite3';
const sqlite3 = pkg;
import { open } from 'sqlite';

import candies from './public/data/data.js';

//function to create/open database and create table if it doesn't exist
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
		`).then(() => db);
	});
};

//helper function to loop incert candies recursively with promises
function insertCandiesSequentially(db, candies, index = 0) {
    if (index >= candies.length) {
        return Promise.resolve();
    }

    const candy = candies[index];

    return db.run(
        `INSERT INTO candies (name, price, description, flavor, inStock, image)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [candy.name, candy.price, candy.description, candy.flavor, candy.inStock, candy.image]
    ).then(() => insertCandiesSequentially(db, candies, index + 1));
}

export const setupTable = () => {
    return open({
        filename: './public/database/candies.db',
        driver: sqlite3.Database
    }).then(db => {
        return insertCandiesSequentially(db, candies).then(() => {
            console.log('All candies inserted successfully.');
            return db;
        });
    }).catch(error => {
        console.error('Error inserting candies:', error);
    });
};

export const getDbConnection = () => {
    return open({
        filename: './public/database/candies.db',
        driver: sqlite3.Database
    });
};