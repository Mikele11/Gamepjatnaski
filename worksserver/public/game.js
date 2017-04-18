var arr = [], box, ei,ej;						
function swap(arr,i1,j1,i2,j2){				
	t = arr[i1][j1];
	arr[i1][j1] = arr[i2][j2];
	arr[i2][j2] = t;
}
window.onload = function() {				
	box = document.getElementById("box");
	newGame();				
	document.getElementById("reset").onclick = newGame;						
}
function cellClick(event) {
	var event = event || window.event,
		el = event.srcElement || event.target,
		i = el.id.charAt(0),
		j = el.id.charAt(2);
	if((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)){					
		document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
		el.innerHTML = "";
		ei = i;
		ej = j;
		var q = true;
		Window.changes=Window.changes+1;
		for(i = 0; i < Window.sizegame; ++i)
			for(j = 0; j < Window.sizegame; ++j)
				if(i + j != ((Window.sizegame-1)*2) && document.getElementById(i + " " + j).innerHTML != i*Window.sizegame + j + 1){
					q = false;
					break;
				}
				if(q) alert("Victory!");
			}
}
function newGame(){			
	for(i = 0; i < Window.sizegame; ++i){
		arr[i] = []
		for(j = 0; j < Window.sizegame; ++j){
			if(i + j !=((Window.sizegame-1)*2))
			{
				arr[i][j] = i*Window.sizegame + j + 1;
			}	
			else
				arr[i][j] = "";
		}
		console.log(arr);
	}
    Window.changes = 0;
	ei = Window.sizegame-1;
	ej = Window.sizegame-1;
	for(i = 0; i < 1600; ++i)
		switch(Math.round(3*Math.random())){
			case 0: if(ei != 0) swap(arr,ei,ej,--ei,ej); break; // up
			case 1: if(ej != (Window.sizegame-1)) swap(arr,ei,ej,ei, ++ej); break; // right
			case 2: if(ei != (Window.sizegame-1)) swap(arr,ei,ej,++ei,ej); break; // down
			case 3: if(ej != 0) swap(arr,ei,ej,ei,--ej); // left
		}
	var table = document.createElement("table"),
		tbody = document.createElement("tbody");					
	table.appendChild(tbody);
	for(i = 0; i < Window.sizegame; ++i){
		var row = document.createElement("tr");
		for(j = 0; j < Window.sizegame; ++j){
			var cell = document.createElement("td");
				cell.id = i + " " + j;
				cell.onclick = cellClick;
				cell.innerHTML = arr[i][j];
				row.appendChild(cell);
		}
		tbody.appendChild(row);					
	}
	if(box.childNodes.length == 1)
		box.removeChild(box.firstChild);	
	box.appendChild(table);	
}