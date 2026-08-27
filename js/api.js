const API_URL =
"https://script.google.com/macros/s/AKfycbzYElC2_rcvaZD_3dAwrDFN8gQV9G1e-lbpuXCTjSH5FBkS35kGQmedeF3yHMgeqKGd/exec";

async function sendResult(data){

const formData = new FormData();

for(const key in data){
formData.append(key,data[key]);
}

try{

const response = await fetch(API_URL,{
method:"POST",
body:formData
});

const result = await response.text();

return result;

}catch(error){

console.error(error);
throw error;

}

}
