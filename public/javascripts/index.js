$(function(){
    //全部查找
    $("#allStu").click(function(){
        $.get("/users/list",(result)=>{
            let trAll = ""
            for(var i=0,l=result.length;i<l;i++){
                trAll += "<tr><td class='hide'>"+result[i]._id+"</td><td>"+result[i].stu_name+"</td><td>"+result[i].stu_age+"</td><td>"+result[i].stu_sex+"</td><td>"+result[i].stu_class+"</td><td><input type='checkbox'></td></tr>"
                $(".stu_info tbody").html(trAll)
            }

            //删除数据
            $("#del").click(function(){
                let stu_id = $(":checked").parent().siblings(".hide").text()
                console.info(stu_id,"shuju")
                $.post("/users/delete",{stu_id:stu_id},function(sendInfo){
                    if(sendInfo[0] == true){
                        layer.msg("删除成功")
                        let trAll = ""
                        for(var i=0,l=sendInfo[1].length;i<l;i++){
                            trAll += "<tr><td class='hide'>"+sendInfo[1][i]._id+"</td><td>"+sendInfo[1][i].stu_name+"</td><td>"+sendInfo[1][i].stu_age+"</td><td>"+sendInfo[1][i].stu_sex+"</td><td>"+sendInfo[1][i].stu_class+"</td><td><input type='checkbox'></td></tr>"
                            $(".stu_info tbody").html(trAll)
                        }
                    }else{
                        layer.msg("删除失败")
                    }
                })
            })
        })  
    })

    //增加数据
    $("#addStu").click(()=>{
        $(".stu_info tbody").prepend(`<tr><td><input type="text" name="" id="stu_name"></td><td><input type="text" name="" id="stu_age"></td><td><input type="text" name="" id="stu_sex"></td><td><input type="text" name="" id="stu_class"></td><td><button id="addFinish">完成</button></td></tr>`)
        $("#stu_name").focus()
        $("#addFinish").click(()=>{
            let stu_name = $("#stu_name").val(),
                stu_age = $("#stu_age").val(),
                stu_sex = $("#stu_sex").val(),
                stu_class = $("#stu_class").val()
            if(stu_name == "" | stu_age == "" | stu_sex == "" | stu_class == ""){
                layer.msg("数据不能为空")
            }else{
                layer.msg("添加成功")
            }
            let stu_info = {stu_name:stu_name,stu_age:stu_age,stu_sex:stu_sex,stu_class:stu_class}
            $.get("/users/add",stu_info,(result)=>{
                let trAll = ""
                for(var i=0,l=result.length;i<l;i++){		
                    trAll += "<tr><td class='hide'>"+result[i]._id+"</td><td>"+result[i].stu_name+"</td><td>"+result[i].stu_age+"</td><td>"+result[i].stu_sex+"</td><td>"+result[i].stu_class+"</td><td><input type='checkbox'></td></tr>"
                    $(".stu_info tbody").html(trAll)
                }
            })
            $("#stu_name").val("")
            $("#stu_age").val("")
            $("#stu_sex").val("")
            $("#stu_class").val("")
        })
    })

})