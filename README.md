Summative for Full Stack web Development

Team Members:
Tooshar 
Brian

Group Project: TableMate - A Restaurant reservation system

How to run:

Start Database Server

If database does not already exist, create it by quering database.sql
For our case, we are using MySQL database from XAMPP 
Note that the sql has example data which can be removed

Add databse connection to .env in this format : {
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=tablemate_db
    DB_PORT=3306
}

Go to Backend and start Backend server with command:
node app.js

Go to FrontEnd and start FrontEnd server with command:
npm run dev

Open URL provided in the command line in the browser which should be:
http://localhost:5173/

Use the website

Documentation (using swagger):
When the both servers are running, navigate to 
http://localhost:5000/api-docs/
