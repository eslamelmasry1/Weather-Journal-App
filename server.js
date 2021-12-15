// Setup empty JS array to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//Including body-parser
const bodyParser = require('body-parser');
//Port to run the server on
const port = 3330;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// Spin up the server
const server = app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});

//GET route with a function to complete GET '/all'
app.get('/all', function(req, res) {
    res.send(projectData)
});

//The POST route Setup
//Create post() with a URL path and a callback function to fetch the data from the app endpoint.
app.post('/postData', postData)

//Call back function in which we add the data received from req.body
function postData(req, res) {
    //Object with the required data
    weatherData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };
    //Push allData object to projectData array as endpoint.
    projectData = weatherData;
    res.send(projectData);
    console.log(projectData);
}
