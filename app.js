const express = require("express")

const mongoose = require("mongoose")

const path = require("path");

const app = express()

const fetch = require("node-fetch")
var cheerio = require("cheerio");

const port = 80

mongoose.connect('mongodb://localhost/petcare',{useNewUrlParser:true,useUnifiedTopology:true});

var user = new mongoose.Schema({

    fname: String,

    lname: String,

    email: String,

    Username: String,

    password: String

});

var user_model = mongoose.model('data',user);

var fs = require("fs");

app.use('/CSS',express.static('css'));
app.use(express.urlencoded({extended:true}));
app.use('/assets',express.static('assets'));
app.use(express.urlencoded({extended:   true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/1-index.html'));
});
app.get('/1-index',(req,res)=>{
    res.sendFile(path.join(__dirname,'/1-index.html'));
});
app.get('/2-sign_up',(req,res)=>{
    res.sendFile(path.join(__dirname,'/2-sign_up.html'));
});
app.get('/3-login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/3-login.html'));
});
app.get('/4-add_pet',(req,res)=>{
    res.sendFile(path.join(__dirname,'/4-add_pet.html'));
});
app.get('/5-Dog',(req,res)=>{
    res.sendFile(path.join(__dirname,'/5-Dog.html'));
});
app.get('/6-cat',(req,res)=>{
    res.sendFile(path.join(__dirname,'/6-cat.html'));
});
app.get('/7-detail',(req,res)=>{
    res.sendFile(path.join(__dirname,'/7-detail.html'));
});
app.get('/8-dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname,'/8-dashboard.html'));
});


// fetching data from user and saving it to db

app.post('/2-sign_up',(req,res)=>{
    var myData = new user_model(req.body);
    myData.save().then(()=>{
        setTimeout(function (){
            res.writeHead(301,{Location : "http://127.0.0.1/8-dashboard"});
            res.end();
        },1000);
    });
});

app.post('/3-login',(req,res)=>{
    var username_string= req.body.username;
    var password_string = req.body.password;
    user_model.find({Username:username_string, password:password_string},function(err,data){
        if(err){
            console.log(err);
            return;
        } 
        if(data.length==0){
            res.writeHead(301,{Location : "http://127.0.0.1/3-login"});
            res.end();
            return;
        }
        
        setTimeout(function (){
            res.writeHead(301,{Location : "http://127.0.0.1"});
            res.end();
        },1000);

        return;
    })
})

// const gethtml = async (url,link,file) => {

//      const response = await fetch(link);
    
//      const body = await response.text();
    
//      const $ = cheerio.load(body);
    
//      $("a").each(function () {
    
//      var id = $(this).attr("id");
    
//      if (id == "change_anchor") {
    
//      $(this).attr("href", url);
    
//      }
    
//      fs.writeFile(file, $.html(), (err) => {
    
//      if (err) console.log(err);
    
//      // console.log("Successfully Written to File.");
    
//      });
    
//      });
    
//      return body;
    
//     };

// server

app.listen(port);

console.log('Server started at http://127.0.0.1:' + port);