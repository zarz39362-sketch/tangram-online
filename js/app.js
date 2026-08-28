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

/* زمان شروع فعالیت */
let startTime = null;

startBtn.addEventListener("click",()=>{

const name = studentNameInput.value.trim();

if(name===""){
alert("لطفاً نام و نام خانوادگی خود را وارد کنید.");
return;
}

/* ثبت زمان شروع */
startTime = Date.now();

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

alert("🏆 تبریک! همه مراحل را با موفقیت انجام دادی.");

}

});

document.getElementById("submitBtn")
.addEventListener("click", async ()=>{

const studentName =
localStorage.getItem("studentName") || "";

/* محاسبه زمان سپری شده */
const elapsedSeconds =
Math.floor((Date.now() - startTime) / 1000);

const minutes =
Math.floor(elapsedSeconds / 60);

const seconds =
elapsedSeconds % 60;

const timeSpent =
`${minutes}:${seconds.toString().padStart(2,"0")}`;

const result = {

StudentName: studentName,

Level: levels[currentLevel].name,

TimeSpent: timeSpent,

Moves: "0",

Progress: Math.round(
((currentLevel + 1) / levels.length) * 100
)

};

try{

const response = await sendResult(result);

if(response === "success"){

alert("🌟 آفرین! پاسخ شما با موفقیت ثبت شد.");

}else{

alert("⚠️ پاسخ ارسال شد اما پاسخی غیرمنتظره دریافت شد.");

}

}catch(error){

console.error(error);

alert("❌ خطا در ارسال اطلاعات. لطفاً دوباره تلاش کنید.");

}

});

loadLevel();
