const express = require("express");
const port = 8000;

const db = require("./config/mongoose");
const TODOList = require("./models/todo_list");
// const selectedList = require("./assets/js/delete_items");
// const selectedList = require("./views/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function(request, response){
    TODOList.find({}, function(error, todoList){
        if(error){
            console.log("Error in fetching items from database");
            return;
        }
        return response.render("index", {
            title: "TODO List | App",
            todo_list: todoList
        });
    });
});

app.post("/new-item", function(request, response){
    TODOList.create(request.body, function(error, newItem){
        if(error){
            console.log("Error in creating a new item", error);
            return;
        }
        return response.redirect("back");
    });
});

app.post("/select-list", function(request, response){
    let id = request.query.id;
    TODOList.findByIdAndUpdate(id, {is_selected: !this.is_selected}, function(error, item){
        if(error){
            console.log("Error in marking the list item");
            return;
        }
        return response.redirect("back");
    });
});

app.post("/delete-items", function(request, response){
    TODOList.deleteMany({is_selected : true}, function(error, result){
        if(error){
            console.log("Error in deleting items");
            return;
        }
    });
    return response.redirect("/");
});

app.listen(port, function(error){
    if(error){
        console.log("Error in starting server !");
        return;
    }
    console.log("Server is up & running");
});