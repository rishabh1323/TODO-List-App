const express = require("express");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function(request, response){
    return response.render("index", {
        title: "TODO App"
    });

})

app.listen(port, function(error){
    if(error){
        console.log("Error in starting server !");
        return;
    }
    console.log("Server is up & running");
});