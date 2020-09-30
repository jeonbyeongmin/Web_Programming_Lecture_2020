


/************************** GLOBAL VARIABLES ********************************/

// 버튼
let _buttonOpenForm = document.getElementById("addPruductsButton");
let _buttonCloseForm = document.getElementById("cancelButtonInForm");
let _buttonMoveToShoppingBag = document.getElementById("moveButtonShoppingBag");
let _buttonNormalSectionRemove = document.getElementById("normalSectionRemove");

// 유효성 검사
var _onlyNumber = /^[0-9]*$/; // 숫자 유효성 검사를 위한 정규식
var _onlyImage = /(.*?)\.(jpg|jpeg|png)$/; // 이미지 확장자 유효성 검사를 위한 정규식
var _onlyLetter = /\D/; // 문자 유효성 검사를 위한 정규식


// 팝업 변수들
let _productsImage = document.getElementById("productsImage");
let _productsName = document.getElementById("productsName");
let _productsPrice = document.getElementById("productsPrice");
let _productsCount = document.getElementById("productsCount");
let _howToDelivery = document.getElementsByClassName("howToDelivery");


// table 변수
let _normalDeliveryInfoTable = document.getElementById("normalDeliveryInfoTable");
let _earlyMorningDeliveryInfoTable = document.getElementById("earlyMorningDeliveryInfoTable");
let _normalContent = document.getElementsByClassName("content");
let _totalPrice = document.getElementById("totalPrice");



// check box
let _normalCheckBox = document.getElementsByClassName("normalDeliveryInfoTableCheckBox");
let _normalAllCheck = document.getElementById("normalAllCheck");





/******************************* BUTTON ***********************************/

_buttonOpenForm.addEventListener("click", openForm);
_buttonMoveToShoppingBag.addEventListener("click", moveToShoppingBag);
_buttonCloseForm.addEventListener("click", closeForm);
_buttonNormalSectionRemove.addEventListener("click", function() {
  deleteRow(_normalCheckBox, _normalDeliveryInfoTable);
  sumTotalPrice(_normalCheckBox);
  isAllCheck();
})


/****************************** CHECK BOX ************************************/

_normalAllCheck.addEventListener("click", function() {
  allCheck(_normalAllCheck, _normalCheckBox);
})





/******************************* FUNCTION ***********************************/



function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function verificationInfo() { // 주어진 정보의 유효성 검사 실시

  let isOK = true;
  // 상품 이미지 확장자 검사
  if (_productsImage.value == "") {
    alert("상품 이미지를 추가해주세요.");
    isOK = false;
  } else if (!validator(_onlyImage, _productsImage)) {
    alert("이미지 파일이 아닙니다. ‘jpg’, ‘jpeg’ 또는 ‘png’을 확장자 로 가진 파일을 추가하시오.");
    isOK = false;
  }

  // 상품 이름 검사
  if (_productsName.value == "") {
    alert("상품 이름을 입력해주세요.");
    isOK = false;
  } else if (!validator(_onlyLetter, _productsName)) {
    alert("문자만 입력하세요");
    isOK = false;
  }

  // 상품 가격 검사
  if (_productsPrice.value == "") {
    alert("상품가격을 입력해주세요.");
    isOK = false;
  } else if (!validator(_onlyNumber, _productsPrice)) {
    alert("숫자를 입력하세요.");
    isOK = false;
  } else if (_productsPrice.value < 1000) { // String --> 정수로의 자동 형변환이 되어 비교를 하게 됨.
    alert("1000원 이상으로 입력하시오.");
    isOK = false;
  }

  // 삼품 개수 검사
  if (_productsCount.value == "") {
    alert("상품개수을 입력해주세요.");
    isOK = false;
  } else if (!validator(_onlyNumber, _productsPrice)) {
    alert("숫자를 입력하세요.");
    isOK = false;
  } else if (_productsCount.value > 50 || _productsCount.value == "0") {
    alert("최대 50개 이하로 선택하시오.");
    isOK = false;
  }

  // 배송 방법 검사
  if (isCheckedRadioClass(_howToDelivery)) {
    alert("배송 방법을 선택하시오.");
    isOK = false;
  }
  return isOK;
}

function moveToShoppingBag(){
  if (verificationInfo()) { // 유효성 검사에서 isOK 라면 장바구니로 옮김
    if (_howToDelivery[0].checked == true) {

      // row
      var addRow = _normalDeliveryInfoTable.insertRow(_normalDeliveryInfoTable.rows.length);
      addRow.className += "content"; // row가 추가될 때마다 해당 row에 content라는 class 명을 붙여준다.

      // cell_1 :: checkbox :: 체크된 채로 생성
      var cell1= addRow.insertCell(0);
      let addCheckbox = document.createElement("input");
      addCheckbox.className = "normalDeliveryInfoTableCheckBox";
      addCheckbox.type = "checkbox";
      addCheckbox.checked = true;
      addCheckbox.addEventListener('click', function() {
        sumTotalPrice(_normalCheckBox);
        isAllCheck();
      })
      cell1.appendChild(addCheckbox);


      // cell_2 :: 상품 이미지
      var cell2 = addRow.insertCell(1);
      cell2.innerHTML = "<img class='photo' src='" + _productsImage.files[0].name + "'>";


      // cell_3 :: 상품 이름
      var cell3 = addRow.insertCell(2);
      cell3.innerHTML = _productsName.value;

      // cell_4 :: 상품 개별 가격
      var cell4 = addRow.insertCell(3);
      cell4.innerHTML = _productsPrice.value;

      // cell_5 :: 상품 개수
      var cell5 = addRow.insertCell(4);
      cell5.innerHTML = _productsCount.value;

      // cell_6 :: 삼품 구매 가격
      var cell6 = addRow.insertCell(5);
      cell6.innerHTML = parseInt(_productsPrice.value) * parseInt(_productsCount.value);
      cell6.className = "allProductsPrice"

      // 전체선택 체크
      isAllCheck();
      sumTotalPrice(_normalCheckBox);
      closeForm();


    } else if (_howToDelivery[1].checked == true) {

    }
  }
}

function validator(validate, target) { // 유효성 검사기
  if(validate.test(target.value)) {
      return true;
  }
  target.value = "";
  target.focus();
  return false;
}

function isCheckedRadioClass(target) { // radio가 체크되어 있는지 판단하는 함수.
  for (var i = 0; i < target.length; i++) {
    if (target[i].checked == true) {
      return false;
    }
  }
  return true;
}


// 전체선택이 되어있는지 확인하고 전체 체크하거나 해제하는 함수
function isAllCheck() {
  let count = 0;
  for (var i = 0; i < _normalCheckBox.length; i++) {
    if (_normalCheckBox[i].checked == true) {
      count++;
    }
  }
  if (count == _normalContent.length) {
    _normalAllCheck.checked = true;
  } else {
    _normalAllCheck.checked = false;
  }
}

//전체선택을 누르면 해당영역의 모든 체크박스가 해제되는 함수
function allCheck(whatTypeAllCheck, whatTypeCheckBox) {

  if (whatTypeAllCheck.checked == false) {
    for (var i = 0; i < _normalContent.length; i++) {
      if (whatTypeCheckBox[i].checked == true) {
        whatTypeCheckBox[i].checked = false;
      }
    }
  } else { // 체크안되어 있을 때.
    for (var i = 0; i < _normalContent.length; i++) {
      if (whatTypeCheckBox[i].checked == false) {
        whatTypeCheckBox[i].checked = true;
      }
    }
  }
  sumTotalPrice(whatTypeCheckBox);
}


// 총 가격을 계산해서 표시해주는 함수
function sumTotalPrice(whatTypeCheckBox) {
  let total = 0;
  for (var i = 0; i < _normalContent.length; i++) {
    if (whatTypeCheckBox[i].checked == true) {
      total += parseInt(_normalContent[i].lastElementChild.innerText);
    }
  }
  _totalPrice.innerHTML = total;
}


// 체크된 content가 포함된 줄을 제거하는 함수
function deleteRow(whatTypeCheckBox, whatTypeTable){
  for (var i = 0; i < _normalContent.length;) {
    if (whatTypeCheckBox[i].checked == true) {
      whatTypeTable.deleteRow(i);
    } else {
       i++;
    }
  }
}
