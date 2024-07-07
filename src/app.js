// console.log(`Jai Shree Ram`)
const express = require('express')
const app = express()
let port = 8000
require('./db/db.js')
const path = require("path")
const hbs = require("hbs")
const empCollection = require('./model/model')


const template_path = path.join(__dirname,'../template/views')
app.set("view engine","hbs")
app.set('views',template_path)

app.use(express.urlencoded({extended : false}))

// app.get('/', (req,res) =>{
//     res.send("Piyush")
// })
app.get('/',(req,res) =>{
    res.render('index')
})

app.post('/empdata', async (req,res) =>{
try{
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if(password===cpassword){
     const empData = new empCollection({
         name : req.body.name,
         email : req.body.email,
         phone : req.body.phone,
         password : req.body.password,
         cpassword: req.body.cpassword
 
     })
 
     const posData = await empData.save();
     res.send(postData)
 
    }else{
     res.send("Password are not Matching....")
    }
}catch(error){
    res.send(error)
}
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})