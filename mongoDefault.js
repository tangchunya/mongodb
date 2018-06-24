const mongo = require("mongodb").MongoClient
const mongoose = require("mongoose")
let url = "mongodb://localhost:27017/studentDB"

mongo.connect(url,(err,db)=>{
    if(err) throw err
    console.log("创建数据库!")
    let dataBase = db.db("studentDB")
    dataBase.createCollection("student",(err,res)=>{
        if (err) throw err
        console.log("创建集合!")
        db.close()
    })
    // let stu_default = [
    //     {stu_name:"张三",stu_age:17,stu_sex:"女",stu_class:"G_005"},
    //     {stu_name:"王盼盼",stu_age:18,stu_sex:"女",stu_class:"G_002"},
    //     {stu_name:"李四",stu_age:17,stu_sex:"男",stu_class:"G_001"},
    //     {stu_name:"赛秋思",stu_age:20,stu_sex:"女",stu_class:"G_003"},
    //     {stu_name:"你猜呢",stu_age:16,stu_sex:"男",stu_class:"G_001"},
    //     {stu_name:"难起",stu_age:18,stu_sex:"女",stu_class:"G_004"},
    //     {stu_name:"什么",stu_age:14,stu_sex:"男",stu_class:"G_006"},
    //     {stu_name:"名字",stu_age:19,stu_sex:"女",stu_class:"G_001"},
    //     {stu_name:"我也不",stu_age:17,stu_sex:"男",stu_class:"G_004"},
    //     {stu_name:"知道了",stu_age:16,stu_sex:"女",stu_class:"G_002"},
    //     {stu_name:"那就",stu_age:20,stu_sex:"女",stu_class:"G_004"},
    //     {stu_name:"随便",stu_age:21,stu_sex:"男",stu_class:"G_003"},
    //     {stu_name:"写吧",stu_age:15,stu_sex:"男",stu_class:"G_005"},
    //     {stu_name:"张三",stu_age:15,stu_sex:"女",stu_class:"G_004"},
    //     {stu_name:"就写俩",stu_age:19,stu_sex:"男",stu_class:"G_006"},
    //     {stu_name:"还有啥",stu_age:17,stu_sex:"女",stu_class:"G_001"},
    //     {stu_name:"唐春娅",stu_age:14,stu_sex:"女",stu_class:"G_005"},
    //     {stu_name:"忘了",stu_age:15,stu_sex:"女",stu_class:"G_002"},
    //     {stu_name:"我自己",stu_age:18,stu_sex:"男",stu_class:"G_003"},
    //     {stu_name:"终于",stu_age:20,stu_sex:"女",stu_class:"G_004"}
    // ]
    // dataBase.collection("student").insertMany(stu_default,(err,res)=>{
    //     if (err) throw err
    //     console.log("插入文档成功！")
    //     db.close()
    // })
    let stu_id = mongoose.Types.ObjectId("5b2c850fea8d001558d4eea6")
    dataBase.collection("student"). find({_id:stu_id}).toArray(function(err,result){
        if (err) throw err
        console.info(result,'集合中所有数据')
        db.close()
    })
    db.close()
})