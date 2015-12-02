"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	
	var imgs = $$("#labs>img");
	for(var i=0;i<imgs.length;i++){
		new Draggable(imgs[i],{
			revert:true
		});
	} 
	
	Droppables.add("labs",{
		onDrop: labSelect
	});
	
	Droppables.add("selectpad",{
		onDrop: labSelect
	});
	
	
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	if(drop.id=="labs"){
		if(drag.parentNode.id!="labs"){
			drag.remove();
			drop.appendChild(drag);
			var listitems = $$("#selection>li");
			for(var i=0;i<listitems.length;i++){
				if(listitems[i].innerHTML==drag.alt){
					listitems[i].remove();
					break;
				}
			}
		}
		
	}else if(drop.id=="selectpad"){
		if(drag.parentNode.id!="selectpad"){
			if($$("#selectpad>img").length<3){
				drag.remove();
				drop.appendChild(drag);
				var list = $("selection");
				var item = document.createElement("li");
				item.innerHTML=drag.alt;
				setTimeout(function(){
					list.appendChild(item);
					item.pulsate({
						duration :1.0
					});
				},500);
			}
		}
	}
	
}

