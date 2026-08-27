const API_URL =
"https://script.google.com/macros/s/AKfycbzYElC2_rcvaZD_3dAwrDFN8gQV9G1e-lbpuXCTjSH5FBkS35kGQmedeF3yHMgeqKGd/exec";

async function sendResult(data){

try{

const response = await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

const result = await response.json();

return result;

}catch(error){

console.error(error);

throw error;

}

}