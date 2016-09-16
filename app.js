/*var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;*/

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var url = 'mongodb://localhost:27017/beta6';
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
});

//faszság
var CommentSchema = new Schema({
	name: String,
	text: String,
    date: String
});

var Comment = mongoose.model('Comment', CommentSchema);

var Thread = mongoose.model('Thread', threadSchema);

mongoose.connect(url);
var db = mongoose.connection;
var app = express();

app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));


app.get('/',function(req,res){
    res.render('index', {title: 'nodeForum', name: 'lol', comment: 'lel'});
});

//ez faszság!!
app.get('/api/comments', function (req, res) {
    Comment.find(function (err, comments) {
        res.send(comments);
    });
});
//majd ez kell helyette
app.get('/threads/:threadId',function(req,res){

});

app.get('/api/threads',function(req,res){
    Thread.find(function(err,threads){
        res.send(threads);
    });
});

//régi
app.post('/post/comment', function (req, res) {
    var d = new Date();
    var dateTime = addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":"  + addZero(d.getSeconds());
    var commentName = req.body.name;
    var commentText = req.body.comment;
    var newComment = new Comment({ name: commentName, text: commentText, date: dateTime });
    newComment.save(function (err) {
        if (err) console.log(err);
        //else console.log("new comment: " + commentText);
    });
    // console.log(res);
    res.redirect("/")
    
});

app.post('/threads/:threadId', function (req, res) {
    var d = new Date();
    var dateTime = addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":"  + addZero(d.getSeconds());
    var commentName = req.body.name;
    var commentText = req.body.comment;
    var newComment = new Comment({ name: commentName, text: commentText, date: dateTime });
    newComment.save(function (err) {
        if (err) console.log(err);
        //else console.log("new comment: " + commentText);
    });
    //console.log(res);
    res.redirect("/")
    
});


app.post('/post/thread', function(req, res){

});

db.once('open', function () {
    console.log("mongoose connected to mongodb");
});
app.listen(3000, function () {
    console.log("webserver running.");
});
