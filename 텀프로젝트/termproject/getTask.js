


$(document).ready(function(){
    if($("#currentId").text() !== ""){      // 세션에 로그인 정보가 있어야만 currentId에 아이디가 입력되어 있음
        getTask();
    }
});


// getTask : 피일에서 과목과 일정에 대한 데이터를 가져와서 화면에 출력하도록 하는 함수 ======================================================

/* 
 *      1. 기존에 화면에 출력하고 있던 데이터 삭제 - 중복으로 생성되는 것을 막기위해서 화면을 초기화한다
 *      2. 파일에서 데이터를 가져와서 가져온 데이터를 기반으로 화면을 출력
 *      3. 출력 전에 정렬법을 선택하여 선택된 정렬법을 기반으로 화면에 출력하도록 함
 */

function getTask(){

    var subjectSection = document.getElementById("subjectSection");
    var keywordSection = document.getElementById("keywordSection");
    
    for (let i = 0; i < subjectSection.childElementCount; i++) {                                            // 화면 초기화
        for (let j = 0; j < subjectSection.children[i].children[2].childElementCount;) {
            subjectSection.children[i].children[2].deleteRow(j);
        }
    }
    for (let i = 0; i < keywordSection.childElementCount; i++) {
        for (let j = 0; j < keywordSection.children[i].children[2].childElementCount;) {
            keywordSection.children[i].children[2].deleteRow(j);
        }
    }

    var sortlist = document.getElementById("sortlist");
    var sortindex = sortlist.options.selectedIndex;
    var currentId = $("#currentId").text();
    var newId = new Account(currentId);
    var newJson = JSON.stringify(newId);

    $.ajax({
        url:'getTask.php',
        type:'POST',
        data:{data:newJson},
        dataType:'json',
        success:function(data){
            if(data.state === "noData"){
            } 
            else if(data.state === "session_fail") {
                alert("세션이 끊겼습니다.");
                window.location.reload();
            } 
            else {
                var newData = [];
                var jsonData = [];

                for (let i = 0; i < data.length; i++) {     // 배열의 sort를 이용하기 위해서 JSON을 배열화 해준다.
                    var newArray = JSON.parse(data[i]);
                    newData.push(newArray);
                }
                if(sortindex == 0){
                    // 마감일순 정렬
                    console.log(newData.sort(date_ascending));
                    newData.sort(date_ascending);
                }
                else {
                    // 중요도순 정렬
                    console.log(newData.sort(flag_descending));
                    newData.sort(flag_descending);
                }
                for (let i = 0; i < newData.length; i++) {      // JSON 형태로 데이터를 다루기 위해서 다시 JSON 형태로 만들어준다.
                    var newJson = JSON.stringify(newData[i]);
                    jsonData.push(newJson);
                }
                for (let i = 0; i < jsonData.length; i++) {
                    
                    var newArray = JSON.parse(jsonData[i]);
                    var newSubject = newArray["subject"];
                    var newKeyword = newArray["keyword"];
                    var newTitle = newArray["title"];
                    var subjectSection = document.getElementById("subjectSection");
                    var keywordSection = document.getElementById("keywordSection");
                    var check = true;    
                    
                    for (let j = 0; j < subjectSection.childElementCount; j++) {                    // 과목 섹션을 출력하는 부분이다.
                        if(subjectSection.children[j].children[0].textContent == newSubject){
                            whatSubject = subjectSection.children[j];
                            if(newTitle != ""){
                                addTask(newArray);
                            }
                            check = false;
                        } 
                    }
                    if(check){
                        addSubject(newSubject);

                        
                        if(newTitle != ""){
                            addTask(newArray);
                        }
                    }

                    // 키워드 섹션의 경우 정확하게 4개의 상자만 존재하기 때문에 addTask만 해주어도 된다.
                    // 하지만 addTask의 경우 task에 어떤 과목인지 적혀있지 않기 때문에 추가적으로 addKeywordTask를 추가해준다.

                    for (let j = 0; j < keywordSection.childElementCount; j++) {
                        if(keywordSection.children[j].children[0].textContent == newKeyword){
                            whatKeyword = keywordSection.children[j];
                            addKeywordTask(newArray);
                        } 
                    }
                }
            }
        },
        error:function(){
            alert("서버와의 통신이 원활하지 않습니다.");
        }
    });

}


// date_ascending & flag_descending : 마감일 오름차순 정렬 & 중요도 내림차순 정렬 함수 ================================================

/* 
 *      1. date_ascending : 마감일이 얼마 남지 않은 순대로 정렬
 *      2. flag_descending : 중요도가 중요한 순서대로 정렬
 */

function date_ascending(a, b) {
    return new Date(a.deadline).getTime() -new Date(b.deadline).getTime();
}
function flag_descending(a, b) {
    return b.flag - a.flag;
}