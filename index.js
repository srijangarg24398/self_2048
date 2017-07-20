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
	bgcol=['','#eee4da','#ede0c8','#f2b179','#f59563','#f67c5f','#f67c5f','#edcf72','#edcc61','#ebc846','#f2c842','#ecc400','#ff3c3e','#ff1d1f','#fe1c1e','#fe1c1e','#fd1a1c','#ff1d1f'];
	current_cell.style.backgroundColor=bgcol[Math.log(current_cell.innerHTML)/Math.log(2)];
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
	return blanks;
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
	var new_position=Math.floor(Math.random()*16);
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
function move(direction){
	var row=document.getElementsByClassName("grid-row");
	var cell=document.getElementsByClassName("grid-cell");
}
function shift(event){
	// console.log(event);
	if (event.code=='ArrowDown'){
		move("down");
	}
    if (event.code=='ArrowUp'){
		move("up")
	}
	if (event.code=='ArrowRight'){
		move("right")
	}
	if (event.code=='ArrowLeft'){
		move("left");
	}
}
document.body.addEventListener('keydown',shift);
start();
countBlank();
// randomNumberGenerator();
// randomPositionGenerator();
randomNumberAtRandomPosition();