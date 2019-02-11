var user=document.getElementById("txt");
var pass=document.getElementById("pwd");
var btn = document.getElementById("btn");
var cont = document.getElementById("cont");
var save = document.getElementById("save");
//获取cookie 判断 
var str=document.cookie;
var arr=str.split("; ");
var newarr=arr.filter(item=>item.indexOf("username")!=-1);
// newarr []
if(newarr.length>0){
     var res = newarr[0].split("=")[1];
     user.value = res;
}
btn.onclick = function () {
    var ajax = new XMLHttpRequest;
    ajax.open("get", "get.php?user="+user.value+"&pas="+pass.value, true);// 用户名 密码 字段信息
    ajax.send(null);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log(ajax.responseText);
            var res = JSON.parse(ajax.responseText)
            if (res.code === 0) {
                // alert("用户名不存在");
                cont.style.display="block";
                cont.innerHTML="用户名不存在";
                cont.style.color="red";
            } else if (res.code === 1) {
                // alert("密码错误")
                cont.style.display = "block";
                cont.innerHTML = "密码错误";
                cont.style.color = "red";
            } else {
                cont.style.display = "block";
                cont.innerHTML = "成功";
                cont.style.color = "green";
                window.location.href="index.html"
                if(save.checked){
                    // 设置cookie
                    var d=new Date();
                    d.setDate(d.getDate()+7);
                    document.cookie="username="+user.value+";expires="+d.toGMTString();
                }
            }
        }
    }
}
