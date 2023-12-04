var counter=0;
var openCards=[];
var score=0;
var moves=0;
function clickingBackLeaf(x){
	if(counter!=2){
		var a="innerRoll"+x; 
		var b=document.getElementById(a);
		b.classList.add("rot");
		moves++;
		counter++;
		var i=0;
		var e=document.getElementById("printHere");
		document.getElementById("ScoreHere").innerHTML=score;
		if(counter==1){
			openCards[0]=x;	
			document.getElementById("MovesHere").innerHTML=moves;
		}
		else if((counter==2)&&(openCards[0]!=x)){	
			openCards[1]=x;
			document.getElementById("MovesHere").innerHTML=moves;
			setTimeout(function TwoCardsClicked(){
				var el1="backi"+openCards[0];
				var el2="backi"+openCards[1];
				var c=document.getElementById(el1);
				var d=document.getElementById(el2);
				var c1=c.getElementsByTagName("img");
				var d1=d.getElementsByTagName("img");
				
				if(c1[0].getAttribute("src")==d1[0].getAttribute("src")){
					score+=2;
					document.getElementById("ScoreHere").innerHTML=score;
					for(var j=0;j<2;j++){
						var ind=openCards[j];
						var card=document.getElementById("innerRoll"+ind);
						card.style.display="none";
					}
						if(score==16){
							document.getElementById("WinDiv").style.display="block";
						}
				}
				else{
					for(var j=0;j<2;j++){
						var ind=openCards[j];
						var card=document.getElementById("innerRoll"+ind);
						card.classList.remove('rot');
						
						setTimeout(function NotMatchedCards(){
								card.classList.add("AntiRot");
								card.classList.remove('AntiRot');
							},500);
					}
				}
						
				counter=0;
				openCards=[];
			},1000);
		}
		
	}
}
function Dice_roll_funct(){
	var i=1;
	score=0;
	moves=0;
	document.getElementById("MovesHere").innerHTML=moves;
	document.getElementById("ScoreHere").innerHTML=score;
	var e=document.getElementById("printHere");
	e.style.display="block";
	e.innerHTML=" ";
	var array=[];
	var fruits=["<img src='images/apple.png'>","<img src='images/watermelon.png'>",
                "<img src='images/orange.jpg'>","<img src='images/grapes.jpg'>"];
	for (i=0;i<16;i++){
		array[i]="-1";
	}
	var j=0;
	for(i=1;i<=16;i++){
		var pt=Math.ceil(Math.random()*16);
		var a=pt;
		var f=0;
		var k=0;
		while(k<j){
			if (array[k]==pt){
				if(f==0){
					pt++;
					k=-1;
				}
				else if(f==1){
					pt--;
					k=-1;
				}
				if(pt>16){
					pt=a;
					f=1;
					k=-1;
				}
			}
			k++;
		}			
		array[j]=pt;
		j++;
	}
	var finalarray=[];
	k=0;
	for(i=0;i<16;i++){
		finalarray[array[i]-1]=fruits[k];
		k++;
		if(k>=4)	k=0;
	}
	
	e.innerHTML+='<ul style="list-style-type:none;">';
	
	for(i=0;i<16;i++){
		var part1="<li><div id='Roll'><div class='innerRollProperties' id='innerRoll"+i+"'>";
		var part2="<div class='front' id='fronti"+i+"' onclick='clickingBackLeaf("+i+")'><img src='images/mapleLeaf.jpeg'></div>";
		var part3="<div class='back' id='backi"+i+"'>"+finalarray[i]+"</div></div></div></li>";
		e.innerHTML+=part1+part2+part3;
		if((i+1)%4==0)
			{e.innerHTML+="<br>";}
	}
	e.innerHTML+="</ul>";
}

document.getElementById("button").addEventListener("click",Dice_roll_funct);