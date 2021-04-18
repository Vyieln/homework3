// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');
// required module to make calls to a REST API
const axios = require('axios');
app.use(bodyParser.urlencoded());
// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.post('/selection', function(req,res){
    var d = req.body.lans
    console.log(d)
       /*
    res.render('pages/select.ejs', {lang: req.body})
    
    res.render('pages/select.ejs');
    axios.get(`https://cwrvx8v6xj.execute-api.us-east-2.amazonaws.com/default/apitest`)
    .then((response) => {
        var data = response.data;
        for (var i = 0; i<=3; i++){
            if (data[i].name == lang){
                res.render('pages/select.ejs', {lang: data[i]});
            }
    
        } 
    
    })
    */
   
});

app.post('/process_form', function(req, res){
    // create a variable to hold the username parsed from the request body
    var lang = req.body.lang
    // create a variable to hold ....

    // print variable username to console
    console.log(lang);
    axios.get(`https://cwrvx8v6xj.execute-api.us-east-2.amazonaws.com/default/apitest`)
    .then((response) => {
        var data = response.data;
        for (var i = 0; i<=4; i++){
            if (data[i].name == lang){
                console.log(data[i])
                res.render('pages/select.ejs',
                {
                    select: data[i].name, 
                    createdDate: data[i].createdAt,
                    createdBy: data[i].createdBy,
                    market: data[i].marketSharePercent,
                    disc: data[i].typingDisciplines
                });
            }
    
        } 
    
    })
  
  });

const port = 3000
app.listen(port, () => {
    console.log(`Front-end app listening at http://localhost:${port}`)
})
