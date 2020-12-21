var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true })); 

router.post('/', function(req, res){
    console.log('surveyResults request recieved');
    var out={"success":"",
            "error":"",
            "data":""};
    var email=req.body.email;
    var formID=req.body.formID;
    MongoClient.connect('mongodb://localhost:27017/survey_project', function (err, client) {
        if (err) throw err;
        var db = client.db('survey_project');
        db.collection("surveys").find({"email":email,"formID":formID}).project({"_id":0}).toArray(function(err,result){
            if(err) {
                out.error=err;
                out.success=false;
                res.send(out);
            }
            else{
                out.success=true;
                out.data=result;
                res.send(out);
            }
            client.close();
        });
    });
});

//export this router to use in our app.js
module.exports = router;