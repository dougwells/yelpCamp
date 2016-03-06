var express = require("express");
var app = express();
var sites =["Yosemite", "Zions", "Yellowstone"];

app.set('view engine', 'ejs');

app.get("/", function(req, res){
   res.render("home"); 
    console.log("Developers ... YelpCamp is hiring.  Contact us today!");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {sites:sites});

})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Full Speed Ahead!!!");
})