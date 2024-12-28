var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
})

// mongodb+srv://iankit184:iRg84RYGePvAk3mr@sit725.6hnve.mongodb.net/?retryWrites=true&w=majority&appName=SIT725