var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require('./models/user'),
    seedDB          = require("./seeds");
    
var commentRoutes       = require('./routes/comments.js');
var campgroundRoutes    = require('./routes/campgrounds.js');
var indexRoutes         = require('./routes/index.js');
    
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "Crystal is something",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(commentRoutes);
app.use(indexRoutes);  
app.use(campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});