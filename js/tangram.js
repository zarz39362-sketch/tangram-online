const pieces = document.querySelectorAll(".piece");

pieces.forEach(piece => {

let isDragging = false;

let offsetX = 0;
let offsetY = 0;

let rotation = 0;

/* جابجایی */

piece.addEventListener("mousedown", startDrag);
piece.addEventListener("touchstart", startDrag,{passive:false});

function startDrag(e){

e.preventDefault();

isDragging = true;

const point = e.touches ? e.touches[0] : e;

const rect = piece.getBoundingClientRect();

offsetX = point.clientX - rect.left;
offsetY = point.clientY - rect.top;

document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

document.addEventListener("touchmove", drag,{passive:false});
document.addEventListener("touchend", stopDrag);

piece.style.zIndex = 999;

}

function drag(e){

if(!isDragging) return;

e.preventDefault();

const board = document.getElementById("board");

const boardRect = board.getBoundingClientRect();

const point = e.touches ? e.touches[0] : e;

let x = point.clientX - boardRect.left - offsetX;
let y = point.clientY - boardRect.top - offsetY;

piece.style.left = x + "px";
piece.style.top = y + "px";

}

function stopDrag(){

isDragging = false;

document.removeEventListener("mousemove", drag);
document.removeEventListener("mouseup", stopDrag);

document.removeEventListener("touchmove", drag);
document.removeEventListener("touchend", stopDrag);

}

/* چرخش */

piece.addEventListener("click",()=>{

alert("چرخش تست");

});

piece.style.transform =
`rotate(${rotation}deg)`;

});

});
