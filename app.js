var express = require('Express');
var app = express();

var createSurvey = require('./createSurvey.js');
var sendSurvey = require('./sendSurvey.js');
var mySurveys = require('./mySurveys.js');
var answerSurvey = require('./answerSurvey.js');

//both index.js and things.js should be in same directory
app.use('/createSurvey', createSurvey);

app.use('/survey',sendSurvey);

app.use('/mySurveys',mySurveys);

app.use('/answerSurvey',answerSurvey);

app.listen(4000);
console.log("Listening on port 4000");