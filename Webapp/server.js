const express = require("express");
const multer = require("multer");
const fs = require('fs');
const spawn = require('child_process').spawn;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/')
    },
    filename: function (req, file, cb) {
      cb(null, "user_input." + file.mimetype.split("/")[1])
    }
  })
const upload = multer({ storage: storage });

const app = express();
app.use(express.static('src'));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post("/upload_files", upload.single("files"), uploadFiles);
app.get("/recieveData",giveData)



var path = ""
var data = {}

function giveData(req,res){
  getdata(path).then((d)=>{
    d["data"]["path"] = data.file.filename
    d["body"] = data.body
    console.log(d)
    res.json(d);
})  
}

function uploadFiles(req, res) {
    data = req
    path = req.file.destination + req.file.filename 
    res.json({"status":"ok"})
}

function getdata(path){
    let return_promise = new Promise((resolve,reject)=>{
        let data = {}
        call_model(path,data,resolve,reject)
    })
    return return_promise
}

function call_model(x,datagot,res,rej){
    var py = spawn('python', ['model.py'])
    
    py.stdout.on('data', function(data){
      datagot['data'] = JSON.parse(data.toString('utf8'));
      res(datagot)
    });
  
    // py.stdout.on('end', function(){
    //   console.log('ended:',datagot);
    // });
  
    py.stderr.on("data", function(data) {
      console.log("stderr------",data.toString('utf8'));
      rej()
    });
  
    py.stdin.write(JSON.stringify(x));//sends to python file
    py.stdin.end();
}

app.listen(3000, () => {
    console.log(`Server started...`);
});