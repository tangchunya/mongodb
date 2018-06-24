var express = require('express');
var router = express.Router();
const mongo = require("mongodb").MongoClient
const mongoose = require('mongoose');  
let url = "mongodb://localhost:27017/studentDB"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/users/add', function(req, res, next) {
  let studentInfo = req.query
  console.log(studentInfo)
  studentInfo.stu_age = Number(studentInfo.stu_age)
  mongo.connect(url,(err,db)=>{
    if(err){
      res.json({
        code:500,
        msg:err
      })
    }
    let dataBase = db.db("studentDB")
    dataBase.collection("student").insertOne(studentInfo,(err,res)=>{
        if (err){
          throw {code:500,msg:err}
        }
        console.log("插入文档成功！")
        db.close()
    })
    dataBase.collection("student"). find({}).toArray(function(err,result){
      if (err) throw err
      res.send(result)
      db.close()
    })
    db.close()
  })
})

router.get("/users/list",function(req,res,next){
  mongo.connect(url,(err,db)=>{
    if(err) throw err
    let dataBase = db.db("studentDB")
    dataBase.collection("student"). find({}).toArray(function(err,result){
      if (err) throw err
      res.send(result)
      db.close()
    })   
    db.close()
  })
})

router.post("/users/delete",function(req,res,next){
  let stu_id = req.body
      stu_id = mongoose.Types.ObjectId(stu_id.stu_id)
  console.info("id",stu_id)
  mongo.connect(url,(err,db)=>{
    if(err) throw err
    let dataBase = db.db("studentDB")
    dataBase.collection("student"). deleteOne({_id:stu_id},function(err,result){
      if (err) throw err
      db.close()
    })
    dataBase.collection("student"). find({}).toArray(function(err,result){
      if (err) throw err
      let data = true,
          sendInfo = [data,result]
      res.send(sendInfo)
      db.close()
    })
    db.close()
  })
})


module.exports = router;
