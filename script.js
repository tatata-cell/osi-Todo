// ページ切り替え
const settingsPage = document.getElementById("settingsPage");
const toDoPage = document.getElementById("toDoPage");
const toDoPageBtn = document.getElementById("toDoPageBtn");
const backToSettingsBtn = document.getElementById("backToSettingsBtn");

toDoPageBtn.addEventListener("click", () => {
  settingsPage.style.display = "none";
  toDoPage.style.display = "block";
});

backToSettingsBtn.addEventListener("click", () => {
  toDoPage.style.display = "none";
  settingsPage.style.display = "block";
});

// キャラ画像設定
let charImageSrc = null;
document.getElementById("charImageInput").addEventListener("change", function(){
  const file = this.files[0];
  if(file){
    charImageSrc = URL.createObjectURL(file);
  }
});

// 褒め言葉
const praises = [
  "今日も推し活楽しもう！",
  "推しへの愛がすごい！",
  "すごい！その調子！",
  "お疲れ様！休憩も忘れずに",
  "推し活の天才だ！"
];
let praiseIndex = 0;

// タスク追加
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if(taskText === "") return;

  const li = document.createElement("li");

  let bubbleClass = charImageSrc ? "bubble hasImage" : "bubble";

  li.innerHTML = `
    ${charImageSrc ? `<img src="${charImageSrc}">` : ""}
    <div class="${bubbleClass}">${taskText}<br>${praises[praiseIndex]}</div>
    <button class="completeBtn">完了</button>
  `;

  taskList.appendChild(li);
  taskInput.value = "";

  // 褒め言葉順番
  if(praiseIndex === 0){
    praiseIndex++;
  } else {
    praiseIndex = (praiseIndex + 1) % praises.length;
  }
});

// 完了ボタンで消す
taskList.addEventListener("click", (e) => {
  if(e.target.classList.contains("completeBtn")){
    e.target.parentElement.remove();
  }
});