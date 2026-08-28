const pieces = document.querySelectorAll(".piece");

let selectedPiece = null;

pieces.forEach(piece => {

let isDragging = false;

let offsetX = 0;
let offsetY = 0;

let rotation = 0;

piece.dataset.rotation = 0;

piece.addEventListener("click",()=>{

selectedPiece = piece;

});

piece.addEventListener("mousedown", startDrag);
piece.addEventListener("touchstart", startDrag,{passive:false});

function startDrag(e){

e.preventDefault();

selectedPiece = piece;

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

});

document
.getElementById("rotateBtn")
.addEventListener("click",()=>{

if(!selectedPiece){

alert("ابتدا یک قطعه را انتخاب کنید.");

return;

}

let rotation =
parseInt(selectedPiece.dataset.rotation);

rotation += 45;

selectedPiece.dataset.rotation = rotation;

if(selectedPiece.classList.contains("parallelogram")){

selectedPiece.style.transform =
`rotate(${rotation}deg) skew(-25deg)`;

}else if(selectedPiece.classList.contains("square-piece")){

selectedPiece.style.transform =
`rotate(${rotation + 45}deg)`;

}else{

selectedPiece.style.transform =
`rotate(${rotation}deg)`;

}
});
