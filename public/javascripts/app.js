
function rancolor(textdiv){
	   var red = Math.floor(Math.random() * 255);
	   var green = Math.floor(Math.random() * 255);
	   var blue = Math.floor(Math.random() * 255);
	   document.getElementById(textdiv).style.color = 'rgb('+red+','+green+','+blue+')';
	   //document.getElementById('topbanner').style.backgroundColor = 'rgb('+red+','+green+','+blue+')';
	   }


	
function changeText(id){
	var list0 = ["computer science undergrad","web developer", "photographer", "interface designer", "graphic designer", "Simon Fraser University student", "Vancouver resident" ];
	var list1 = ["Backbone.js", "Knockout.js", "CoffeeScripts", "typography", "the WWW", "Human Computer Interaction","JavaScript", "jQuery", "graphic", "photography", "CSS", "psychology", "pop culture", "urban culture", "iphoneography", "snowboading", "Vancouver Canucks", "User Interface Design", "Emerging Technologies", "mobility", "smartphones"];
	var list2 = ["JavaScript","HTML", "CSS3", "Node.js", "jQuery", "HTML5", "CSS", "Google Fonts", "Foundation3", "Jade", "Amazon EC2", "GitHub"];
	var temp;
	if (id=='iam'){
		temp = Math.floor(Math.random() * list0.length);
		//list0.shuffle();
		document.getElementById('iam').textContent = list0[temp];
		changeColor('#iam');
	}
	else if (id =='ilike'){
		
		temp = Math.floor(Math.random() * list1.length);
		//list1.shuffle();
		document.getElementById('ilike').textContent = list1[temp];
		changeColor('#ilike');
	}
	else if (id =='used'){
		//list2.shuffle();
		temp = Math.floor(Math.random() * list2.length);
		document.getElementById('used').textContent = list2[temp];
		changeColor('#used');
	}	
}



		
	var c=0;
	var t;
	var timer_is_on=0;
	
	function autoChangeText()
	{
			var list = ["iam", "ilike", "used"];
			temp = Math.floor(Math.random() * list.length);
			changeText(list[temp]);
			changeColor('#catherine');
			t=setTimeout("autoChangeText()",2000);
			
	}
	
	function doTimer()
	{
	if (!timer_is_on)
	  {
	  timer_is_on=1;
	  autoChangeText();
	  }
	}
	
	function timer(){
		var k=setTimeout("doTimer()",2000);
		}
	
	
/*$(function() {
	$( ".navTab" ).hoverNav(){
	temp = document.getElementById(menuID);
	temp.textContent = temp.textContent.toUpperCase();
	});
	
	*/