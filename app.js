// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API using axios
const axios = require('axios');
app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// Home page of the website, will render the index page which is the home page
app.get('/', function(req, res) {
    res.render('pages/index');
});


// the data from the selected language will be inserted into this endpoint using post
app.post('/process_form', function(req, res){

    // created a variable to hold the selected input
    var lang = req.body.lang

    // print variable username to console
    console.log(lang);

    // using axios we get the data from the API that was provided
    // will be using the GET method 
    axios.get(`https://cwrvx8v6xj.execute-api.us-east-2.amazonaws.com/default/apitest`)
    .then((response) => {
        // the data from the api is put into the variable 'data'
        var data = response.data;
        // i created a for loop in order to check the every language in the api data
        // to see if it matches the input selected from the user
        // so it if does match then it loads the data for the language into the select page
        for (var i = 0; i<=4; i++){
            if (data[i].name == lang){
                // console log to check if it is working and which one is selected
                console.log(data[i])
                // rendering the select page with the data from the api
                res.render('pages/select.ejs',
                {
                    //  from the api we take the name, date created, 
                    // who created, market share, and the typing disciplines
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
// port that we are using
const port = 3000
// connection to the port
app.listen(port, () => {
    // dislays that we establish conneciton to the port
    console.log(`Front-end app listening at http://localhost:${port}`)
})
