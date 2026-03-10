// ===== Upload Elements =====

const dropArea = document.getElementById("drop-area")
const input = document.getElementById("imageInput")
const preview = document.getElementById("preview")
const loading = document.getElementById("loading")

// Click upload
if(dropArea){
dropArea.addEventListener("click", () => input.click())
}

// Preview image
if(input){
input.addEventListener("change", previewImage)
}

function previewImage(){

const file = input.files[0]

if(file){

preview.src = URL.createObjectURL(file)
preview.classList.remove("hidden")

}

}

// Upload image (giả lập AI)
function uploadImage(){

if(!input.files.length){

alert("Hãy chọn ảnh trước!")
return

}

loading.classList.remove("hidden")

setTimeout(()=>{

// Fake AI result
const food = "Phở bò"
const accuracy = "92%"

// lưu history
saveHistory(food, accuracy)

// chuyển trang
window.location.href="result.html"

},2000)

}


// ===== Drag & Drop =====

if(dropArea){

dropArea.addEventListener("dragover",(e)=>{

e.preventDefault()
dropArea.classList.add("border-green-500")

})

dropArea.addEventListener("dragleave",()=>{

dropArea.classList.remove("border-green-500")

})

dropArea.addEventListener("drop",(e)=>{

e.preventDefault()

input.files = e.dataTransfer.files

previewImage()

})

}


// ===== Popup =====

function openPopup(type){

const title = document.getElementById("popupTitle")
const content = document.getElementById("popupContent")
const popup = document.getElementById("popup")

if(type==="ingredients"){

title.innerText="Nguyên liệu"

content.innerHTML=`
- Bánh phở
- Thịt bò
- Hành lá
- Gừng
- Nước dùng
`

}

if(type==="recipe"){

title.innerText="Quy trình"

content.innerHTML=`
1. Nấu nước dùng
2. Trụng bánh phở
3. Cho thịt bò
4. Chan nước dùng
`

}

if(type==="nutrition"){

title.innerText="Dinh dưỡng"

content.innerHTML=`
Calories: 350 kcal <br>
Protein: 20g <br>
Carb: 40g <br>
Fat: 8g
`

}

popup.classList.remove("hidden")

}

function closePopup(){

document.getElementById("popup").classList.add("hidden")

}


// ===== History =====

function saveHistory(food, accuracy){

let history = JSON.parse(localStorage.getItem("foodHistory")) || []

history.push({
food:food,
accuracy:accuracy
})

localStorage.setItem("foodHistory", JSON.stringify(history))

}

function loadHistory(){

let history = JSON.parse(localStorage.getItem("foodHistory")) || []

const list = document.getElementById("historyList")

if(!list) return

list.innerHTML=""

// hiển thị 5 món gần nhất
history.slice(-5).reverse().forEach(item =>{

const li = document.createElement("li")

li.className="bg-white shadow p-3 rounded-lg"

li.innerText=`🍜 ${item.food} - ${item.accuracy}`

list.appendChild(li)

})

}

// load history khi mở trang
loadHistory()