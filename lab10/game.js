"use strict";
var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;

document.observe('dom:loaded', function(){
	$("start").observe("click",stopToStart);
	$("stop").observe("click",stopGame);
});

//state를 바꾸는 함수입니다.
function setState(state){
	$("state").innerHTML=state;
}

function clearTimer(){
	if(timer!==null){
		clearInterval(timer);
		timer = null;
	}
}

//모든 세팅을 Reset하는 함수입니다.
function resetAll(){
	targetBlocks = [];
	selectedBlocks = [];
	clearTimer();
	timer = null;
	var blocks = $$(".block");
	for(var i=0;i<numberOfBlocks;i++){
		if(blocks[i].hasClassName("target")){
			blocks[i].removeClassName("target");
		}
		if(blocks[i].hasClassName("selected")){
			blocks[i].removeClassName("selected");
		}
	}
}

function stopToStart(){
    stopGame();
    startToSetTarget();
}

function stopGame(){
	resetAll();
	setState("Stop");
	$("answer").innerHTML = "0/0";
}

function startToSetTarget(){
	
	resetAll();

	setState("Ready!");

	var blocks = $$(".block");
	for(var i=0;i<numberOfTarget;i++){
		var flag = false;
		var r = parseInt(Math.random()*10)%numberOfBlocks;

		for(var j=0;j<targetBlocks.length;j++){
			if(targetBlocks[j]==r){
				flag = true;
				break;
			}
		}

		if(flag){
			i--;
			continue;
		}

		targetBlocks.push(r);
	}

	timer = setInterval(setTargetToShow, interval);
}

function setTargetToShow(){

	clearTimer();

	setState("Memorize!");
	var blocks = $$(".block");
	for(var i=0;i<numberOfTarget;i++){
		blocks[targetBlocks[i]].addClassName("target");
	}

	timer = setInterval(showToSelect, interval);
}

function showToSelect(){

	clearTimer();

	setState("Select!");

	var blocks = $$(".block");
	for(var i=0;i<numberOfBlocks;i++){
		
		if(blocks[i].hasClassName("target")){
			blocks[i].removeClassName("target");
		}
		
		blocks[i].observe("click",function(){
			var i = parseInt(this.getAttribute("data-index"));
			for(var j=0;j<selectedBlocks.length;j++){
				if(selectedBlocks[j]==i){
					return false;
				}	
			}
			
			if(selectedBlocks.length<numberOfTarget){
				if(!this.hasClassName("selected")){
					this.addClassName("selected");
				}
				selectedBlocks.push(i);
			}
		});

	}
	timer = setInterval(selectToResult, interval);

}

function selectToResult(){

	if(timer!==null){
		clearInterval(timer);
		timer = null;
	}
	
	setState("Checking");

	var answer= $("answer").innerHTML.split("/");
	var correct = parseInt(answer[0]);
	var total = parseInt(answer[1]);

	var blocks = $$(".block");
	for(var i =0;i<numberOfBlocks;i++){
		blocks[i].stopObserving("click");
	}
	var len =selectedBlocks.length;
	for(var i = 0;i<len;i++){
		var selected = selectedBlocks.pop();
		if(blocks[selected].hasClassName("selected")){
			blocks[selected].removeClassName("selected");
		}

		for(var j=0;j<numberOfTarget;j++){
			if(targetBlocks[j]===selected){
				correct++;
			}
		}
		
	}
	total+=3;
	
	$("answer").innerHTML = correct + " /" + total;

	timer = setInterval(startToSetTarget,interval);

}
