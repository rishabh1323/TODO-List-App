const express = require("express"); // Importing the express package
const port = 8000; // Setting up our port as 8000

const db = require("./config/mongoose"); // Importing the mongoose configuration to use MongoDB
const TODOList = require("./models/todo_list"); // Importing the schema / MongoDB model

const app = express(); // Setting up our app to run server, use middlewares, etc

app.set("view engine", "ejs"); // Setting view engoine as ejs
app.set("views", "./views"); // Setting views to render on broswer 

app.use(express.urlencoded()); // Using urlencoded() to read data from url that is in JSON
app.use(express.static("assets")); // Setting static as assets folder

// Controller for GET request on home page
app.get("/", function(request, response){
    // Finding all the items in the database to display
    TODOList.find({}, function(error, todoList){
        // Logging error on console, if any
        if(error){
            console.log("Error in fetching items from database");
            return;
        }
        // Rendering the home page
        return response.render("index", {
            title: "TODO List | App", // Title passed on to the view
            todo_list: todoList // Present list passed on to view to be displayed
        });
    });
});

// Controller for POST request to create a new item and add to databse
app.post("/new-item", function(request, response){
    // Creating a new item in the databse as received from the request.body
    TODOList.create(request.body, function(error, newItem){
        // Logging error on console, if any
        if(error){
            console.log("Error in creating a new item", error);
            return;
        }
        // Redirecting back to the home page
        return response.redirect("/");
    });
});

// Controller for POST request to delete the selected items from the database
app.post("/delete-items", function(request, response){
    // Redirect back to home page and do nothing if no item(s) is/are selected
    if(request.body.checked == undefined){
        return response.redirect("/");
    }
    // Deleting an item if only a single item is selected to be deleted
    if(typeof(request.body.checked) == "string"){
        let id = request.body.checked; // id received here is a string and not an array - hence can't be traversed as need
        // Finding the item by id and deleting from the databse
        TODOList.findByIdAndDelete(id, function(error){
            // Logging error on console, if any
            if(error){
                console.log("Error in deleting item with id: ", id);
                return;
            }
        });
        // Redirecting back to home page after deleting the item and showing the updated list
        return response.redirect("/");
    }
    // Deleting items if more than one items are selected
    else{
        let selectedIDs = request.body.checked; // selectedIDs is an array containing ids of selected items
        for(let i = 0; i < selectedIDs.length; i++){ 
            let id = selectedIDs[i];
            // Finding the item by id and deleting from the databse
            TODOList.findByIdAndDelete(id, function(error){ // TODOList.deleteMany() wasn't working as expected :(
                // Logging error on console, if any
                if(error){
                    console.log("Error in deleting item");
                    return;
                }
            });
        }
        // Redirecting back to the home page after deleting the items and showing the updated list
        return response.redirect("/");
    }
});

// Listening to the server on its respective port
app.listen(port, function(error){
    // Logging error on console, if any
    if(error){
        console.log("Error in starting server !");
        return;
    }
    // Logging server creation success
    console.log("Server is up & running");
});