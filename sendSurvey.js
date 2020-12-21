var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

router.get('/:fID',function(req,res){
    console.log('sendSurvey request recieved');
    var out={"success":"",
            "error":"",
            "data":""};
    MongoClient.connect('mongodb://localhost:27017/survey_project', function (err, client) {
        if (err) throw err;
        var db = client.db('survey_project');
        var query={"formID":req.params.fID};
        db.collection("surveys").find(query).project({"_id":0,"answers":0}).toArray(function(err,result){
            //console.log(result);
            if(err) {
                out.error=err;
                out.success=false;
                res.send(out);
            }
            if(result.length==0) {
                out.error="not found";
                out.success=false;
                res.send(out);
            }
            else{
                //console.log(result);
                out.success=true;
                out.data=result[0];
                res.send(out);
            }
            client.close();
        });
    });
})

//export this router to use in our app.js
module.exports = router;