var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const cryptoRandomString = require('crypto-random-string');

var MongoClient = require('mongodb').MongoClient

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

router.post('/', function(req, res){
    console.log('createSurvey request recieved')
    var out={"success":"",
            "error":"",
            "data":""};
    MongoClient.connect('mongodb://localhost:27017/survey_project', function (err, client) {
        if (err) throw err;

        var db = client.db('survey_project');
        
        db.collection("surveys").find({}).project({"_id":0,"formID":1}).toArray(function(err,result){
            if(err) {
                out.error=err;
                out.success=false;
                res.send(out);
            }
            var uid="";
            //console.log(result);
            while(true){
                uid=cryptoRandomString({length: 7});
                var flag=true;
                result.forEach(element => { 
                    if(element.formID==uid) flag==false 
                }); 
                if(flag)    break;
            }
            req.body.formID=uid;
            db.collection("surveys").insertOne(req.body, function(err, result) {
                if(err) {
                    out.error=err;
                    out.success=false;
                    res.send(out);
                }
                else{
                    console.log("1 document inserted");
                    out.success=true;
                    out.data="http://localhost:4000/survey/"+req.body.formID+"/";
                    res.send(out);
                }
                client.close();
            });
        });
    });
});

//export this router to use in our index.js
module.exports = router;