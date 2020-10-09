

var _textBox = document.getElementById("addTEXT");
var _addButton = document.getElementById("addButton");
var _orderedList = document.getElementById("orderList");

var _contentOfList = document.getElementsByClassName("contentOfList");



_addButton.addEventListener("click", addContent);

function addContent() {
  var content = document.createElement("li");
  content.innerHTML = _textBox.value;
  content.className = "contentOfList";
  content.addEventListener("click", openPrompt);
  _orderedList.appendChild(content);
  _textBox.value = "";
}

function openPrompt(event) {

  var select = prompt("삭제는1, 수정은 2를 입력하세요.","");
  if (select == null) {
    alert("취소되었습니다.");
  } else if (select == "") {
    alert("번호를 입력하지 않으셨습니다.");

  } else if (select == "1") { // 삭제 .
    event.target.remove();

  } else if (select == "2") { // 수정.

    var select2 = prompt("변경할 내용을 입력하세요","");

    var content = document.createElement("li");
    content.className = "contentOfList";
    content.innerHTML = select2;
    content.addEventListener("click", openPrompt);
    _orderedList.replaceChild(content, event.target);

  } else {
    alert("번호를 잘못 입력하셨습니다.");
  }
}
