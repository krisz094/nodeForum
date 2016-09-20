﻿/*var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;*/

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var url = 'mongodb://localhost:27017/beta10';
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var pug = require('pug');


var compiledFunction = pug.compileFile('template.pug');

var Schema = mongoose.Schema;
var threadSchema = new Schema({
	comments: [{
		date: {type: Date, default: Date.now},
		name: String,
		body: String,
		imagePath: String
	}]
},
{
    timestamps: true
});

var Thread = mongoose.model('Thread', threadSchema);

mongoose.connect(url);
var db = mongoose.connection;
var app = express();

app.locals.moment=require('moment');
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get('/',function(req,res){
    /*Thread.find(function(err,sendThreads){
        res.render('index',{ title:'nodeForum' , threads: sendThreads});
    });*/

    Thread.
        find().
        limit(10).
        sort({ updatedAt: -1 }).
        exec(function(err,sendThreads){
            res.render('index',{ title:'nodeForum' , threads: sendThreads});
    });

});

app.get('/page/:pageNum',function(req,res){
    res.send("WIP!");
});


app.get('/threads/:id',function(req,res){
    Thread.findById(req.params.id,function(err,foundThread){
        if (err) console.log(err);
        res.render('thread',{title:'nodeForum',threadId: req.params.id, thread: foundThread});
    });
    
});

app.post('/post/comment/:id', function (req, res) {
    console.log(req.params.id);
    Thread.findByIdAndUpdate(
        req.params.id,
        {$push: {"comments": {name: req.body.name, body: req.body.comment, imagePath: "null"}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
    res.redirect("/threads/" + req.params.id);
});

app.post('/post/thread/', function (req, res) {
    var commentName = req.body.name;
    var commentText = req.body.comment;
    var newThread = new Thread({ comments: {name: commentName, imagePath: "null", body: commentText}});
    newThread.save(function(err){
        if (err) console.log(err);
    });
    //console.log(res);
    res.redirect("/");
    
});

db.once('open', function () {
    console.log("mongoose connected to mongodb");
});
app.listen(process.env.PORT, function () {
    console.log("webserver running.");
});
