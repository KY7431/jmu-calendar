$(document).ready(function(){
	var html = ''
		html += '<tr align="center"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
		html += '<tr align="center"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
		html += '<tr align="center"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
		html += '<tr align="center"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
		html += '<tr align="center"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
		html += '<tr align="center"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
	$(".time>tbody").append(html);
	var mp = $(".time>tbody").find("tr");
	//日历页面的显示
	function xl(y,m){
		if ( y == year && m == month ){
			var x1 = Math.floor(day+6-week/7)+1;                 //这边不可以直接用day/7+1计算
			var x2 = week +1;
			mp.eq(x1).find("td").eq(x2).addClass("jt");
		}else{
			mp.find("td").removeClass("jt");
		}
		var currentDay = new Date(y,m,1);//本月一号的date()
		var oldDay =  new Date(y,m,0).getDate();//上个月最后一天是几号
		var newDay = new Date(y,m+1,1).getDate();//下个月的1号
		var currentWeed = currentDay.getDay();//当月1号是星期几
		var dayNum = new Date(y,m+1,0).getDate();//当月的天数
		var d2;//日历第一个开头是上个月几号
		if ( currentWeed != 0 ){
			d2 = oldDay - currentWeed + 1 ;
		}else{
			d2 = 0;
		}
		var a =1;
		for ( var i = 1 ; i <7 ; i++ ){
			for ( var j = 1 ; j < 8 ; j++ ){
				if ( i == 1 && j < currentWeed + 1 ){
					mp.eq(1).find("td").eq(j).html(d2);
					mp.eq(1).find("td").eq(j).addClass("offDay");
					d2++;
				}else if ( a <= dayNum ){
					mp.eq(i).find("td").eq(j).html(a);
					mp.eq(i).find("td").eq(j).removeClass("offDay");
					a++;
				}else {
					mp.eq(i).find("td").eq(j).html(newDay);
					mp.eq(i).find("td").eq(j).addClass("offDay");
					newDay++;
				}
			}
		}
	}
	//校历周数的显示
	function zc(y,m){
		for ( i in current ){
			var currentY = current[i].split("-")[0];
			var currentM = current[i].split("-")[1] - 1;
			var currentD = current[i].split("-")[2];
			if ( y == currentY ){
				var timeBetween = new Date(y,m,1).getTime() - new Date(currentY,currentM,currentD).getTime();
				var dayBetween = Math.floor(timeBetween/(24*60*60*1000));
				var weekBetween = Math.floor(dayBetween/7)+1;
				var ct = new Date(currentY,currentM,currentD).getDate()-1;
				var ctBetween = Math.floor(ct/7)+1;
				if (   weekBetween <= weekNum ){
					if (  m == currentM ){
						var j = 1;
						for ( var i = ctBetween+1 ; i<7 ; i++ ){
							mp.eq(i).find("td:eq(0)").html(j);
							j++;
						}
					}else if ( m > currentM ){
						for ( var i = 1; i < 7 ; i++ ){
							mp.eq(i).find("td:eq(0)").html(weekBetween);
							if ( weekBetween <= weekNum ){
								weekBetween++;
							}else{
								mp.eq(i).find("td:eq(0)").html("");
							}
						}
					}
				}else{
					mp.find("td:eq(0)").html("");
				}
			}
			if ( y > currentY ){
				var timeBetween = new Date(y,m,1).getTime() - new Date(currentY,currentM,currentD).getTime();
				var dayBetween = Math.floor(timeBetween/(24*60*60*1000));
				var weekBetween = Math.floor(dayBetween/7)+1;
				if ( m >= 0 ){
					for ( var i = 1 ; i < 7 ; i ++ ){
						mp.eq(i).find("td:eq(0)").html(weekBetween);
						if ( weekBetween <= weekNum ){
							weekBetween++;
						}else{
							mp.eq(i).find("td:eq(0)").html("");
						}
					}
				}
			}
			mp.find("td:eq(0)").addClass("zcClass");
		}
	}
	//向前事件--改变月份
	function monthLeft(y,m){
			if ( m <= 0 ){
				y--;
				$(".nian").find("option").removeAttr("selected");
				$(".nian").val(y).attr("selected","selected");
				m =11;
				$(".yue").find("option").removeAttr("selected");
				$(".yue").val(12).attr("selected","selected");
				xl(y,m);
				mp.find("td:eq(0)").html("");
				zc(y,m);
			}else{
				m--;
				xl(y,m);
				mp.find("td:eq(0)").html("");
				zc(y,m);
				var yueBetween = m + 1;
				$(".yue").find("option").removeAttr("selected");
				$(".yue").val(yueBetween).attr("selected","selected");
				
			}
	}
	//向前事件--改变年份
	function yearLeft(y,m){
		if ( y <= nianSta ){
			alert("年份错误");
		}else{
			y--;
			$(".nian").find("option").removeAttr("selected");
			$(".nian").val(y).attr("selected","selected");
			xl(y,m);
			mp.find("td:eq(0)").html("");
			zc(y,m);
		}
	}

	//向后事件
 	function monthRight(y,m){
			if ( m >= 11 ){
				y++;
				$(".nian").find("option").removeAttr("selected");
				$(".nian").val(y).attr("selected","selected");
				m =0;
				$(".yue").find("option").removeAttr("selected");
				$(".yue").val(1).attr("selected","selected");
				xl(y,m);
				mp.find("td:eq(0)").html("");
				zc(y,m);
			}else{
				m++;
				xl(y,m);
				mp.find("td:eq(0)").html("");
				zc(y,m);
				var yueBetween = m + 1;
				$(".yue").find("option").removeAttr("selected");
				$(".yue").val(yueBetween).attr("selected","selected");
			}
 	}
 	//向后事件--改变年份
	function yearRight(y,m){
		if ( y >= nianEnd ){
			alert("年份错误");
		}else{
			y++;
			$(".nian").find("option").removeAttr("selected");
			$(".nian").val(y).attr("selected","selected");
			xl(y,m);
			mp.find("td:eq(0)").html("");
			zc(y,m);
		}
	}


	var d = new Date();
	var day = d.getDate(),month = d.getMonth(),year = d.getFullYear(),week = d.getDay();             //week、month都是从0开始   
	//select的年月
	for ( var i = nianSta ; i <= nianEnd ; i++ ){ 
		if ( i != year ){
			var html = '<option value="' + i + '">' +i + '</option>';
			$(".nian").append(html);	
		}else{
			var html = '<option selected="selected" value="' + i + '">' +i + '</option>';
			$(".nian").append(html);	
		}                
	}
	for ( var i = 0 ; i <= 11 ; i++ ){ 
		if ( i != month ){
			var a = i+1;	
			var html = '<option value="' + a + '">' +a + '</option>';
			$(".yue").append(html);	
		}else{
			var a = i+1;	
			var html = '<option selected="selected" value="' + a + '">' + a + '</option>';
			$(".yue").append(html);	
		}                
	}
	
	xl(year,month);
	zc(year,month);
	//点击某个td添加class,同时如果点击非本月日期进行换页
	mp.find("td").click(function(){
		mp.find("td").removeClass("dj");
		if ( $(this).attr("class") != "offDay" ){
			$(this).addClass("dj");
		}else{
			var nianSel = $(this).parents().find(".calendar>.header>.nian").val();  
			var yueSel = $(this).parents().find(".calendar>.header>.yue").val()-1; 
			var cdn = new Date(nianSel,yueSel,0).getDate();           //当前日历页面的总天数
			var i = $(this).text();
			if ( $(this).parent().index() != 1 ){
				monthRight(nianSel,yueSel);
				mp.find("td").each(function(){
					if ( $(this).text() == i && $(this).attr("class") != "offDay" && $(this).attr("class") != "zcClass" ){
						$(this).addClass("dj");
					}
				})
			}else if( $(this).parent().index() ==1 ){
				monthLeft(nianSel,yueSel);
				mp.find("td").each(function(){
					if ( $(this).text() == i && $(this).attr("class") != "offDay" && $(this).attr("class") != "zcClass" ){
						$(this).addClass("dj");
					}
				})
			}
		}
	})
	$(".calendar").on("click",function(e){ 
		var target = $(e.target); 
		if(target.closest(".time>tbody>tr").find("td").length == 0){ 
			mp.find("td").removeClass("dj");
		} 
	})
	//select改变之后对应的日历页面
	var a = year,b = month;
	$(".nian,.yue").change(function(){
		var nianSel = $(".nian").find("option:selected").val();
		var yueSel = $(".yue").find("option:selected").val()-1;
		if ( nianSel != a || yueSel != b ){
			a = nianSel;
			b = yueSel;
			xl(nianSel,yueSel);
			mp.find("td:eq(0)").html("");
			zc(nianSel,yueSel);		
		}
	})

	//按钮事件
	$("#left").click(function(){
		var nianSel = $(".nian").find("option:selected").val();
		var yueSel = $(".yue").find("option:selected").val()-1;
		monthLeft(nianSel,yueSel);
	})
	$("#doubleLeft").click(function(){
		var nianSel = $(".nian").find("option:selected").val();
		var yueSel = $(".yue").find("option:selected").val()-1;
		yearLeft(nianSel,yueSel);
	})
	$("#right").click(function(){
		var nianSel = $(".nian").find("option:selected").val();
		var yueSel = $(".yue").find("option:selected").val()-1;
		monthRight(nianSel,yueSel);
	})
	$("#doubleRight").click(function(){
		var nianSel = $(".nian").find("option:selected").val();
		var yueSel = $(".yue").find("option:selected").val()-1;
		yearRight(nianSel,yueSel);
	})
	$("#reset").click(function(){
		console.log(123);
		$(".nian").find("option").removeAttr("selected");
		$(".nian").val(year).attr("selected","selected");
		$(".yue").find("option").removeAttr("selected");
		$(".yue").val(month+1).attr("selected","selected");
		xl(year,month);
		zc(year,month);
	})
})		