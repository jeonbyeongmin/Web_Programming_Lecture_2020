


/************************** GLOBAL VARIABLES ********************************/

// 팝업창 버튼
let _buttonOpenForm = document.getElementById("addPruductsButton");
let _buttonCloseForm = document.getElementById("cancelButtonInForm");
let _buttonMoveToShoppingBag = document.getElementById("moveButtonShoppingBag");
// 삭제 버튼
let _buttonNormalSectionRemove = document.getElementById("normalSectionRemove");
let _buttonEalryMorningSectionRemove = document.getElementById("earlyMorningSectionRemove");
// 이동 버튼
let _buttonMoveToMorningDelivery = document.getElementById("moveToMorningDelivery");
let _buttonMoveToNormalDelivery = document.getElementById("moveToNormalDelivery");
// 검색버튼
let _buttonSearchProducts = document.getElementById("searchProducts");
let _buttonBackToNormal = document.getElementById("backToNormal");
// 검색 텍스트 박스
let _textBoxInputProductsName = document.getElementById("inputProductsName");
let _textBoxInputMinPrice = document.getElementById("inputMinPrice");
let _textBoxInputMaxPrice = document.getElementById("inputMaxPrice");

// 유효성 검사
var _onlyNumber = /^[0-9]*$/; // 숫자 유효성 검사를 위한 정규식
var _onlyImage = /(.*?)\.(jpg|jpeg|png)$/; // 이미지 확장자 유효성 검사를 위한 정규식
var _onlyLetter = /^[^0-9]*$/; // 문자 유효성 검사를 위한 정규식


// 팝업 변수들
let _productsImage = document.getElementById("productsImage");
let _productsName = document.getElementById("productsName");
let _productsPrice = document.getElementById("productsPrice");
let _productsCount = document.getElementById("productsCount");
let _howToDelivery = document.getElementsByClassName("howToDelivery");


// table 변수
let _normalDeliveryInfoTable = document.getElementById("normalDeliveryInfoTable");
let _earlyMorningDeliveryInfoTable = document.getElementById("earlyMorningDeliveryInfoTable");

let _normalContent = document.getElementsByClassName("normalContent");
let _earlyMorningContent = document.getElementsByClassName("earlyMorningContent");

let _normalTotalPrice = document.getElementById("normalTotalPrice");
let _earlyMorningTotalPrice = document.getElementById("earlyMorningTotalPrice");



// check box
let _normalCheckBox = document.getElementsByClassName("normalDeliveryInfoTableCheckBox");
let _normalAllCheck = document.getElementById("normalAllCheck");

let _earlyMorningCheckBox = document.getElementsByClassName("earlyMorningDeliveryInfoTableCheckBox");
let _earlyMorningAllCheck = document.getElementById("earlyMorningAllCheck");





/**************************** BUTTON CLICK ********************************/

_buttonOpenForm.addEventListener("click", openForm);
_buttonMoveToShoppingBag.addEventListener("click", moveToShoppingBag);
_buttonCloseForm.addEventListener("click", closeForm);

_buttonNormalSectionRemove.addEventListener("click", function() {
  deleteRow(_normalCheckBox, _normalDeliveryInfoTable, _normalContent);
  sumTotalPrice(_normalCheckBox, _normalContent, _normalTotalPrice);
  isAllCheck(_normalCheckBox, _normalAllCheck);
});

_buttonEalryMorningSectionRemove.addEventListener("click", function() {
  deleteRow(_earlyMorningCheckBox, _earlyMorningDeliveryInfoTable, _earlyMorningContent);
  sumTotalPrice(_earlyMorningCheckBox, _earlyMorningContent, _earlyMorningTotalPrice);
  isAllCheck(_earlyMorningCheckBox, _earlyMorningAllCheck);
});

_buttonMoveToMorningDelivery.addEventListener("click", function() { // 새벽 배송으로 이동
  moveToNormalDelivery();
  isAllCheck(_normalCheckBox, _normalAllCheck);
  sumTotalPrice(_normalCheckBox, _normalContent, _normalTotalPrice);
});

_buttonMoveToNormalDelivery.addEventListener("click", function() { // 일반배송으로 이동
  moveToMorningDelivery();
  sumTotalPrice(_earlyMorningCheckBox, _earlyMorningContent, _earlyMorningTotalPrice);
  isAllCheck(_earlyMorningCheckBox, _earlyMorningAllCheck);
});

_buttonSearchProducts.addEventListener("click", searchProducts);
_buttonBackToNormal.addEventListener("click", backToNormal);

/*************************** CHECKBOX CLICK *********************************/

_normalAllCheck.addEventListener("click", function() {
  allCheck(_normalAllCheck, _normalCheckBox, _normalContent, _normalTotalPrice);
})

_earlyMorningAllCheck.addEventListener("click", function() {
  allCheck(_earlyMorningAllCheck, _earlyMorningCheckBox, _earlyMorningContent, _earlyMorningTotalPrice);
})




/******************************* FUNCTION ***********************************/

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  _productsImage.value = "";
  _productsName.value = "";
  _productsPrice.value = "";
  _productsCount.value = "";
  _howToDelivery[0].checked = false;
  _howToDelivery[1].checked = false;
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
    alert("문자로 된 상품 이름을 입력하세요");
    isOK = false;
  }

  // 상품 가격 검사
  if (_productsPrice.value == "") {
    alert("상품가격을 입력해주세요.");
    isOK = false;
  } else if (!validator(_onlyNumber, _productsPrice)) {
    alert("상품가격에 숫자를 입력하세요.");
    isOK = false;
  } else if (_productsPrice.value < 1000) { // String --> 정수로의 자동 형변환이 되어 비교를 하게 됨.
    alert("상품가격을 1000원 이상으로 입력하시오.");
    _productsPrice.value = "";
    isOK = false;
  }

  // 삼품 개수 검사
  if (_productsCount.value == "") {
    alert("상품개수을 입력해주세요.");
    isOK = false;
  } else if (!validator(_onlyNumber, _productsCount)) {
    alert("상품개수에 숫자를 입력하세요.");
    isOK = false;
  } else if (_productsCount.value > 50 || _productsCount.value <= 0) {
    alert("최소 1개에서 최대 50개 이하로 선택하시오.");
    _productsCount.value = "";
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
      addRow.className += "normalContent"; // row가 추가될 때마다 해당 row에 content라는 class 명을 붙여준다.

      // cell_1 :: checkbox :: 체크된 채로 생성
      var cell1= addRow.insertCell(0);
      let addCheckbox = document.createElement("input");
      addCheckbox.className = "normalDeliveryInfoTableCheckBox";
      addCheckbox.type = "checkbox";
      addCheckbox.checked = true;
      addCheckbox.addEventListener('click', function() {
        sumTotalPrice(_normalCheckBox, _normalContent, _normalTotalPrice);
        isAllCheck(_normalCheckBox, _normalAllCheck);
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
      cell6.innerHTML = parseInt(cell4.innerText) * parseInt(cell5.innerText);

      // 입력받은 값들 초기화
      _productsImage.value = "";
      _productsName.value = "";
      _productsPrice.value = "";
      _productsCount.value = "";
      _howToDelivery[0].checked = false;

      // 전체선택 체크
      isAllCheck(_normalCheckBox, _normalAllCheck);
      sumTotalPrice(_normalCheckBox, _normalContent, _normalTotalPrice);
      closeForm();

    } else if (_howToDelivery[1].checked == true) {



      // row
      var addRow = _earlyMorningDeliveryInfoTable.insertRow(_earlyMorningDeliveryInfoTable.rows.length);
      addRow.className += "earlyMorningContent"; // row가 추가될 때마다 해당 row에 content라는 class 명을 붙여준다.

      // cell_1 :: checkbox :: 체크된 채로 생성
      var cell1= addRow.insertCell(0);
      let addCheckbox = document.createElement("input");
      addCheckbox.className = "earlyMorningDeliveryInfoTableCheckBox";
      addCheckbox.type = "checkbox";
      addCheckbox.checked = true;
      addCheckbox.addEventListener('click', function() {
        sumTotalPrice(_earlyMorningCheckBox, _earlyMorningContent, _earlyMorningTotalPrice);
        isAllCheck(_earlyMorningCheckBox, _earlyMorningAllCheck);
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

      _productsImage.value = "";
      _productsName.value = "";
      _productsPrice.value = "";
      _productsCount.value = "";
      _howToDelivery[1].checked = false;

      // 전체선택 체크
      sumTotalPrice(_earlyMorningCheckBox, _earlyMorningContent, _earlyMorningTotalPrice);
      isAllCheck(_earlyMorningCheckBox, _earlyMorningAllCheck);
      closeForm();

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
function isAllCheck(whatTypeCheckBox, whatTypeAllCheck) {
  let count = 0;
  for (var i = 0; i < whatTypeCheckBox.length; i++) {
    if (whatTypeCheckBox[i].checked == true) {
      count++;
    }
  }
  if (count == whatTypeCheckBox.length) {
    whatTypeAllCheck.checked = true;
  } else {
    whatTypeAllCheck.checked = false;
  }
  if (count == 0) { // 콘텐츠가 없으면 전체선택 해제
    whatTypeAllCheck.checked = false;
  }
}

//전체선택을 누르면 해당영역의 모든 체크박스가 해제되는 함수
function allCheck(whatTypeAllCheck, whatTypeCheckBox, whatContent, whatTypePrice) {

  if (whatTypeAllCheck.checked == false) {
    for (var i = 0; i < whatContent.length; i++) {
      if (whatTypeCheckBox[i].checked == true) {
        whatTypeCheckBox[i].checked = false;
      }
    }
  } else { // 체크안되어 있을 때.
    for (var i = 0; i < whatContent.length; i++) {
      if (whatTypeCheckBox[i].checked == false) {
        whatTypeCheckBox[i].checked = true;
      }
    }
  }
  sumTotalPrice(whatTypeCheckBox, whatContent, whatTypePrice);
}


// 총 가격을 계산해서 표시해주는 함수
function sumTotalPrice(whatTypeCheckBox, whatContent, whatTypePrice) {
  let total = 0;
  for (var i = 0; i < whatContent.length; i++) {
    if (whatTypeCheckBox[i].checked == true) {
      total += parseInt(whatContent[i].lastElementChild.innerText);
    }
  }
  whatTypePrice.innerHTML = total;
}


// 체크된 content가 포함된 줄을 제거하는 함수
function deleteRow(whatTypeCheckBox, whatTypeTable, whatContent){
  for (var i = 0; i < whatContent.length;) {
    if (whatTypeCheckBox[i].checked == true) {
      whatTypeTable.deleteRow(i);
    } else {
       i++;
    }
  }
}

// 콘텐츠를 새벽배송에서 일반배송으로 이동시키는 함수
function moveToNormalDelivery() {
  for (var i = 0; i < _normalContent.length;) {
    if (_normalCheckBox[i].checked == true) {
      // row
      var addRow = _earlyMorningDeliveryInfoTable.insertRow(_earlyMorningDeliveryInfoTable.rows.length);
      addRow.className += "earlyMorningContent"; // row가 추가될 때마다 해당 row에 content라는 class 명을 붙여준다.

      // cell_1 :: checkbox :: 체크된 채로 생성
      var cell1= addRow.insertCell(0);
      let addCheckbox = document.createElement("input");
      addCheckbox.className = "earlyMorningDeliveryInfoTableCheckBox";
      addCheckbox.type = "checkbox";
      addCheckbox.checked = true;
      addCheckbox.addEventListener('click', function() {
        sumTotalPrice(_earlyMorningCheckBox, _earlyMorningContent, _earlyMorningTotalPrice);
        isAllCheck(_earlyMorningCheckBox, _earlyMorningAllCheck);
      })
      cell1.appendChild(addCheckbox);


      // cell_2 :: 상품 이미지
      var cell2 = addRow.insertCell(1);
      cell2.innerHTML = _normalContent[i].children[1].innerHTML;

      // cell_3 :: 상품 이름
      var cell3 = addRow.insertCell(2);
      cell3.innerHTML = _normalContent[i].children[2].innerText;

      // cell_4 :: 상품 개별 가격
      var cell4 = addRow.insertCell(3);
      cell4.innerHTML = _normalContent[i].children[3].innerText;

      // cell_5 :: 상품 개수
      var cell5 = addRow.insertCell(4);
      cell5.innerHTML = _normalContent[i].children[4].innerText;

      // cell_6 :: 삼품 구매 가격
      var cell6 = addRow.insertCell(5);
      cell6.innerHTML = parseInt(cell4.innerText) * parseInt(cell5.innerText);

      // 전체선택 체크
      sumTotalPrice(_earlyMorningCheckBox, _earlyMorningContent, _earlyMorningTotalPrice);
      isAllCheck(_earlyMorningCheckBox, _earlyMorningAllCheck);

      _normalDeliveryInfoTable.deleteRow(i);
    } else {
      i++;
    }
  }
}

// 콘텐츠를 일반배송에서 새벽배송으로 이동시키는 함수
function moveToMorningDelivery() {
  for (var i = 0; i < _earlyMorningContent.length;) {
    if (_earlyMorningCheckBox[i].checked == true) {
      // row
      var addRow = _normalDeliveryInfoTable.insertRow(_normalDeliveryInfoTable.rows.length);
      addRow.className += "normalContent"; // row가 추가될 때마다 해당 row에 content라는 class 명을 붙여준다.

      // cell_1 :: checkbox :: 체크된 채로 생성
      var cell1= addRow.insertCell(0);
      let addCheckbox = document.createElement("input");
      addCheckbox.className = "normalDeliveryInfoTableCheckBox";
      addCheckbox.type = "checkbox";
      addCheckbox.checked = true;
      addCheckbox.addEventListener('click', function() {
        isAllCheck(_normalCheckBox, _normalAllCheck);
        sumTotalPrice(_normalCheckBox, _normalContent, _normalTotalPrice);
      })
      cell1.appendChild(addCheckbox);


      // cell_2 :: 상품 이미지
      var cell2 = addRow.insertCell(1);
      cell2.innerHTML = _earlyMorningContent[i].children[1].innerHTML;

      // cell_3 :: 상품 이름
      var cell3 = addRow.insertCell(2);
      cell3.innerHTML = _earlyMorningContent[i].children[2].innerText;

      // cell_4 :: 상품 개별 가격
      var cell4 = addRow.insertCell(3);
      cell4.innerHTML = _earlyMorningContent[i].children[3].innerText;

      // cell_5 :: 상품 개수
      var cell5 = addRow.insertCell(4);
      cell5.innerHTML = _earlyMorningContent[i].children[4].innerText;

      // cell_6 :: 삼품 구매 가격
      var cell6 = addRow.insertCell(5);
      cell6.innerHTML = parseInt(cell4.innerText) * parseInt(cell5.innerText);

      // 전체선택 체크
      isAllCheck(_normalCheckBox, _normalAllCheck);
      sumTotalPrice(_normalCheckBox, _normalContent, _normalTotalPrice);

      _earlyMorningDeliveryInfoTable.deleteRow(i);
    } else {
      i++;
    }
  }
}


// 검색하여 해당 조건을 만족하는 콘텐츠의 style을 바꾸는 함수
function searchProducts() {
  for (var i = 0; i < _normalContent.length; i++) {

    if (_textBoxInputProductsName.value == "" && _textBoxInputMinPrice.value == "" && _textBoxInputMaxPrice.value == "") { // 세가 다 빈칸
      break;
    }
    if (_normalContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && _textBoxInputMinPrice.value == "" && _textBoxInputMaxPrice.value == "") { // 이름만 입력했을 때.

      _normalContent[i].children[2].style.color = 'red';
      _normalContent[i].children[3].style.color = 'red';
      _normalContent[i].children[4].style.color = 'red';
      _normalContent[i].children[5].style.color = 'red';

      _normalContent[i].children[2].style.fontSize = '20px';
      _normalContent[i].children[3].style.fontSize = '20px';
      _normalContent[i].children[4].style.fontSize = '20px';
      _normalContent[i].children[5].style.fontSize = '20px';

      _normalContent[i].children[2].style.fontWeight = '600';
      _normalContent[i].children[3].style.fontWeight = '600';
      _normalContent[i].children[4].style.fontWeight = '600';
      _normalContent[i].children[5].style.fontWeight = '600';

    } else if (_normalContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && parseInt(_textBoxInputMinPrice.value) <= parseInt(_normalContent[i].children[3].innerText) && _textBoxInputMaxPrice.value == "") { // 최소값만 입력했을 때.

      _normalContent[i].children[2].style.color = 'red';
      _normalContent[i].children[3].style.color = 'red';
      _normalContent[i].children[4].style.color = 'red';
      _normalContent[i].children[5].style.color = 'red';

      _normalContent[i].children[2].style.fontSize = '20px';
      _normalContent[i].children[3].style.fontSize = '20px';
      _normalContent[i].children[4].style.fontSize = '20px';
      _normalContent[i].children[5].style.fontSize = '20px';

      _normalContent[i].children[2].style.fontWeight = '600';
      _normalContent[i].children[3].style.fontWeight = '600';
      _normalContent[i].children[4].style.fontWeight = '600';
      _normalContent[i].children[5].style.fontWeight = '600';

    } else if (_normalContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && _textBoxInputMinPrice.value == "" && parseInt(_textBoxInputMaxPrice.value) >= parseInt(_normalContent[i].children[3].innerText)) { //최대값만 입력했을 때

      _normalContent[i].children[2].style.color = 'red';
      _normalContent[i].children[3].style.color = 'red';
      _normalContent[i].children[4].style.color = 'red';
      _normalContent[i].children[5].style.color = 'red';

      _normalContent[i].children[2].style.fontSize = '20px';
      _normalContent[i].children[3].style.fontSize = '20px';
      _normalContent[i].children[4].style.fontSize = '20px';
      _normalContent[i].children[5].style.fontSize = '20px';

      _normalContent[i].children[2].style.fontWeight = '600';
      _normalContent[i].children[3].style.fontWeight = '600';
      _normalContent[i].children[4].style.fontWeight = '600';
      _normalContent[i].children[5].style.fontWeight = '600';

    } else if (_normalContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && parseInt(_textBoxInputMinPrice.value) <= parseInt(_normalContent[i].children[3].innerText) && parseInt(_textBoxInputMaxPrice.value) >= parseInt(_normalContent[i].children[3].innerText)) { // 세개다 입력했을 때

      _normalContent[i].children[2].style.color = 'red';
      _normalContent[i].children[3].style.color = 'red';
      _normalContent[i].children[4].style.color = 'red';
      _normalContent[i].children[5].style.color = 'red';

      _normalContent[i].children[2].style.fontSize = '20px';
      _normalContent[i].children[3].style.fontSize = '20px';
      _normalContent[i].children[4].style.fontSize = '20px';
      _normalContent[i].children[5].style.fontSize = '20px';

      _normalContent[i].children[2].style.fontWeight = '600';
      _normalContent[i].children[3].style.fontWeight = '600';
      _normalContent[i].children[4].style.fontWeight = '600';
      _normalContent[i].children[5].style.fontWeight = '600';
    }
  }


  for (var i = 0; i < _earlyMorningContent.length; i++) {

    if (_textBoxInputProductsName.value == "" && _textBoxInputMinPrice.value == "" && _textBoxInputMaxPrice.value == "") { // 세개 다 빈칸
      break;
    }

    if (_earlyMorningContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && _textBoxInputMinPrice.value == "" && _textBoxInputMaxPrice.value == "") { // 이름만 입력

      _earlyMorningContent[i].children[2].style.color = 'red';
      _earlyMorningContent[i].children[3].style.color = 'red';
      _earlyMorningContent[i].children[4].style.color = 'red';
      _earlyMorningContent[i].children[5].style.color = 'red';

      _earlyMorningContent[i].children[2].style.fontSize = '20px';
      _earlyMorningContent[i].children[3].style.fontSize = '20px';
      _earlyMorningContent[i].children[4].style.fontSize = '20px';
      _earlyMorningContent[i].children[5].style.fontSize = '20px';

      _earlyMorningContent[i].children[2].style.fontWeight = '600';
      _earlyMorningContent[i].children[3].style.fontWeight = '600';
      _earlyMorningContent[i].children[4].style.fontWeight = '600';
      _earlyMorningContent[i].children[5].style.fontWeight = '600';

    } else if (_earlyMorningContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && parseInt(_textBoxInputMinPrice.value) <= parseInt(_earlyMorningContent[i].children[3].innerText) && _textBoxInputMaxPrice.value == "") { // 최소값만 입력했을 때.

      _earlyMorningContent[i].children[2].style.color = 'red';
      _earlyMorningContent[i].children[3].style.color = 'red';
      _earlyMorningContent[i].children[4].style.color = 'red';
      _earlyMorningContent[i].children[5].style.color = 'red';

      _earlyMorningContent[i].children[2].style.fontSize = '20px';
      _earlyMorningContent[i].children[3].style.fontSize = '20px';
      _earlyMorningContent[i].children[4].style.fontSize = '20px';
      _earlyMorningContent[i].children[5].style.fontSize = '20px';

      _earlyMorningContent[i].children[2].style.fontWeight = '600';
      _earlyMorningContent[i].children[3].style.fontWeight = '600';
      _earlyMorningContent[i].children[4].style.fontWeight = '600';
      _earlyMorningContent[i].children[5].style.fontWeight = '600';

    } else if (_earlyMorningContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && _textBoxInputMinPrice.value == "" && parseInt(_textBoxInputMaxPrice.value) >= parseInt(_earlyMorningContent[i].children[3].innerText)) { //최대값만 입력했을 때

      _earlyMorningContent[i].children[2].style.color = 'red';
      _earlyMorningContent[i].children[3].style.color = 'red';
      _earlyMorningContent[i].children[4].style.color = 'red';
      _earlyMorningContent[i].children[5].style.color = 'red';

      _earlyMorningContent[i].children[2].style.fontSize = '20px';
      _earlyMorningContent[i].children[3].style.fontSize = '20px';
      _earlyMorningContent[i].children[4].style.fontSize = '20px';
      _earlyMorningContent[i].children[5].style.fontSize = '20px';

      _earlyMorningContent[i].children[2].style.fontWeight = '600';
      _earlyMorningContent[i].children[3].style.fontWeight = '600';
      _earlyMorningContent[i].children[4].style.fontWeight = '600';
      _earlyMorningContent[i].children[5].style.fontWeight = '600';

    } else if (_earlyMorningContent[i].children[2].innerText.includes(_textBoxInputProductsName.value) && parseInt(_textBoxInputMinPrice.value) <= parseInt(_earlyMorningContent[i].children[3].innerText) && parseInt(_textBoxInputMaxPrice.value) >= parseInt(_earlyMorningContent[i].children[3].innerText)) { // 세개다 입력했을 때

      _earlyMorningContent[i].children[2].style.color = 'red';
      _earlyMorningContent[i].children[3].style.color = 'red';
      _earlyMorningContent[i].children[4].style.color = 'red';
      _earlyMorningContent[i].children[5].style.color = 'red';

      _earlyMorningContent[i].children[2].style.fontSize = '20px';
      _earlyMorningContent[i].children[3].style.fontSize = '20px';
      _earlyMorningContent[i].children[4].style.fontSize = '20px';
      _earlyMorningContent[i].children[5].style.fontSize = '20px';

      _earlyMorningContent[i].children[2].style.fontWeight = '600';
      _earlyMorningContent[i].children[3].style.fontWeight = '600';
      _earlyMorningContent[i].children[4].style.fontWeight = '600';
      _earlyMorningContent[i].children[5].style.fontWeight = '600';
    }
  }
}


// 검색하여 바꾼 스타일을 다시 되돌리는 함수 (모두 default값으로 초기값)
function backToNormal() {
  for (var i = 0; i < _normalContent.length; i++) {
    _normalContent[i].children[2].style.removeProperty('color');
    _normalContent[i].children[3].style.removeProperty('color');
    _normalContent[i].children[4].style.removeProperty('color');
    _normalContent[i].children[5].style.removeProperty('color');

    _normalContent[i].children[2].style.removeProperty('font-size');
    _normalContent[i].children[3].style.removeProperty('font-size');
    _normalContent[i].children[4].style.removeProperty('font-size');
    _normalContent[i].children[5].style.removeProperty('font-size');

    _normalContent[i].children[2].style.removeProperty('font-weight');
    _normalContent[i].children[3].style.removeProperty('font-weight');
    _normalContent[i].children[4].style.removeProperty('font-weight');
    _normalContent[i].children[5].style.removeProperty('font-weight');

  }
  for (var i = 0; i < _earlyMorningContent.length; i++) {
    _earlyMorningContent[i].children[2].style.removeProperty('color');
    _earlyMorningContent[i].children[3].style.removeProperty('color');
    _earlyMorningContent[i].children[4].style.removeProperty('color');
    _earlyMorningContent[i].children[5].style.removeProperty('color');

    _earlyMorningContent[i].children[2].style.removeProperty('font-size');
    _earlyMorningContent[i].children[3].style.removeProperty('font-size');
    _earlyMorningContent[i].children[4].style.removeProperty('font-size');
    _earlyMorningContent[i].children[5].style.removeProperty('font-size');

    _earlyMorningContent[i].children[2].style.removeProperty('font-weight');
    _earlyMorningContent[i].children[3].style.removeProperty('font-weight');
    _earlyMorningContent[i].children[4].style.removeProperty('font-weight');
    _earlyMorningContent[i].children[5].style.removeProperty('font-weight');

  }
}
