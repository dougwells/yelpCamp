var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//middleware
var middlewareObj = require('../middleware/index.js');
var isLoggedIn = middlewareObj.isLoggedIn;
var checkCommentOwnership = middlewareObj.checkCommentOwnership;

//Comments New
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments Create
router.post("/",isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

//Comments - edit

router.get('/:comment_id/edit', checkCommentOwnership, function(req, res){
    Comment.findOne({_id: req.params.comment_id}, function(err, comment){
        if(err){
            console.log(err);
        }else{
            Campground.findOne({_id: req.params.id}, function(err, campground){
                if (err){
                    console.log(err);
                }else{
                    res.render('../views/comments/edit', {comment:comment, campground: campground});
                }
            });
        }
    });
});

//Update Comments

router.put('/:comment_id', checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, {new: true}, function(err, comment){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

//Destroy Comment

router.delete('/:comment_id', checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});


module.exports = router;