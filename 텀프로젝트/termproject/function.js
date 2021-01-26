

// GLOBAL ===============================================================================================================

var whatSubject;            // 현재 작업 중인 혹은 기능이 수행되는 과목의 div
var whatKeyword;            // 현재 작업 중인 혹은 기능이 수행되는 키워드의 div

// Constructor =========================================================================================================

function Task(subject, title, keyword, flag, deadline, checked){
    this.subject = subject;
    this.title = title;
    this.keyword = keyword;
    this.flag = flag;
    this.deadline = deadline;
    this.checked = checked;
}

function Target(subject, title){
    this.subject = subject;
    this.title = title;
}

function Subejct(subject) {
    this.subject = subject;
}

function Account(id){
    this.id = id;
}

// addSubjectInFile : 과목 추가 버튼을 눌렀을 때, 서버로 가서 해당 과목을 추가하는 함수 ================================================

/* 
 *      1. 과목의 이름을 프롬프트를 이용해서 입력받는다.
 *      2. 과목의 이름을 입력하지 않거나 이미 같은 이름의 과목이 존재하는 상황에서 예외처리를 해주었다.
 *      3. 정상적으로 서버에서 과목이 추가된다면 과목이 추가된 화면을 출력하기 위해서 addSubject() 라는 함수를 호출한다.
 */

document.getElementById("addSubject").addEventListener("click", addSubjectInFile);
function addSubjectInFile() {

    if($("#currentId").text() !== ""){ // 세션이 있을 경우에만 화면에 표시
    
        var yourTitle = prompt("과목의 이름이 무엇인가요?");

        if(yourTitle === ""){
            alert("과목의 이름을 입력하지 않았습니다.");
        } 
        else if(yourTitle !== null){
            $.ajax({
                url:'addSubject.php',
                type:'POST',
                data:{data:yourTitle},
                dataType:'json',
                success:function(data){
                    if(data.state == "exist_fail") {
                        alert("이미 같은 이름의 과목이 존재합니다.");
                    }
                    else if(data.state == "session_fail") {
                        alert("세션이 끊겼습니다.");
                    }
                    else {                                  // 과목 정상 추가 완료 시에
                        alert("과목이 추가되었습니다.");
                        addSubject(yourTitle);              // addSubject 함수 호출하는 부분
                    }
                },
                error:function(){
                    alert("서버와의 통신이 원활하지 않습니다.");
                }
            });
        }
    } 
    else {
        alert("로그인이 필요한 작업입니다.");
    }
}


// addSubject : 서버에서 정상적으로 과목이 추가된 후에 화면에 과목 상자를 추가로 출력하는 함수 =======================================================

/*      
 *      크게 세 부분으로 나눌 수 있다.
 *
 *      1. title : 과목의 이름
 *      2. 테이블 : 일정이 추가되는 테이블
 *      3. 일정 추가 버튼 & 과목 삭제 버튼 : 과목 상자 하단에 위치한 과목 삭제를 위한 버튼 및 일정 추가를 위한 버튼 
 * 
 */

function addSubject(data){

    /* title */
    var titleLink = document.createElement("a");
    var title = document.createTextNode(data);           // textNode에 프롬프트를 이용하여 입력받은 과목 이름을 삽입
    titleLink.appendChild(title);                        // a는 프롬프트에서 입력받은 텍스트 노드를 가지게 됨
    var subjectTitle = document.createElement("h1");
    subjectTitle.setAttribute("class", "col-8");
    subjectTitle.appendChild(titleLink);

    /* hr과 테이블 */
    var line = document.createElement("hr");
    var table = document.createElement("table");
    table.setAttribute("class", "taskContainer");       // 일정이 추가되는 테이블

    /* 일정 추가 버튼 */
    var taskAddButton = document.createElement("button");
    var add = document.createTextNode("+");
    taskAddButton.appendChild(add);
    taskAddButton.setAttribute("class", "taskAddButton");
    taskAddButton.addEventListener("click", function(){              // 일정 추가 버튼을 클릭하면 openForm 함수를 호출하고 whatSubject를 이 버튼이 있는 과목 상자로 세팅해준다.
        openForm();
        whatSubject = this.parentElement.parentElement;
    });
    
    /* 과목 삭제 버튼 */
    var removeSubject = document.createElement("button");
    var remove = document.createTextNode("-");
    removeSubject.appendChild(remove);
    removeSubject.setAttribute("class", "removeSubjectButton");
    removeSubject.addEventListener("click", function(){             // 과목 삭제 버튼을 클릭하면 removeSubjectInFile 함수를 호출한다.
        var isOK = confirm("정말 삭제하시겠습니까?");
        var target = this.parentElement.parentElement;                                        // 삭제가 필요한 항목과
        var targetSubjectTitle = this.parentElement.parentElement.childNodes[0].textContent;  // 삭제하려는 과목의 이름을 알아내서
        if(isOK) {
            var subjectSection = document.getElementById("subjectSection");
            subjectSection.removeChild(target);                                               // 화면에서 지우고
            removeSubjectInFile(targetSubjectTitle);                                          // removeSubjectInFile 함수로 파일에서도 지워준다.
        }
    });

    /* 두 버튼을 묶는 buttons */
    var buttons = document.createElement("div");
    buttons.appendChild(removeSubject);
    buttons.appendChild(taskAddButton);

    /* newContainer = 과목상자. 생성해둔 노드들을 과목상자의 자식으로 만들어주었다. */
    var newContainer = document.createElement("div");
    newContainer.appendChild(subjectTitle);
    newContainer.appendChild(line);
    newContainer.appendChild(table);
    newContainer.appendChild(buttons);
    newContainer.setAttribute("class", "subjectContainer col-lg-6 col-12");

    var subjectSection = document.getElementById("subjectSection");
    subjectSection.appendChild(newContainer); // 서브젝트 섹션에 과목상자 추가
    whatSubject = newContainer;

}



// openForm & closeForm : 일정 추가를 위해서 Form 여는 함수와 그 Form을 닫는 함수이다. =======================================================

/*      
 *      1. openForm : 일정 추가를 위해서 FORM을 여는 함수   FORM을 열 때 각각의 value는 초기화한다.
 *      2. closeForm : 취소 버튼을 누르면 FORM을 닫는 함수
 */

function openForm() {                                                   // form을 열때 모든 value값을 초기화한 상태로 열어준다.
    document.getElementById("myForm").style.display = "block";
    document.getElementById("black_bg").style.display = "block";
    document.getElementById("taskTitle").value = "";
    for (let i = 0; i < document.getElementsByName("keyword").length; i++) {
        document.getElementsByName("keyword")[i].checked = false;
    }
    document.getElementById("flag").value = "";
    document.getElementById("deadline").value = "";
}
document.getElementById("cancelButtonInForm").addEventListener("click", closeForm);
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("black_bg").style.display = "none";
}  



// addTaskInFile : FORM에서 일정추가를 누르면 서버에서 해당 일정을 추가하는 함수 =======================================================

/*      
 *      1. 입력받은 데이터를 전부 보내기 위해서 각 필드에서 value 값을 가져온다.
 *      2. 키워드의 경우 radio이기 때문에 loop를 이용하였다.
 *      3. 입력 필드가 모두 채워져 있지 않은 경우, 일정의 이름이 너무 긴 경우에 대한 예외처리를 해주었다.
 *      4. value 값들을 객체에 담아서 JSON 형태로 만든 뒤 서버로 보내주었다.
 *      5. 정상적으로 일정을 추가했을 때에는 addTask 함수를 호출하여 화면에서도 일정을 추가하여 출력해준다.
 */

document.getElementById("addTaskButtonInForm").addEventListener("click", addTaskInFile);
function addTaskInFile() {
    
    var subject = whatSubject.firstChild.firstChild.firstChild.textContent;
    var keywords = document.getElementsByName("keyword");
    var taskTitle = document.getElementById("taskTitle");
    var title = taskTitle.value;
    var flag = document.getElementById("flag").value;
    var deadline = document.getElementById("deadline").value;
    var keyword;
    var check = false;
    var checked = "false";
    
    for (let i = 0; i < keywords.length; i++) { // radio 항목 중 어떤 것이 선택되었는지 알기 위해서.
        if(keywords[i].checked) {
            keyword = keywords[i].value;
            check = true;
        }
    }
    if(title == "" || check == false || deadline == ""){
        alert("입력필드를 채워주세요");
        return 0;
    }
    else if(title.length >= 20) {
        alert("일정의 이름이 너무 깁니다.");
        return 0;
    }
    var newTask = new Task(subject, title, keyword, flag, deadline, checked);
    var newJson = JSON.stringify(newTask);

    $.ajax({
        url:'addTask.php',
        type:'POST',
        data: {data:newJson},
        success:function(data){
            if(data == "SUCCESS"){
                addTask(newTask);
            }
            else if(data == "LOG_FAIL"){
                alert("로그인이 필요한 작업입니다.");
            }
            else {
                alert(data);
            }
        },
        error:function(){
            alert("서버와의 통신이 원할하지 않습니다.");
        } 
    });
    closeForm();
}


// addTask : 서버에서 일정을 추가했을 때 혹은 로그인 시에 화면에 일정을 추가하는 함수 =======================================================

/*      
 *      1. 체크박스 생성 : 체크 여부를 가져와서 화면에 그대로 출력한다. 체크 박스를 눌렀을 때 서버와 통신할 수 있도록 이벤트리스너를 부여한다.
 *      2. 일정 이름 : 일정의 이름을 가져온다. 만약 체크박스가 체크되어 있다면 CSS 속성을 바꾼다.
 *      3. 일정 삭제 버튼 : 각각의 일정에 해당 일정을 삭제할 수 있는 일정 삭제 버튼을 부여하였다.
 */

function addTask(data) {

    var newTitle = data["title"];
    var newChecked = data["checked"];

    // 첫번째 컬럼 : 체크박스
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkboxs"); 

    if(newChecked == "true"){                           // 파일에서 가져온 체크 여부가 true 라면 화면에서도 체크박스가 체크되도록 해준다.
        checkbox.checked = true;
    }
    checkbox.addEventListener("click", function(){      // 체크박스를 누를 때마다 서버와 통신하기 위해서 이벤트리스너를 부여한다,
        var newJson = JSON.stringify(data);
        if(newChecked == "false"){
            this.setAttribute("checked", true);
            this.parentElement.parentElement.childNodes[1].style.color = "grey";
            this.parentElement.parentElement.childNodes[1].style.textDecoration = "line-through";
            newChecked = "true";
        }
        else if(newChecked == "true") {
            this.setAttribute("checked", false);
            this.parentElement.parentElement.childNodes[1].style.color = "black";
            this.parentElement.parentElement.childNodes[1].style.textDecoration = "none";
            newChecked = "false";
        }
        $.ajax({
            url:'addChecked.php',
            type:'POST',
            data: {data:newJson},
            success:function(data){
                if(data == "SUCCESS"){
                    
                }
                else if(data == "LOG_FAIL"){
                    alert("로그인이 필요한 작업입니다.");
                }
                else {
                    alert("error");
                }
            },
            error:function(){
                alert("서버와의 통신이 원할하지 않습니다.");
            } 
        });
    });
    var col1 = document.createElement("td");
    col1.setAttribute("class", "col1 col-1");
    col1.appendChild(checkbox);


    // 2. 두번째 컬럼 : 일정 이름
    var taskTitle = document.createTextNode(newTitle);
    var col2 = document.createElement("td");
    col2.setAttribute("class", "col2 col-9");
    col2.appendChild(taskTitle);
    if(newChecked == "true"){
        col2.style.color = "grey";
        col2.style.textDecoration = "line-through";
    }
    
    // 3. 세번째 컬럼 : 일정 삭제버튼
    var removeTask = document.createElement("input");
    removeTask.setAttribute("type", "button");
    removeTask.setAttribute("value", "삭제");
    removeTask.setAttribute("class", "removeTaskButton");
    /* 일정 삭제 버튼을 눌렀을 때, 일정이 삭제되는 함수 */
    removeTask.addEventListener("click", function(){
        var table = this.parentElement.parentElement.parentElement;     // dom 구조를 활용하여 해당 과목상자에 있는 table을 변수에 담아주었다.
        var count = table.rows.length; // row의 개수
        var subjectTitle = table.parentElement.childNodes[0].textContent;
        for (let i = 0; i < count; i++) {
            if(table.rows[i].childNodes[1] == this.parentElement.parentElement.childNodes[1]){
                var taskTitle = table.rows[i].childNodes[1].textContent;
                removeTaskInFile(subjectTitle, taskTitle);
                table.deleteRow(i);                                 // table의 row를 돌면서 클릭한 자기자신의 일정 이름과 같으면 row를 삭제하였다.
                break;
            }
        }
        
    });
    var col3 = document.createElement("td");
    col3.setAttribute("class", "col4 col-1");
    col3.appendChild(removeTask);

    // 4. row 생성
    var row = document.createElement("tr");
    row.setAttribute("class", "row");
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);

    // 5. 최종적으로 과목상자에 있는 테이블에 row를 추가해주게 된다.
    whatSubject.childNodes[2].appendChild(row);
}


// addKeywordTask : 서버에서 일정을 추가했을 때 혹은 로그인 시에 화면에 일정을 추가하는 함수 =======================================================

/*      
 *      addTask와 유사하다      
 *
 *      1. 체크박스 생성 : 체크 여부를 가져와서 화면에 그대로 출력한다. 체크 박스를 눌렀을 때 서버와 통신할 수 있도록 이벤트리스너를 부여한다.
 *      2. 일정 이름 : 일정의 이름을 가져온다. 만약 체크박스가 체크되어 있다면 CSS 속성을 바꾼다.
 *      3. 과목 이름 : 키워드 섹션에서는 어떤 과목인지 알 수 있도록 과목의 이름을 도 추가해주었다.
 *      4. 일정 삭제 버튼 : 각각의 일정에 해당 일정을 삭제할 수 있는 일정 삭제 버튼을 부여하였다.
 */

function addKeywordTask(data) {

    var newSubject = data["subject"];
    var newTitle = data["title"];
    var newChecked = data["checked"]; 

    // 1. 첫번째 컬럼 : 체크박스
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkboxs");
    if(newChecked == "true"){
        checkbox.checked = true;
    }
    checkbox.addEventListener("click", function(){
        var newJson = JSON.stringify(data);
        if(newChecked == "false"){
            this.setAttribute("checked", true);
            this.parentElement.parentElement.childNodes[1].style.color = "grey";
            this.parentElement.parentElement.childNodes[1].style.textDecoration = "line-through";
            newChecked = "true";
        }
        else if(newChecked == "true") {
            this.setAttribute("checked", false);
            this.parentElement.parentElement.childNodes[1].style.color = "black";
            this.parentElement.parentElement.childNodes[1].style.textDecoration = "none";
            newChecked = "false";
        }
        $.ajax({
            url:'addChecked.php',
            type:'POST',
            data: {data:newJson},
            success:function(data){
                if(data == "SUCCESS"){   
                }
                else if(data == "LOG_FAIL"){
                    alert("로그인이 필요한 작업입니다.");
                }
                else {
                    alert("error");
                }
            },
            error:function(){
                alert("서버와의 통신이 원할하지 않습니다.");
            } 
        });
    });
    var col1 = document.createElement("td");
    col1.setAttribute("class", "col1 col-1");
    col1.appendChild(checkbox);

    // 2. 두번째 컬럼 : 일정 이름
    var taskTitle = document.createTextNode(newTitle);
    var col2 = document.createElement("td");
    col2.setAttribute("class", "col2 col-6");
    col2.appendChild(taskTitle);
        if(newChecked == "true"){
        col2.style.color = "grey";
        col2.style.textDecoration = "line-through";
    }
    
    // 3. 세번째 컬럼 : 과목 정보
    var taskSubject = document.createTextNode(newSubject);
    var col3 = document.createElement("td");
    col3.setAttribute("class", "col3 col-3");
    col3.appendChild(taskSubject);

    // 4. 네번째 컬럼 : 일정 삭제버튼
    var removeTask = document.createElement("input");
    removeTask.setAttribute("type", "button");
    removeTask.setAttribute("value", "삭제");
    removeTask.setAttribute("class", "removeTaskButton");
    /* 일정 삭제 버튼을 눌렀을 때, 일정이 삭제되는 함수 */
    removeTask.addEventListener("click", function(){
        var table = this.parentElement.parentElement.parentElement; // dom 구조를 활용하여 해당 과목상자에 있는 table을 변수에 담아주었다.
        var count = table.rows.length; // row의 개수
        
        for (let i = 0; i < count; i++) {
            if(table.rows[i].childNodes[1] == this.parentElement.parentElement.childNodes[1]){
                removeTaskInFile(newSubject, newTitle);
                table.deleteRow(i); // table의 row를 돌면서 클릭한 자기자신의 일정 이름과 같으면 row를 삭제하였다.
                break;
            }
        }
    });
    var col4 = document.createElement("td");
    col4.setAttribute("class", "col4 col-1");
    col4.appendChild(removeTask);

    // 4. row 생성
    var row = document.createElement("tr");
    row.setAttribute("class", "row");
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);

    // 5. 최종적으로 과목상자에 있는 테이블에 row를 추가해주게 된다.
    whatKeyword.children[2].appendChild(row);
}


// removeSubjectInFile & removeTaskInFile : 서버에서 과목 & 일정을 삭제하는 함수 =======================================================

/*         
 *      1. removeSubjectInFile : 서버에서 해당 과목을 삭제한다.
 *      2. removeTaskInFile : 서버에서 해당 일정을 삭제한다. 이를 위해서 과목에 대한 데이터가 추가로 필요.
 */

function removeSubjectInFile(subject){

    var targetSubject = new Subejct(subject);
    var targetJson = JSON.stringify(targetSubject);

    $.ajax({
        url:'removeSubject.php',
        type:'POST',
        data: {data:targetJson},
        dataType:'json',
        success:function(data){
            if(data.state == "SUCCESS"){
                
                alert("삭제되었습니다.");
            }
            else if(data.state == "SESSION_FAIL"){
                alert("로그인이 필요한 작업입니다.");
            }
        },
        error:function(){
            alert("서버와의 통신이 원할하지 않습니다.");
        } 
    });
}
function removeTaskInFile(subject, title){

    var target = new Target(subject, title);
    var targetJson = JSON.stringify(target);

    $.ajax({
        url:'removeTask.php',
        type:'POST',
        data: {data:targetJson},
        dataType:'json',
        success:function(data){
            if(data.state == "SESSION_FAIL"){
                alert("로그인이 필요한 작업입니다.");
            }
        },
        error:function(){
            alert("서버와의 통신이 원할하지 않습니다.");
        } 
    });
}