var can_move_top=true;
var can_move_bottom=true;
var can_move_right=true;
var can_move_left=true;
var won=false;
function lostWorld(){
	if (can_move_top==false && can_move_bottom==false && can_move_right==false && can_move_left==false){
		var lostModal = document.getElementById('myLostModal');
		lostModal.style.display = "block";

		var lost_msg=document.getElementById("lost_msg");
		lost_msg.style.visibility='visible';
		prevent_default();
	}
}
function prevent_default(){
	document.body.addEventListener('keydown',function(event){
		if (event.code=='ArrowDown'||event.code=='ArrowUp'||event.code=='ArrowRight'||event.code=='ArrowLeft'){
			event.preventDefault();
		}
	});

}
function start(){
	var cell=document.getElementsByClassName("grid-cell");
	for (var i=0;i<cell.length;i++)
	{
		cell[i].style.backgroundColor='rgba(238, 228, 218, 0.35)';
		cell[i].innerHTML="";
	}
	randomNumberAtRandomPosition();
}
function colorBackground(current_cell){
	bgcol=['#ccc0b4','#eee4da','#ede0c8','#f2b179','#f59563','#f67c5f','#f67c5f','#edcf72','#edcc61','#ebc846','#f2c842','#ecc400','#ff3c3e','#ff1d1f','#fe1c1e','#fe1c1e','#fd1a1c','#ff1d1f'];
	if (current_cell.innerHTML==""){
		current_cell.style.backgroundColor=bgcol[0];
	}
	else{
		current_cell.style.backgroundColor=bgcol[Math.log(current_cell.innerHTML)/Math.log(2)];
		if (current_cell.innerHTML=="2048"||current_cell.innerHTML=='4096'){
			var modal = document.getElementById('myModal');
			modal.style.display = "block";

			var win_msg=document.getElementById("win_msg");
			win_msg.style.visibility='visible';
			won=true;
			prevent_default();
		}
	}
}
function countBlank(){
	var cell=document.getElementsByClassName("grid-cell");
	var count_blank=0;
	blanks=[];
	for (var i=0;i<cell.length;i++)
	{
		if (cell[i].innerHTML=="")
		{
			blanks.push(i);
			count_blank++;
		}
	}
	if (count_blank>0){
		return blanks;
	}else {
		alert("Game over");
	}
}
function randomNumberGenerator(){
	var new_number=Math.ceil(Math.random()*3);
	if (new_number<3){
		new_number=2;
	}
	else{
		new_number=4;
	}
	return new_number;
}
function randomPositionGenerator(){
	blanks=countBlank();
	var new_position=blanks[Math.floor(Math.random()*blanks.length)];
	return new_position;
}
function randomNumberAtRandomPosition(){
	var new_number=randomNumberGenerator();
	var new_position=randomPositionGenerator();
	var cell=document.getElementsByClassName("grid-cell");
	cell[new_position].innerHTML=new_number;
	colorBackground(cell[new_position]);
}
function findBlanksInRow(current_row_no){
	var cell=document.getElementsByClassName("grid-cell");
	blanks_in_row=[];
	for (var i=0;i<4;i++){
		if (cell[(current_row_no)*4+i].innerHTML=="")
		{
			blanks_in_row.push((current_row_no)*4+i);
		}
	}
	return blanks_in_row;
}
function findBlanksInColumn(current_column_no){
	var cell=document.getElementsByClassName("grid-cell");
	blanks_in_column=[];
	for (var i=0;i<4;i++){
		if (cell[current_column_no+(4*i)].innerHTML=="")
		{
			blanks_in_column.push(current_column_no+(4*i));
		}
	}
	return blanks_in_column;
}

function moveBlanksToOppositeDirection(direction,current_row_no){
	blanks_in_row=findBlanksInRow(current_row_no);
	var cell=document.getElementsByClassName("grid-cell");
	if (direction=="right"){
		var start=current_row_no*4;
		var end=current_row_no*4+3;
		while (end>=start){
			if (cell[start].innerHTML=="")
			{
				start++;
			}
			else if (cell[end].innerHTML!=""){
				end--;
			}
			else{
				var i=end;
				for (;i>start;i--)
				{
					cell[i].innerHTML=cell[i-1].innerHTML
					colorBackground(cell[i]);
				}
				cell[i].innerHTML=""
				colorBackground(cell[i]);
				start++;
			}
		}
	}
	else if (direction="left"){
		var end=current_row_no*4;
		var start=current_row_no*4+3;
		var i=start;
		while (start>=end){
			if (cell[start].innerHTML=="")
			{
				start--;
			}
			else if (cell[end].innerHTML!=""){
				end++;
			}
			else{
				var i=end;
				for (;i<start;i++)
				{
					cell[i].innerHTML=cell[i+1].innerHTML
					colorBackground(cell[i]);
				}
				cell[i].innerHTML=""
				colorBackground(cell[i]);
				start--;
			}
		}
	}
}
function mergeTwoSameOnes(direction,current_row_no){
	var hohoscore=document.getElementById('hohoscore');
	var oldscore=hohoscore.innerHTML;
	var newscore;
	blanks_in_row=findBlanksInRow(current_row_no);
	var cell=document.getElementsByClassName("grid-cell");
	if (direction=="right"){
		var start=current_row_no*4;
		var end=current_row_no*4+3;
		while (end>start&&cell[end].innerHTML!=""){
			if (cell[end].innerHTML==cell[end-1].innerHTML){
				var new_val=2*cell[end].innerHTML
				newscore= parseInt(oldscore)+parseInt(new_val);
				hohoscore.innerHTML=newscore;
				cell[end].innerHTML=new_val
				cell[end-1].innerHTML=""
				colorBackground(cell[end]);
				colorBackground(cell[end-1]);
				end=end-2;
			}
			else{
				end--;
			}
		}
	}
	else if (direction="left"){
		var end=current_row_no*4;
		var start=current_row_no*4+3;
		while (start>end&&cell[end].innerHTML!=""){
			if (cell[end].innerHTML==cell[end+1].innerHTML){
				var new_val=2*cell[end].innerHTML
				newscore= parseInt(oldscore)+parseInt(new_val);
				hohoscore.innerHTML=newscore;
				cell[end].innerHTML=new_val
				cell[end+1].innerHTML=""
				colorBackground(cell[end]);
				colorBackground(cell[end+1]);
				end=end+2;
			}
			else{
				end++;
			}
		}
	}
	
}
function compareBlanks(blanks1,blanks2){ //returns true if blanks are unchanged
	var result=true;
	if (blanks1.length==blanks2.length){
		for (var i=0;i<blanks1.length;i++){
			if (blanks1[i]!=blanks2[i]){
				result=result && false;
			}
		}
	}
	return result;
}
function moveRightLeft(direction){
	var row=document.getElementsByClassName("grid-row");
	var cell=document.getElementsByClassName("grid-cell");
	var condn1=false;
	var condn2=false;
	for (var current_row_no=0;current_row_no<4;current_row_no++)
	{
		blanks_in_row1=findBlanksInRow(current_row_no);
		if (blanks_in_row1.length>0){
			moveBlanksToOppositeDirection(direction,current_row_no);
		}
		blanks_in_row2=findBlanksInRow(current_row_no);
		mergeTwoSameOnes(direction,current_row_no);
		condn1=condn1 || !compareBlanks(blanks_in_row1,blanks_in_row2);
		blanks_in_row3=findBlanksInRow(current_row_no);
		if (blanks_in_row3.length>0){
			moveBlanksToOppositeDirection(direction,current_row_no);
		}
		condn2=condn2||!compareBlanks(blanks_in_row2,blanks_in_row3);
	}
	if (condn1==true ||condn2==true){
		can_move_left=true;
		can_move_right=true;
		randomNumberAtRandomPosition();
	}else{
		if (direction=="left"){
			can_move_left=false;
		}
		if (direction=="right"){
			can_move_right=false;
		}
		lostWorld();
	}
}

function moveBlanksToOppositeDirectionColumn(direction,current_column_no){
	blanks_in_column=findBlanksInColumn(current_column_no);
	var cell=document.getElementsByClassName("grid-cell");
	var no_of_cols=(Math.sqrt(cell.length));
	if (direction=="up"){
		var start=12+current_column_no;
		var end=current_column_no;
		while (Math.floor(start/no_of_cols)>Math.floor(end/no_of_cols)){
			if (cell[start].innerHTML==""){
				start=start-no_of_cols;
			}
			else if (cell[end].innerHTML!="") {
				end+=no_of_cols;
			}
			else{
				var i=end;
				for (;i<start;i=i+no_of_cols){
					cell[i].innerHTML=cell[i+no_of_cols].innerHTML;
					colorBackground(cell[i]);
				}
				cell[i].innerHTML="";
				colorBackground(cell[i]);
				start=start-no_of_cols;
			}

		}
	}
	else if (direction=="down"){
		var end=12+current_column_no;
		var start=current_column_no;
		while (Math.floor(end/no_of_cols)>Math.floor(start/no_of_cols)){
			if (cell[start].innerHTML==""){
				start=start+no_of_cols;
			}
			else if (cell[end].innerHTML!="") {
				end-=no_of_cols;
			}
			else{
				var i=end;
				for (;i>start;i=i-no_of_cols){
					cell[i].innerHTML=cell[i-no_of_cols].innerHTML;
					colorBackground(cell[i]);
				}
				cell[i].innerHTML="";
				colorBackground(cell[i]);
				start=start+no_of_cols;
			}

		}
	}
}
function mergeTwoSameOnesColumn(direction,current_column_no){
	var hohoscore=document.getElementById('hohoscore');
	var oldscore=hohoscore.innerHTML;
	var newscore;
	blanks_in_column=findBlanksInColumn(current_column_no);
	var cell=document.getElementsByClassName("grid-cell");
	var no_of_cols=(Math.sqrt(cell.length));
	if (direction=="up"){
		var start=12+current_column_no;
		var end=current_column_no;
		while (start>end&&cell[end].innerHTML!=""){
			if (cell[end].innerHTML==cell[end+4].innerHTML){
				var new_val=2*cell[end].innerHTML;
				newscore= parseInt(oldscore)+parseInt(new_val);
				hohoscore.innerHTML=newscore;
				cell[end].innerHTML=new_val
				cell[end+4].innerHTML=""
				colorBackground(cell[end]);
				colorBackground(cell[end+4]);
				end+=8;
			}
			else{
				end=end+4;
			}
		}
	}
	else if (direction=="down"){
		var end=12+current_column_no;
		var start=current_column_no;
		while (Math.floor(end/no_of_cols)>Math.floor(start/no_of_cols)&&cell[end].innerHTML!=""){
			if (cell[end].innerHTML==cell[end-4].innerHTML){
				var new_val=2*cell[end].innerHTML;
				newscore= parseInt(oldscore)+parseInt(new_val);
				hohoscore.innerHTML=newscore;
				cell[end].innerHTML=new_val
				cell[end-4].innerHTML=""
				colorBackground(cell[end]);
				colorBackground(cell[end-4]);
				end=end-8;
			}
			else{
				end=end-4;
			}
		}
	}
}
function moveUpDown(direction){
	var row=document.getElementsByClassName("grid-row");
	var cell=document.getElementsByClassName("grid-cell");
	var condn1=false;
	var condn2=false;
	for (var current_column_no=0;current_column_no<4;current_column_no++)
	{
		blanks_in_column1=findBlanksInColumn(current_column_no);
		if (blanks_in_column1.length>0){
			moveBlanksToOppositeDirectionColumn(direction,current_column_no);
		}
		blanks_in_column2=findBlanksInColumn(current_column_no);
		condn1=condn1 || !compareBlanks(blanks_in_column1,blanks_in_column2);
		mergeTwoSameOnesColumn(direction,current_column_no);
		blanks_in_column3=findBlanksInColumn(current_column_no);
		if (blanks_in_column3.length>0){
			moveBlanksToOppositeDirectionColumn(direction,current_column_no);
		}
		condn2=condn2||!compareBlanks(blanks_in_column2,blanks_in_column3);
	}
	if (condn1==true ||condn2==true){
		can_move_top=true;
		can_move_bottom=true;
		randomNumberAtRandomPosition();
	}else{
		// countBlank();
		if (direction=="up"){
			can_move_top=false;
		}
		if (direction=='down'){
			can_move_bottom=false;
		}
		lostWorld();
	}
}
function shift(event){
	if (won==false){
		if (event.code=='ArrowDown'){
			event.preventDefault();
			moveUpDown("down");
		}
	    if (event.code=='ArrowUp'){
			event.preventDefault();
			moveUpDown("up")
		}
		if (event.code=='ArrowRight'){
			event.preventDefault();
			moveRightLeft("right")
		}
		if (event.code=='ArrowLeft'){
			event.preventDefault();
			moveRightLeft("left");
		}
	}
	else{
		prevent_default();
	}
}
document.body.addEventListener('keydown',shift);
function shiftMobile(event){
	if (won==false){
		if (event.code=='ArrowDown'){
			event.preventDefault();
			moveUpDown("down");
		}
	    if (event.code=='ArrowUp'){
			event.preventDefault();
			moveUpDown("up")
		}
		if (event.code=='ArrowRight'){
			event.preventDefault();
			moveRightLeft("right")
		}
		if (event.code=='ArrowLeft'){
			event.preventDefault();
			moveRightLeft("left");
		}
	}
	else{
		prevent_default();
	}
}
var startX;
var startY;
document.body.addEventListener('touchstart',function(event){
	touchobj = event.changedTouches[0];
	startX=parseInt(touchobj.clientX);
	startY=parseInt(touchobj.clientY);
});
var endX;
var endY;
document.body.addEventListener('touchmove',function(event){
	touchobj = event.changedTouches[0];
	endX=parseInt(touchobj.clientX);
	endY=parseInt(touchobj.clientY);
});
document.body.addEventListener('touchend',function(event){
	touchobj = event.changedTouches[0];
	var distX=startX - endX;
	var distY=startY - endY;
	if (Math.abs(distX)>Math.abs(distY)){
		if (distX>50){
			moveRightLeft("left");

		}else if (distX<-50){
			moveRightLeft("right")
		}
	}else{
		if (distY>50){
			moveUpDown("up")
		}else if (distY<-50){
			moveUpDown("down");
		}
	}
});
start();
countBlank();
randomNumberAtRandomPosition();

