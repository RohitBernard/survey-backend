var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true })); 

router.post('/',function(req,res){
    console.log('answerSurvey request recieved');
    var out={"success":"",
            "error":"",
            "data":""};
    MongoClient.connect('mongodb://localhost:27017/survey_project', function (err, client) {
        if (err) throw err;
        var db = client.db('survey_project');
        var query={"formID":req.body.formID};
        /*
        db.collection("surveys").find(query).project({"_id":0}).toArray(function(err,result){
            //console.log(result);
            if(err) {
                out.error=err;
                out.success=false;
                res.send(out);
            }
            */
        var answers=req.body.answers;
        var newvalues={$push: {answers: answers}};
        db.collection("surveys").updateOne(query, newvalues, function(err, result) {
            if(err) {
                out.error=err;
                out.success=false;
                res.send(out);
            }
            else{
                console.log("1 document updated");
                out.success=true;
                out.data="1 document updated";
                res.send(out);
            }
            client.close();
        });
        
    });
})

//export this router to use in our app.js
module.exports = router;