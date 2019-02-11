//滚动搜索框
var search_scroll = document.getElementById("search_scroll");
window.onscroll = function () {
	var a = document.documentElement.scrollTop;
	if (a > 600) {
		search_scroll.style.top = "0px";
	} else {
		search_scroll.style.top = "-46px";
	}
}
//.jd_toolbar-------------------------------------------------------------------------------------------------------
$(".jd_toolbar i a").mouseover(function(){
	$(".jd_toolbar").css("z-index",11)
})

$(".jd_toolbar i a").mouseleave(function(){
	$(".jd_toolbar").css("z-index",0)
})

//jd_toolbar楼层滚动
var timerT = null;
var zhiding = document.getElementById("zhiding");
zhiding.onclick = function () {
	scrollMove(100);
	console.log(1);
}
function scrollMove(end1) {
	clearInterval(timer)
	// 上 下
	// 当前滚动轴所在的位置 ?? 到达位置
	if (document.documentElement.scrollTop > end1) {
		// 上
		timerT = setInterval(function () {
			document.documentElement.scrollTop -= 10;
			if (document.documentElement.scrollTop <= end1) {
				clearInterval(timerT);
				document.documentElement.scrollTop = end1;
			}
		})
	} else {
		// 下
		timerT = setInterval(function () {
			document.documentElement.scrollTop += 10;
			if (document.documentElement.scrollTop >= end1) {
				clearInterval(timerT);
				document.documentElement.scrollTop = end1;
			}
		})
	}
}
//.nav_dz点击变红
var nav_dz_a = document.getElementsByClassName("nav_dz_a");
for (var i = 0; i < nav_dz_a.length; i++) {
	nav_dz_a[i].onclick = function () {
		for (var k = 0; k < nav_dz_a.length; k++) {
			nav_dz_a[k].style.background = "none";
			nav_dz_a[k].style.color = "#666";
		}
		this.style.background = "#f10215";
		this.style.color = "#fff";
	}
}
//搜索框
var txt = document.getElementById("txt");
var search_box = document.getElementById("search_box");
var timerS = null;
txt.onkeyup = function () {
	search_box.style.display = "block";
	var search_ajax = new XMLHttpRequest;
	search_ajax.open("get", "search.php?cont=" + this.value, true);
	search_ajax.send(null);
	search_ajax.onreadystatechange = function () {
		if (search_ajax.readyState === 4 && search_ajax.status === 200) {
			var search_data = JSON.parse(search_ajax.responseText).suggestKeycords;
			console.log(search_data);
			var search_str = "";
			for (var search_i = 0; search_i < search_data.length; search_i++) {
				search_str += `<li><a target="_blank" href="https://search.jd.com/Search?keyword=${search_data[search_i]}&enc=utf-8">${search_data[search_i]}</a></li>`
			}
			search_box.innerHTML = search_str;
		}
	}
}
txt.onblur = function () {
	// 点击瞬间 blur-------------------------------------------------------------------------------------------------------------------------
	timerS = setTimeout(function () {
		search_box.style.display = "none";
	}, 300)
}
txt.onfocus = function () {
	clearInterval(timerS);
	search_box.style.display = "block";
}
search_box.onmouseleave = function () {
	search_box.style.display = "none";
}
//购物车-------------------------------------------------------------------------------------------------------------------------------
var gouwuche_a = document.getElementById("gouwuche_a");
var str = document.cookie;
gouwuche_a.onclick = function () {
	if (str != "") {
		window.location.href = "gouwuche.html";
	}
	else {
		window.location.href = "denglu.html";
	}
}
//选项卡-左-------------------------------------------------------------------------------------------------------------------------
$(".main_list li").mouseover(function () {
	$(this).css("background", "#E3E4E5").siblings(".main_list li").css("background", "none");
	$(".main_list span").eq($(this).index()).css("display", "block").siblings(".main_list span").css("display", "none");
})
$(".main_list li").mouseleave(function () {
	$(this).css("background", "none");
	$(".main_list span").eq($(this).index()).css("display", "none");
})


//banner--------------------------------------------------------------------------------------------------------------------------
var lis = document.querySelectorAll("#banner_ul li");
var ul = document.getElementById("banner_ul");
var pre = document.getElementById("la");
var next = document.getElementById("ra");
var pages = document.querySelectorAll("#page li");
var banner = document.getElementById("banner")
var banner_i = 0;
var timer = null;
autoPlay()
next.onclick = function () {
	banner_i++;
	if (banner_i >= 7) {
		banner_i = 0;
	}
	for (var banner_k = 0; banner_k < lis.length; banner_k++) {
		lis[banner_k].style.opacity = 0;
		// lis[k].style.zIndex = -1;
	}
	lis[banner_i].style.opacity = 1;
	// lis[i].style.zIndex = 1;
	// i 图片透明1  其他人0
	pageCss()
}
pre.onclick = function () {
	banner_i--;
	if (banner_i <= -1) {
		banner_i = 6;
	}
	for (var banner_k = 0; banner_k < lis.length; banner_k++) {
		lis[banner_k].style.opacity = 0;
	}
	lis[banner_i].style.opacity = 1;
	pageCss()
}
// 页码
for (let t = 0; t < pages.length; t++) {
	pages[t].index = t; // 为了存储 页码对应的索引
	pages[t].onmouseover = function () {

		banner_i = this.index;
		for (var banner_k = 0; banner_k < lis.length; banner_k++) {
			lis[banner_k].style.opacity = 0;
		}
		lis[banner_i].style.opacity = 1;
		pageCss()
		// 清除所有人的颜色  当前的页码变色 
	}
}
// 开启 停止
banner.onmouseover = function () {
	clearInterval(timer)
}
banner.onmouseout = function () {
	autoPlay()
}

// 定时器自动播放
function autoPlay() {
	clearInterval(timer)
	timer = setInterval(function () {
		banner_i++;
		if (banner_i >= 7) {
			banner_i = 0;
		}
		//  opacity 1 其他消失
		for (var banner_k = 0; banner_k < lis.length; banner_k++) {
			lis[banner_k].style.opacity = 0;
		}
		lis[banner_i].style.opacity = 1; // js直接赋值 瞬间实现
		pageCss()
	}, 4000)
}
// 页码颜色跟随
function pageCss() {
	for (var t = 0; t < pages.length; t++) {
		pages[t].style.background = "none";
	}
	pages[banner_i].style.background = "#fff";
}
//main_aside------------------------------------------------------------------------------------------------------------------------------------------
$("#huafei").mouseover(function () {
	$(".service_entry .service_entry1").animate({ top: "-130px" }, 10)
	$(".service_entry2").animate({ top: "0" }, 1000).css("display", "block")
})
$("#jipiao").mouseover(function () {
	$(".service_entry .service_entry1").animate({ top: "-130px" }, 10)
	$(".service_entry2").animate({ top: "0" }, 1000).css("display", "block")
	$(".jipiao").css("border-bottom-color", "#f10215");
	$(".huafei").css("border-bottom-color", "#fff");
	$(".jipiao_box").css("display", "block")
})
$("#jiudian").mouseover(function () {
	$(".service_entry .service_entry1").animate({ top: "-130px" }, 10)
	$(".service_entry2").animate({ top: "0" }, 1000).css("display", "block")
	$(".jiudian").css("border-bottom-color", "#f10215");
	$(".huafei").css("border-bottom-color", "#fff");
	$(".jiudian_box").css("display", "block")
})
$("#youxi").mouseover(function () {
	$(".service_entry .service_entry1").animate({ top: "-130px" }, 10)
	$(".service_entry2").animate({ top: "0" }, 1000).css("display", "block")
	$(".youxi").css("border-bottom-color", "#f10215");
	$(".huafei").css("border-bottom-color", "#fff");
	$(".youxi_box").css("display", "block")
})

$(".entry2_tit li").mouseover(function () {
	$(this.firstElementChild).css("border-bottom-color", "#f10215");
	$(this).siblings(".entry2_tit li").children().css("border-bottom-color", "#fff");
	$(".entry2_box").eq($(this).index()).css("display", "block").siblings(".entry2_box").css("display", "none")
})
$(".entry2_box span").mouseover(function () {
	$(this).css("color", "#E83632").siblings(".entry2_box span").css("color", "#000")
})

$(".huafei_box span").mouseover(function () {
	$(".huafei_box ul li").eq($(this).index()).css("display", "block").siblings(".huafei_box ul li").css("display", "none");
})


$(".jipiao_box").find("span:eq(0)").mouseover(function () {
	$(".jipiao_box ul").animate({ left: "0" }, 10)
})
$(".jipiao_box").find("span:eq(1)").mouseover(function () {
	$(".jipiao_box ul").animate({ left: "-150px" }, 10)
})
$(".jipiao_box").find("span:eq(2)").mouseover(function () {
	$(".jipiao_box ul").animate({ left: "-300px" }, 10)
})

$(".jiudian_box").find("span:eq(0)").mouseover(function () {
	$(".jiudian_box ul").animate({ left: "0" }, 10)
})
$(".jiudian_box").find("span:eq(1)").mouseover(function () {
	$(".jiudian_box ul").animate({ left: "-150px" }, 10)
})

$(".youxi_box").find("span:eq(0)").mouseover(function () {
	$(".youxi_box ul").animate({ left: "0" }, 10)
})
$(".youxi_box").find("span:eq(1)").mouseover(function () {
	$(".youxi_box ul").animate({ left: "-150px" }, 10)
})
$(".youxi_box").find("span:eq(2)").mouseover(function () {
	$(".youxi_box ul").animate({ left: "-300px" }, 10)
})

//话费充值
$(function () {
	var cz_str = document.getElementById("cz_str")
	$("#select_table").change(function () {
		var typeCodePre = $("#select_table").val();
		// console.log(typeCodePre)
		cz_str.innerHTML = typeCodePre;
	})
})

$(".close").click(function () {
	$(".service_entry2").css("display", "none");
	$(".service_entry .service_entry1").animate({ top: "0" }, 1)
})




















//商品列表倒计时------------------------------------------------------------------------------------------------------------------------
var ms_hours = document.getElementsByClassName("hours")
var ms_mins = document.getElementsByClassName("mins")
var ms_secs = document.getElementsByClassName("secs")
// 如何 在一个数字上 补零
function addZero(n) {
	return n < 10 ? "0" + n : n
}
countDown(2019, 6, 15);
setInterval(function () {
	countDown(2019, 6, 15);
}, 1000)
function countDown(a, b, c) {
	var d = new Date();
	var d1 = new Date(2019, 6, 15);
	var timeC = d1.getTime() - d.getTime();
	// timeC 是 d1 d 时间差 毫秒差  12 15  1天 14h 49fen
	timeC /= 1000; // 毫秒---> 秒
	var day = parseInt(timeC / 60 / 60 / 24);
	var hours = parseInt((timeC - day * 24 * 60 * 60) / 60 / 60);
	var mins = parseInt((timeC - day * 24 * 60 * 60 - hours * 60 * 60) / 60);
	var secs = parseInt(timeC - day * 24 * 60 * 60 - hours * 60 * 60 - mins * 60);
	ms_hours[0].innerHTML = `${addZero(day)}`;
	ms_mins[0].innerHTML = `${addZero(hours)}`;
	ms_secs[0].innerHTML = `${addZero(secs)}`
}

//秒杀中间轮播图--------------------------------------------------------------------------------------------------------
// 核心 改变ul的left  运动
var djms_con_list = document.getElementById("djms_con_list");
var ms_con_left = document.getElementById("ms_con_left");
var ms_con_right = document.getElementById("ms_con_right");
var ms_con_i = 0;
var timerMC = null;
// 左右按钮绑定事件
ms_con_right.onclick = function () {
	// 走下一张
	ms_con_i++;
	if (ms_con_i >= 4) {
		djms_con_list.style.left = "0px";
		ms_con_i = 1;
	}
	moveMC(djms_con_list, "left", -720 * ms_con_i);
}
ms_con_left.onclick = function () {
	ms_con_i--;
	if (ms_con_i <= -1) {
		// 最后一张
		djms_con_list.style.left = "-2160px";
		ms_con_i = 2;
	}
	moveMC(djms_con_list, "right", -720 * ms_con_i);
}
// 物体运动函数
function moveMC(ele, dir, end) {
	clearInterval(ele.timerMC)
	// 如果向左  如果向右
	if (dir === "left") {
		ele.timerMC = setInterval(function () {
			ele.style.left = ele.offsetLeft - 10 + "px";
			if (ele.offsetLeft <= end) {
				clearInterval(ele.timerMC);
				ele.style.left = end + "px";
			}
		})
	} else {
		ele.timerMC = setInterval(function () {
			ele.style.left = ele.offsetLeft + 10 + "px";
			if (ele.offsetLeft >= end) {
				clearInterval(ele.timerMC);
				ele.style.left = end + "px";
			}
		});
	}
}

//秒杀右侧轮播图------------------------------------------------------------------------------------------------------
// 核心 改变ul的left  运动
var djms_right_pic = document.getElementById("djms_right_pic");
var djms_page = document.querySelectorAll("#djms_page li a");
var djms_right_con = document.getElementById("djms_right_con");

// 隔3s ul运动一次  
var djms_right_i = 0;
var timerMR = null;
autoPlay_MR();
// 页码事件
for (var k = 0; k < djms_page.length; k++) {
	djms_page[k].index = k;
	djms_page[k].onmouseover = function () {
		// 向左向右?
		// 跳转页码 和 当前所在的页码
		if (this.index > djms_right_i) {
			move_MR(djms_right_pic, "left", -163 * this.index)
		} else {
			move_MR(djms_right_pic, "right", -163 * this.index)
		}
		djms_right_i = this.index;
		// 页码跟随变色
		// 清空所有页码的颜色  当前页码颜色高亮
		pageCss_MR()
	}
}
// 定时器停止和开启
djms_right_con.onmouseover = function () {
	clearInterval(timerMR)
}
djms_right_con.onmouseout = function () {
	autoPlay_MR()
}

// 开启定时器
function autoPlay_MR() {
	timerMR = setInterval(function () {
		djms_right_i++;
		if (djms_right_i >= 3) {
			djms_right_pic.style.left = "0px";// 让ul 回到初始位置
			djms_right_i = 1;                // 第一张 第二张
		}
		move_MR(djms_right_pic, "left", -163 * djms_right_i);
		pageCss_MR()
	}, 3000)
}


// 页码跟随变色 i   
function pageCss_MR() {
	for (var t = 0; t < djms_page.length; t++) {
		djms_page[t].style.background = "#C0C0C0";
		djms_page[t].style.borderColor = "#C0C0C0";
	}
	djms_page[djms_right_i === 2 ? 0 : djms_right_i].style.background = "#C81623";
	djms_page[djms_right_i === 2 ? 0 : djms_right_i].style.borderColor = "#C81623";
}

// 物体运动函数
function move_MR(ele, dir, end) {
	clearInterval(ele.timerMR)
	// 如果向左  如果向右
	if (dir === "left") {
		ele.timerMR = setInterval(function () {
			ele.style.left = ele.offsetLeft - 30 + "px";
			if (ele.offsetLeft <= end) {
				clearInterval(ele.timer);
				ele.style.left = end + "px";
			}
		})
	} else {
		ele.timerMR = setInterval(function () {
			ele.style.left = ele.offsetLeft + 30 + "px";
			if (ele.offsetLeft >= end) {
				clearInterval(ele.timerMR);
				ele.style.left = end + "px";
			}
		});
	}
}
//排行榜选项卡
$(".tab_head_item li").mouseover(function () {
	$(".tab_body_item").eq($(this).index()).css("display", "block").siblings(".tab_body_item").css("display", "none");
})
//排行榜轮播图
var tab_body_list = document.getElementById("tab_body_list");
var page_tab = document.querySelectorAll("#page_tab li");
var tab_body_item = document.getElementsByClassName("tab_body_item");

// 隔3s ul运动一次  
var tab_i = 0;
var timerphb = null;
autoPlay();
// 页码事件
for (var k = 0; k < page_tab.length; k++) {
	page_tab[k].index = k;
	page_tab[k].onmouseover = function () {
		// 向左向右?
		// 跳转页码 和 当前所在的页码
		if (this.index > tab_i) {
			movephb(tab_body_list, "left", -360 * this.index)
		} else {
			movephb(tab_body_list, "right", -360 * this.index)
		}
		tab_i = this.index;
		// 页码跟随变色
		// 清空所有页码的颜色  当前页码颜色高亮
		pageCssphb()
	}
}
// 页码跟随变色 i   
function pageCssphb() {
	for (var t = 0; t < page_tab.length; t++) {
		page_tab[t].style.background = "#fff";
		page_tab[t].style.borderColor = "#DADDD9";
	}
	page_tab[tab_i === 2 ? 0 : tab_i].style.background = "#f10215";
	page_tab[tab_i === 2 ? 0 : tab_i].style.borderColor = "#f10215";
}

// 物体运动函数
function movephb(ele, dir, end) {
	clearInterval(ele.timerphb)
	// 如果向左  如果向右
	if (dir === "left") {
		ele.timerphb = setInterval(function () {
			ele.style.left = ele.offsetLeft - 10 + "px";
			if (ele.offsetLeft <= end) {
				clearInterval(ele.timerphb);
				ele.style.left = end + "px";
			}
		})
	} else {
		ele.timerphb = setInterval(function () {
			ele.style.left = ele.offsetLeft + 10 + "px";
			if (ele.offsetLeft >= end) {
				clearInterval(ele.timerphb);
				ele.style.left = end + "px";
			}
		});
	}
}
//会买专辑轮播图
var hmzj_ul = document.getElementById("hmzj_ul");
var hmzj_left = document.getElementById("hmzj_left");
var hmzj_right = document.getElementById("hmzj_right");
var hmzj_page = document.querySelectorAll("#hmzj_page li");
var hmzj_body_item = document.getElementsByClassName("hmzj_body_item");

// 隔3s ul运动一次  
var hmzj_i = 0;
var timerHMZJ = null;
autoPlay_hmzj();
// 左右按钮绑定事件
hmzj_right.onclick = function () {
	// 走下一张
	hmzj_i++;
	if (hmzj_i >= 4) {
		hmzj_ul.style.left = "0px";
		hmzj_i = 1;
	}
	moveHMZJ(hmzj_ul, "left", -353 * hmzj_i);
	pageCss_hmzj()
}
hmzj_left.onclick = function () {
	hmzj_i--;
	if (hmzj_i <= -1) {
		// 最后一张
		hmzj_ul.style.left = "-1059px";
		hmzj_i = 2;
	}
	moveHMZJ(hmzj_ul, "right", -353 * hmzj_i);
	pageCss_hmzj()
}
// 页码事件
for (var k = 0; k < hmzj_page.length; k++) {
	hmzj_page[k].index = k;
	hmzj_page[k].onmouseover = function () {
		// 向左向右?
		// 跳转页码 和 当前所在的页码
		if (this.index > hmzj_i) {
			moveHMZJ(hmzj_ul, "left", -353 * this.index)
		} else {
			moveHMZJ(hmzj_ul, "right", -353 * this.index)
		}
		hmzj_i = this.index;
		// 页码跟随变色
		// 清空所有页码的颜色  当前页码颜色高亮
		pageCss_hmzj()
	}
}
// 定时器停止和开启
hmzj_body_item.onmouseover = function () {
	clearInterval(timerHMZJ)
}
hmzj_body_item.onmouseout = function () {
	autoPlay_hmzj()
}

// 开启定时器
function autoPlay_hmzj() {
	timerHMZJ = setInterval(function () {
		hmzj_i++;
		if (hmzj_i >= 4) {
			hmzj_ul.style.left = "0px";// 让ul 回到初始位置
			hmzj_i = 1;                // 第一张 第二张
		}
		moveHMZJ(hmzj_ul, "left", -353 * hmzj_i);
		pageCss_hmzj()
	}, 4000)
}


// 页码跟随变色 i   
function pageCss_hmzj() {
	for (var t = 0; t < hmzj_page.length; t++) {
		hmzj_page[t].style.background = "#fff";
		hmzj_page[t].style.borderColor = "#B7BCB8";
	}
	hmzj_page[hmzj_i === 3 ? 0 : hmzj_i].style.background = "#f10215";
	hmzj_page[hmzj_i === 3 ? 0 : hmzj_i].style.borderColor = "#f10215";
}

// 物体运动函数
function moveHMZJ(ele, dir, end) {
	clearInterval(ele.timerHMZJ)
	// 如果向左  如果向右
	if (dir === "left") {
		ele.timerHMZJ = setInterval(function () {
			ele.style.left = ele.offsetLeft - 10 + "px";
			if (ele.offsetLeft <= end) {
				clearInterval(ele.timerHMZJ);
				ele.style.left = end + "px";
			}
		})
	} else {
		ele.timerHMZJ = setInterval(function () {
			ele.style.left = ele.offsetLeft + 10 + "px";
			if (ele.offsetLeft >= end) {
				clearInterval(ele.timerHMZJ);
				ele.style.left = end + "px";
			}
		});
	}
}
//领券中心轮播图
var lqzx_ul = document.getElementById("lqzx_ul");
var lqzx_page = document.querySelectorAll("#lqzx_page li");
var lqzx_body_item = document.getElementById("lqzx_body_item");

// 隔3s ul运动一次  
var lqzx_i = 0;
var timerLQ = null;
autoPlay();
// 页码事件
for (var k = 0; k < lqzx_page.length; k++) {
	lqzx_page[k].index = k;
	lqzx_page[k].onmouseover = function () {
		// 向左向右?
		// 跳转页码 和 当前所在的页码
		if (this.index > lqzx_i) {
			moveLQ(lqzx_ul, "left", -335 * this.index)
		} else {
			moveLQ(lqzx_ul, "right", -335 * this.index)
		}
		lqzx_i = this.index;
		// 页码跟随变色
		// 清空所有页码的颜色  当前页码颜色高亮
		pageCss_lqzx()
	}
}

// 页码跟随变色 i   
function pageCss_lqzx() {
	for (var t = 0; t < lqzx_page.length; t++) {
		lqzx_page[t].style.background = "#fff";
		lqzx_page[t].style.borderColor = "#B7BCB8";
	}
	lqzx_page[lqzx_i === 2 ? 0 : lqzx_i].style.background = "#f10215";
	lqzx_page[lqzx_i === 2 ? 0 : lqzx_i].style.borderColor = "#f10215";
}

// 物体运动函数
function moveLQ(ele, dir, end) {
	clearInterval(ele.timerLQ)
	// 如果向左  如果向右
	if (dir === "left") {
		ele.timerLQ = setInterval(function () {
			ele.style.left = ele.offsetLeft - 10 + "px";
			if (ele.offsetLeft <= end) {
				clearInterval(ele.timerLQ);
				ele.style.left = end + "px";
			}
		})
	} else {
		ele.timerLQ = setInterval(function () {
			ele.style.left = ele.offsetLeft + 10 + "px";
			if (ele.offsetLeft >= end) {
				clearInterval(ele.timerLQ);
				ele.style.left = end + "px";
			}
		});
	}
}
//me轮播图
var me_ul = document.getElementById("me_ul");
var me_left = document.getElementById("me_left");
var me_right = document.getElementById("me_right");
var me_page = document.querySelectorAll("#me_page li");
var me_body_item = document.getElementById("me_body_item");

// 隔3s ul运动一次  
var me_i = 0;
var timerme = null;
autoPlay_me();
// 左右按钮绑定事件
me_right.onclick = function () {
	// 走下一张
	me_i++;
	if (me_i >= 4) {
		me_ul.style.left = "0px";
		me_i = 1;
	}
	moveme(me_ul, "left", -353 * me_i);
	pageCss_me()
}
me_left.onclick = function () {
	me_i--;
	if (me_i <= -1) {
		// 最后一张
		me_ul.style.left = "-1059px";
		me_i = 2;
	}
	moveme(me_ul, "right", -353 * me_i);
	pageCss_me()
}
// 页码事件
for (var k = 0; k < me_page.length; k++) {
	me_page[k].index = k;
	me_page[k].onmouseover = function () {
		// 向左向右?
		// 跳转页码 和 当前所在的页码
		if (this.index > me_i) {
			moveme(me_ul, "left", -353 * this.index)
		} else {
			moveme(me_ul, "right", -353 * this.index)
		}
		me_i = this.index;
		// 页码跟随变色
		// 清空所有页码的颜色  当前页码颜色高亮
		pageCss_me()
	}
}
// 定时器停止和开启
me_body_item.onmouseover = function () {
	clearInterval(timerme)
}
me_body_item.onmouseout = function () {
	autoPlay_me()
}

// 开启定时器
function autoPlay_me() {
	timerme = setInterval(function () {
		me_i++;
		if (me_i >= 4) {
			me_ul.style.left = "0px";// 让ul 回到初始位置
			me_i = 1;                // 第一张 第二张
		}
		moveme(me_ul, "left", -353 * me_i);
		pageCss_me()
	}, 4000)
}


// 页码跟随变色 i   
function pageCss_me() {
	for (var t = 0; t < me_page.length; t++) {
		me_page[t].style.background = "#fff";
		me_page[t].style.borderColor = "#B7BCB8";
	}
	me_page[me_i === 3 ? 0 : me_i].style.background = "#f10215";
	me_page[me_i === 3 ? 0 : me_i].style.borderColor = "#f10215";
}

// 物体运动函数
function moveme(ele, dir, end) {
	clearInterval(ele.timerme)
	// 如果向左  如果向右
	if (dir === "left") {
		ele.timerme = setInterval(function () {
			ele.style.left = ele.offsetLeft - 10 + "px";
			if (ele.offsetLeft <= end) {
				clearInterval(ele.timerme);
				ele.style.left = end + "px";
			}
		})
	} else {
		ele.timerme = setInterval(function () {
			ele.style.left = ele.offsetLeft + 10 + "px";
			if (ele.offsetLeft >= end) {
				clearInterval(ele.timerme);
				ele.style.left = end + "px";
			}
		});
	}
}
//特色推荐轮播图------------------------------------------------------------------------------------------------------------------------
var tstj_ul = document.getElementById("tstj_ul");
var tstj_left = document.getElementById("tstj_left");
var tstj_right = document.getElementById("tstj_right");
var tstj_page = document.querySelectorAll("#tstj_page li");
var tstj = document.getElementById("tstj");//box

// 隔3s ul运动一次  
var tstj_i = 0;
var timerTS = null;
autoPlay_TS();
// 左右按钮绑定事件
tstj_right.onclick = function () {
	// 走下一张
	tstj_i++;
	if (tstj_i >= 5) {
		tstj_ul.style.left = "0px";
		tstj_i = 1;
	}
	moveTS(tstj_ul, "left", -1080 * tstj_i);
	pageCss_TS()
}
tstj_left.onclick = function () {
	tstj_i--;
	if (tstj_i <= -1) {
		// 最后一张
		tstj_ul.style.left = "-4320px";
		tstj_i = 3;
	}
	moveTS(tstj_ul, "right", -1080 * tstj_i);
	pageCss_TS()
}
// 页码事件
for (var k = 0; k < tstj_page.length; k++) {
	tstj_page[k].index = k;
	tstj_page[k].onmouseover = function () {
		// 向左向右?
		// 跳转页码 和 当前所在的页码
		if (this.index > tstj_i) {
			moveTS(tstj_ul, "left", -1080 * this.index)
		} else {
			moveTS(tstj_ul, "right", -1080 * this.index)
		}
		tstj_i = this.index;
		pageCss_TS()
	}
}
// 定时器停止和开启
tstj.onmouseover = function () {
	clearInterval(timerTS)
}
tstj.onmouseout = function () {
	autoPlay_TS()
}

// 开启定时器
function autoPlay_TS() {
	timerTS = setInterval(function () {
		tstj_i++;
		if (tstj_i >= 5) {
			tstj_ul.style.left = "0px";// 让tstj_ul 回到初始位置
			tstj_i = 1;                // 第一张 第二张
		}
		moveTS(tstj_ul, "left", -1080 * tstj_i);
		pageCss_TS()
	}, 5000)
}


// 页码跟随变色 i   
function pageCss_TS() {
	for (var t = 0; t < tstj_page.length; t++) {
		tstj_page[t].style.background = "#fff";
		tstj_page[t].style.borderColor = "#B7BCB8";
	}
	tstj_page[tstj_i === 4 ? 0 : tstj_i].style.background = "#f10215"
	tstj_page[tstj_i === 4 ? 0 : tstj_i].style.borderColor = "#f10215"
}

// 物体运动函数
function moveTS(ele, dir, end) {
	clearInterval(ele.timerTS)
	// 如果向左  如果向右
	if (dir === "left") {
		ele.timerTS = setInterval(function () {
			ele.style.left = ele.offsetLeft - 10 + "px";
			if (ele.offsetLeft <= end) {
				clearInterval(ele.timerTS);
				ele.style.left = end + "px";
			}
		})
	} else {
		ele.timerTS = setInterval(function () {
			ele.style.left = ele.offsetLeft + 10 + "px";
			if (ele.offsetLeft >= end) {
				clearInterval(ele.timerTS);
				ele.style.left = end + "px";
			}
		});
	}
}
//秒杀商品列表--------------------------------------------------------------------------------------------------------------
var djms_con_list=document.getElementById("djms_con_list")
var ajax_ms = new XMLHttpRequest;
ajax_ms.open("get", "../php/djms_con_list.php", true);
ajax_ms.send(null);
ajax_ms.onreadystatechange = function () {
	if (ajax_ms.readyState === 4 && ajax_ms.status === 200) {
		// console.log(ajax_ms.responseText)
		var splb_ms_data = JSON.parse(ajax_ms.responseText);
		console.log(splb_ms_data);
		var splb_ms_str = "";
		for (var ms_i = 0; ms_i < splb_ms_data.length; ms_i++) {
			splb_ms_str += `<li>
							<a href=""><img src="${splb_ms_data[ms_i].imgurl}" alt="">
							<p>${splb_ms_data[ms_i].content}</p>
							<span>${splb_ms_data[ms_i].price1}</span>
							<span>${splb_ms_data[ms_i].price2}</span></a>
							</li>`
		}
		djms_con_list.innerHTML = splb_ms_str;
	}
}
//商品列表--------------------------------------------------------------------------------------------------------------------------
var splb_box = document.getElementById("splb_box");
var cont = document.getElementById("cont");
var splb_img = document.getElementById("splb_img");
var ajax_splb = new XMLHttpRequest;
ajax_splb.open("get", "splb.php", true);
ajax_splb.send(null);
ajax_splb.onreadystatechange = function () {
	if (ajax_splb.readyState === 4 && ajax_splb.status === 200) {
		var splb_data = JSON.parse(ajax_splb.responseText);
		// console.log(splb_data);
		var splb_str = "";
		for (var splb_i = 0; splb_i < splb_data.length; splb_i++) {
			if (splb_data[splb_i].content) {
				splb_str += `<li class="splb_li">
						<a href=""><img src="${splb_data[splb_i].imgurl}" alt=""></a>
						<p id="cont">${splb_data[splb_i].content}</p>
						<p><span>${splb_data[splb_i].price}</span></p>
						<a href="" class="zxs">找相似</a>
					</li>`
			} else {
				splb_str += `<li>
					<a href=""><img class="splb_img" src="${splb_data[splb_i].imgurl}" alt=""></a>
				</li>`
			}
		}
		splb_box.innerHTML = splb_str;
		//商品列表动画2
		var splb_li = document.getElementsByClassName("splb_li");
		var zxs = document.getElementsByClassName("zxs");
		for (let i = 0; i < splb_li.length; i++) {
			splb_li[i].onmouseover = function () {
				zxs[i].style.transform = "scale(1)";
			}
			splb_li[i].onmouseleave = function () {
				zxs[i].style.transform = "scale(0)";
			}
		}
	}
}
//商品列表动画3
// $(".splb_li").on("mouseover", function () {
// 	$(this.lastElementChild).stop().animate({transform="scale(1)},100);
// })





