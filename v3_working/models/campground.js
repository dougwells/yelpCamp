var mongoose = require('mongoose');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
        {
            type: mongoose.Schema.Types.ObjectId, //"references" comments into campground
            ref: "Comment"
    }
    ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;