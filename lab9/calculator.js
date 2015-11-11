"use strict";
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
			var expr = document.getElementById("expression").innerHTML;
			if(stack[0]=="="){
				displayVal="0";
			}
			if(value==="AC"){
				displayVal ="0";
				document.getElementById("expression").innerHTML="0";
				stack=[];
			}
			else if(value==="."){
				if(displayVal.indexOf(".") == -1){
					displayVal+=value;
				}
			}
			else if( /[0-9]/.test(value)){
				if(displayVal=="0"){
					displayVal = value;
				}
				else{
					displayVal+=value;
				}
			}
			else{
				var buf= displayVal+value;
				var ishigh = /[\^\*\/]/;

				displayVal = parseFloat(displayVal);

				if(expr=="0"){
					expr=buf;
				}
				else {
					expr+=buf;
				}
				document.getElementById("expression").innerHTML = expr;
				
				if(value=="!"){
					stack.push(factorial(stack.pop()));
					displayVal = 0;
				}
				else if(ishigh.test(value)){
					stack.push(displayVal);
					stack.push(value);
				}
				else{
					if(stack.length>=1){
						var high = stack.pop();
						stack.push(high);						
						if(ishigh.test(high)){
							displayVal = highPriorityCalculator(stack, displayVal);
						}
					}
					stack.push(displayVal);
					stack.push(value);
				}
				if(value=="="){
					displayVal = calculator(stack);
					document.getElementById("expression").innerHTML="0";
					stack=["="];
				}
				else{
					displayVal = 0;
				}
			}
			document.getElementById("result").innerHTML = displayVal;
        };
    }
};
function factorial (x) {
	if(x==1){
		return x;
	}
	else {
		return x*factorial(x-1);
	}
}
function highPriorityCalculator(s, val) {
	var operator = s.pop();
	var operand = s.pop();
	var result;
	if(operator == "*"){
		result = operand * val;
		//alert(""+result+" "+operand);
	}
	if(operator == "/"){
		result = operand / val;
	}
	if(operator == "^"){
		result = Math.pow(operand,val);
	}
	return result;
}
function calculator(s) {
    var result = s[0];
    var operator = "+";
    for (var i=0; i< s.length; i++) {
		if(s[i]=="+"){
			result+=s[i+1];
		}
		else if(s[i]=="-"){
			result-=s[i+1];
		}
    }
    return result;
}
