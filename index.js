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
	// console.log(blanks);
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
	console.log(new_number);
	return new_number;
}
function randomPositionGenerator(){
	blanks=countBlank();
	var new_position=blanks[Math.floor(Math.random()*blanks.length)];
	console.log(new_position);
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
		// var i=end;
		while (end>=start){
			if (cell[start].innerHTML=="")
			{
				start++;
			}
			else if (cell[end].innerHTML!=""){
				end--;
			}
			else{
				// var temp=cell[end].innerHTML;
				// cell[end].innerHTML=cell[start].innerHTML;
				// cell[start].innerHTML=temp;
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
				// console.log(new_val)
				newscore= parseInt(oldscore)+parseInt(new_val);
				hohoscore.innerHTML=newscore;
				cell[end].innerHTML=new_val
				cell[end-1].innerHTML=""
				colorBackground(cell[end]);
				colorBackground(cell[end-1]);
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
				// console.log(new_val)
				newscore= parseInt(oldscore)+parseInt(new_val);
				hohoscore.innerHTML=newscore;
				cell[end].innerHTML=new_val
				cell[end+1].innerHTML=""
				colorBackground(cell[end]);
				colorBackground(cell[end+1]);
			}
			else{
				end++;
			}
		}
	}
	
}
function moveRightLeft(direction){
	var row=document.getElementsByClassName("grid-row");
	var cell=document.getElementsByClassName("grid-cell");
	for (var current_row_no=0;current_row_no<4;current_row_no++)
	{
		blanks_in_row=findBlanksInRow(current_row_no);
		if (blanks_in_row.length>0){
			moveBlanksToOppositeDirection(direction,current_row_no);
		}
		mergeTwoSameOnes(direction,current_row_no);
		// moveBlanksToOppositeDirection(direction,current_row_no);
		blanks_in_row=findBlanksInRow(current_row_no);
		if (blanks_in_row.length>0){
			moveBlanksToOppositeDirection(direction,current_row_no);
		}
		
	}
	randomNumberAtRandomPosition();
}



function moveUpDown(direction){
	var row=document.getElementsByClassName("grid-row");
	var cell=document.getElementsByClassName("grid-cell");
	for (var current_column_no=0;current_column_no<4;current_column_no++)
	{
		blanks_in_column=findBlanksInColumn(current_column_no);
		console.log(blanks_in_column);
		if (blanks_in_column.length>0){
			moveBlanksToOppositeDirection(direction,current_column_no);
		}
		mergeTwoSameOnes(direction,current_column_no);
		blanks_in_column=findBlanksInColumn(current_column_no);
		if (blanks_in_column.length>0){
			moveBlanksToOppositeDirection(direction,current_column_no);
		}
		
	}
	randomNumberAtRandomPosition();
}
function shift(event){
	// console.log(event);
	if (event.code=='ArrowDown'){
		moveUpDown("down");
	}
    if (event.code=='ArrowUp'){
		moveUpDown("up")
	}
	if (event.code=='ArrowRight'){
		moveRightLeft("right")
	}
	if (event.code=='ArrowLeft'){
		moveRightLeft("left");
	}
}
document.body.addEventListener('keydown',shift);
start();
countBlank();
// randomNumberGenerator();
// randomPositionGenerator();
randomNumberAtRandomPosition();

