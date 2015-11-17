"use strict";
window.onload = function () {
	var stack = [];
	var displayVal = "0";
	var highflag = false;
	var factflag = false;

	//연산자들 정규식
	var isoperator = /[\^\*\/\+\-\!\=]/;
	//우선순위 높은 연산자들 정규식
	var ishigh = /[\^\*\/]/;

	for (var i in $$('button')) {
		$$('button')[i].onclick = function () {

			//모든 계산이 한번 끝난 후의 입력
			if(stack[0]=="="){
				displayVal ="0";
				document.getElementById("expression").innerHTML="0";
				stack=[];
			}

			//초기화
			var value = this.innerHTML;
			var expr = document.getElementById("expression").innerHTML;

			//expression이 0이라면 0빼고 더하고, 아니면 그냥 더하고
			var temp = displayVal=="0"&&isoperator.test(value)&&!factflag ?"0"+value:value;
			displayVal+="";
			temp = displayVal.indexOf(".")!=-1 && value=="."?"":temp;
			document.getElementById("expression").innerHTML = expr=="0"?temp:expr+temp;	

			//그냥 초기화
			if(value==="AC"){
				displayVal ="0";
				document.getElementById("expression").innerHTML="0";
				stack=[];
			}

			//만약 .이라면  현재 .이 없을 때 추가
			else if(value==="."){
				displayVal += displayVal.indexOf(".") == -1 ? value : "";
			}

			//만약  숫자라면 그냥 displayVal에 추가, 단 0인경우는 0을 제외.
			else if( /[0-9]/.test(value)){
				displayVal= displayVal=="0"?value:displayVal+value;
			}

			//오퍼레이터라면
			else{

				//Float로 바꿔놓고
				displayVal = parseFloat(displayVal);

				//만약 오퍼레이터가 !라면 
				if(value=="!"){
					//팩토리얼 계산 후에  스택에 푸시 후 displayVal 초기화
					//factflag 세팅
					stack.push(factorial(displayVal));
					displayVal = 0;
					factflag = true;
				}

				//팩토리얼만 아니라면
				else{
					//이전 오퍼레이터가 팩토리얼이 아니라면
					//만약 이전 오퍼레이터도 우선순위가 높다면 계산 후 푸시하고 아니면 그냥 숫자 푸시
					//그 후 오퍼레이터를 푸시하고 highflag를 true로 세팅
					if(!factflag){
						stack.push(highflag?highPriorityCalculator(stack, displayVal):displayVal);
					}
					stack.push(value);
					highflag = ishigh.test(value);
					factflag = false;
				}

				//=인경우와 아닌경우
				displayVal = value=="="?calculator(stack):0;
				stack = value=="="?["="]:stack;

			}
			document.getElementById("result").innerHTML = displayVal;
		};
	}
};

function factorial (x) {
	return x<0?"NaN":(x==0?1:x*factorial(x-1));
}

function highPriorityCalculator(s, val) {
	var operator = s.pop();
	var operand = s.pop();
	var result;
	if(operator == "*"){
		result = operand * val;
	}
	if(operator == "/"){
		result = val!=0?operand / val:"NaN";
	}
	if(operator == "^"){
		result = Math.pow(operand,val);
	}
	return result;
}

function calculator(s) {
	var result=s[0];
	for(var i =1;i<s.length-2;i++){
		if(s[i]=="+"){
			result+=s[i+1];
		}
		else if(s[i]=="-"){
			result-=s[i+1];
		}
		else if(s[i]=="NaN"){
			result = "NaN";
			break;
		}
	}
	return result;
}
