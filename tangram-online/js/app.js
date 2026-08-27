const startBtn = document.getElementById("startBtn");

const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");

const studentNameInput = document.getElementById("studentName");

const levels = [
{
title:"مرحله اول",
name:"🏠 خانه",
image:"assets/house.svg"
},
{
title:"مرحله دوم",
name:"⛵ قایق",
image:"assets/boat.svg"
},
{
title:"مرحله سوم",
name:"🐱 گربه",
image:"assets/cat.svg"
}
];

let currentLevel = 0;

startBtn.addEventListener("click",()=>{

const name = studentNameInput.value.trim();

if(name===""){
alert("لطفاً نام و نام خانوادگی خود را وارد کنید");
return;
}

localStorage.setItem("studentName",name);

loginPage.classList.add("hidden");
gamePage.classList.remove("hidden");

loadLevel();

});

function loadLevel(){

document.getElementById("stageTitle").textContent =
levels[currentLevel].title;

document.getElementById("stageName").textContent =
levels[currentLevel].name;

document.getElementById("targetShape").innerHTML =
`
<img
src="${levels[currentLevel].image}"
style="
max-width:90%;
max-height:220px;
object-fit:contain;
opacity:.35;
">
`;

}

document.getElementById("nextBtn")
.addEventListener("click",()=>{

if(currentLevel < levels.length - 1){

currentLevel++;

loadLevel();

}else{

alert("فعالیت به پایان رسید 🎉");

}

});

document.getElementById("submitBtn")
.addEventListener("click", async ()=>{

const studentName =
localStorage.getItem("studentName") || "";

const result = {

StudentName: studentName,

Level: levels[currentLevel].name,

TimeSpent: "0",

Moves: "0",

Progress: Math.round(
((currentLevel + 1) / levels.length) * 100
)

};

try{

const response = await sendResult(result);

console.log(response);

alert(JSON.stringify(response));

}catch(error){

console.error(error);

alert(error);

}

});

loadLevel();