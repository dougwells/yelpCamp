var express = require("express");
var app = express();
var campgrounds =[{name:"Yosemite", image:"https://farm8.staticflickr.com/7530/15570594753_49fe0b95da.jpg"}, {name:"Zions", image:"https://farm7.staticflickr.com/6014/6193268729_7d1deddba3.jpg"}, {name:"Yellowstone", image:"https://farm5.staticflickr.com/4141/4814814652_a6c1c9cbfe.jpg"}];

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});

})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Full Speed Ahead!!!");
})