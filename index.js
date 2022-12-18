const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient
app.set('view engine','ejs');

var db;
MongoClient.connect("mongodb+srv://changhyun:ssa1379@cluster0.b3ibfbb.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
  db = client.db('nodejs');

  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})

app.get('/',function(req, res){
    res.sendFile(__dirname +'/index.html')
})
app.get('/home', function(req, res) { 
    res.sendFile(__dirname +'/home.html')
})
app.get('/lesson', function(req, res) { 
    res.sendFile(__dirname +'/lesson.html')
})
app.get('/health', function(req, res) { 
    res.sendFile(__dirname +'/health.html')
})    
app.get('/health2', function(req, res) { 
    res.sendFile(__dirname +'/health2.html')
})    
app.get('/health3', function(req, res) { 
    res.sendFile(__dirname +'/health3.html')
})    
app.get('/hallym', function(req, res) { 
    res.sendFile(__dirname +'/hallym.html')
})   
app.get('/swim', function(req, res) { 
    res.sendFile(__dirname +'/swim.html')
})  
app.get('/swim2', function(req, res) { 
    res.sendFile(__dirname +'/swim2.html')
})  
app.get('/bowling', function(req, res) { 
    res.sendFile(__dirname +'/bowling.html')
})
app.get('/bowling2', function(req, res) { 
    res.sendFile(__dirname +'/bowling2.html')
})
app.get('/skate', function(req, res) { 
    res.sendFile(__dirname +'/skate.html')
})
app.get('/soccer', function(req, res) { 
    res.sendFile(__dirname +'/soccer.html')
})
app.get('/soccer2', function(req, res) { 
    res.sendFile(__dirname +'/soccer2.html')
})
app.get('/tennis', function(req, res) { 
    res.sendFile(__dirname +'/tennis.html')
})
app.get('/tennis2', function(req, res) { 
    res.sendFile(__dirname +'/tennis2.html')
})
app.get('/sportsclub', function(req, res) { 
    res.sendFile(__dirname +'/sportsclub.html')
})
app.get('/review', function(req, res) { 
    res.sendFile(__dirname +'/review.html')
})
app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/write.html')
})
app.get('/list', function(req, res) {
    db.collection('login').find().toArray(function(err, result){
      console.log(result);
      res.render('list.ejs', {loginfo : result})
      })
    })
app.post('/add', function(req, res){
    db.collection('config').findOne({name : 'totalcount'}, function(err, result){
    var mycount = result.count;
    db.collection('login').insertOne( { _id : (mycount + 1), email : req.body.email, subject : req.body.subject, review : req.body.review} , function(){
        db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
        if (err) return console.log(err)
        console.log('save complete')
        res.send('리뷰가 달렸습니다.');
        
        });  
    });
    });

});