# TM_Candy_Shop

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

When new developers pull from repo, thanks to the package-lock.json file, they simply need to run

1. npm ci

and node will only install the packages from the package-lock.json file.

To ensure the node_modules folder is not uploaded to github a file called '.gitignore' in the root directory of TM_CANDY_SHOP. Inside the .gitignore file, add the text 'node_modules/'. This will allow you to keep node_modules locally while not pushing the update to github.


Colors:
blue: #bef3fc
creme: #FDF8E7
light creme: #fffdf7