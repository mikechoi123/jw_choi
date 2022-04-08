$(function(){
	function mobileLink(){
		if(isMobile){
			$(".project").eq(0).find("a").attr({href: "project1/mobile/index.html"});
			$(".project").eq(1).find("a").attr({href: "project2/mobile/index.html"});
		}
		else{
			$(".project").eq(0).find("a").attr({href: "project1/pc/index.html"});
			$(".project").eq(1).find("a").attr({href: "project2/pc/index.html"});
		}

		$(".project").eq(2).find("a").attr({href: "project3/index.html"});
	}

	mobileLink();
});