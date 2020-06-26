const mongoose = require("mongoose"); // Importing mongoose to connect to MongoDB

mongoose.connect("mongodb://localhost/todo_list_db"); // Connecting to MongoDB databse via mongoose on localhost

const db = mongoose.connection; // Getting the connection object

db.on("error", console.error.bind(console, "Error connecting to database")); // Throwing error on console, if not connected to database

// Logging to console that connection to databse is successful
db.once("open", function(){
    console.log("Successfully connected to database");
});