var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    url: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {name: "Granite Hill", 
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
        
    },function(err,campground){
        if(err){
            console.log("Error: ", err);
        }else{
            console.log(campground);
        }
    });

var allCampgrounds = Campground.find({}, function(err, allCampgrounds){
    if(err){console.log(err);
    }else{
        console.log(allCampgrounds);
    }
});
    
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds:allCampgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});