$(function(){
	var videoUrl=["video0","video1"];
	var videoN=0;
	var videoPath="";
	// var video=document.getElementById("my_video");

	var n=0;
	var t;
	var pos=0;
	var scrollTimer;

	AOS.init({
		easing:"ease-in-out-sine",
		duration:1000,
		once:true
	});

	function init(){
		$("#gnb li").eq(n).addClass("on");
		// $(".header_inner .slide_count").text(current);
		$(".project").eq(0).addClass("active");
		$(".project").eq(0).addClass("on");
	}
	init();

	var vw=100;
	var vamount=0;

	var video1=document.getElementById("my_video1");
	video1.muted=true;

	var video2=document.getElementById("my_video2");
	video2.muted=true;

	videoInit();

	video1.addEventListener("ended", function(){
		setTimeout(function(){
			leftMoving();
		}, 1000);
	});
	video2.addEventListener("ended", function(){
		setTimeout(function(){
			leftMoving();
		}, 1000);
	});
	$("#header .prev").click(function(e){
		e.preventDefault();
		rightMoving();
	});
	$("#header .next").click(function(e){
		e.preventDefault();
		leftMoving();
	});
	$("#header .prev, #header .next").hover(
		function(){
			$(this).addClass("active");
		},
		function(){
			$(this).removeClass("active");
		}
	);

	function videoInit(){
		video1.play();
	}
	function videoSet(){
		video1.currentTime=video2.currentTime=0;
		video1.pause();
		video2.pause();
	}
	function etcSet(){
		var src=$(".video li:first-child video").attr("src");
		src=src.substring(6); // video/video1.mp4 : video1.mp4

		if(src == "video1.mp4"){
			$("#header .prev .slide_count").text("1/2");
			$("#header .next .slide_count").text("1/2");

		}
		else if(src === "video2.mp4"){
			$("#header .prev .slide_count").text("2/2");
			$("#header .next .slide_count").text("2/2");
		}
	}
	function leftMoving(){
		vamount-=vw;
		$(".video ul").animate({left:vamount+"%"}, 500, function(){
			$(this).append($(".video ul li:first-child"));
			vamount+=vw;
			$(this).css({left:vamount+"%"});
			var firstLi=$(".video ul li:first-child")[0]; // HTML DOM
			var video=firstLi.firstElementChild;
			videoSet();
			etcSet();
			video.play();
		});
	}
	function rightMoving(){
		$(".video ul").prepend($(".video ul li:last-child"));
		vamount-=vw;
		$(".video ul").css({left:vamount+"%"});

		vamount+=vw;
		$(".video ul").animate({left:vamount+"%"}, 500, function(){
			var firstLi=$(".video ul li:first-child")[0];
			var video=firstLi.firstElementChild;
			videoSet();
			etcSet();
			video.play();
		});
	}

	var videoTimer=0;

	$(window).resize(function(){
		clearTimeout(videoTimer);

		setTimeout(function(){
			var winW=$(window).width();
			var winH=$(window).height();
			var ratio=winW/winH;
			// console.log(ratio);

			$(".video video").removeAttr("style");

			if(ratio > 1.75){
				$(".video video").css({width:winW});
			}
			else{
				$(".video video").css({height:winH});
			}
		}, 100);
	});
	$(window).trigger("resize");

	$(window).scroll(function(){
		clearTimeout(scrollTimer);

		scrollTimer=setTimeout(function(){
			t=$(window).scrollTop();
			//console.log("t:", t);
			if(t < $("#page1").offset().top){
				n=0;
			}
			else if(t < $("#page2").offset().top){
				n=1;
			}
			else if(t < $("#page5").offset().top){
				n=2;

				if(t == $(document).height()-$(window).height()){
					n=3;
				}
			}
			else{
				n=3;
			}

			if(n == 0 || n == 2 || n == 4 || n==5 || n==6){
				$("#gnb li").removeClass("active");
				$("#header .logo").removeClass("active");
			}
			else{
				$("#gnb li").addClass("active");
				$("#header .logo").addClass("active");
			}

			$("#gnb li").removeClass("on");
			$("#gnb li").eq(n).addClass("on");
		}, 100);
	});

	$(".index dl").click(function(e){
		e.preventDefault();
		n=$(this).index();
		$(".project").removeClass("active");
		$(".project").eq(n).addClass("active"); 

		var posy=$(".project").eq(n).offset().top;

		$("html").animate({scrollTop:posy}, 400);
	});
	$(".project_title").click(function(e){
		e.preventDefault();
		n=$(this).index();
		
		if($(this).parent().hasClass("active") == false){
			$(".project").removeClass("active");
			$(this).parent().addClass("active");
		}
        else{										
          	$(this).parent().removeClass("active"); 
        }

		t=$(this).parent().offset().top;  
        $("html").animate({scrollTop:t},400);
    });
	$(window).trigger("scroll");

	$("#gnb li").click(function(e){
		e.preventDefault();
		n=$(this).index();

		if(n == 0){
			pos=0;
		}
		else{
			if( n==2 ){
				n=5;
			}
			pos=Math.ceil($("#page"+n).offset().top);
		}
		

		$("html").animate({scrollTop:pos}, 800);
	});
});