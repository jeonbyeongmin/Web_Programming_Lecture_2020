


// infoArray 배열 ===============================================================
var infoArray = [];


// StudentInfo 객체 생성자 ========================================================
function StudentInfo(name, korean, math, english, society, history){
    this.name =name;
    this.korean = korean;
    this.math = math;
    this.english = english;
    this.society = society;
    this.history = history;
}

StudentInfo.prototype.getName = function() {
    return this.name;
}

StudentInfo.prototype.getKorean = function() {
    return this.korean;
}

StudentInfo.prototype.getMath = function() {
    return this.math;
}

StudentInfo.prototype.getEnglish = function() {
    return this.english;
}

StudentInfo.prototype.getSociety = function() {
    return this.society;
}

StudentInfo.prototype.getHistory = function() {
    return this.history;
}


// Prototype 객체에 avg 메소드를 정의 ==============================================
StudentInfo.prototype.avg = function(){
    var korean = this.getKorean();
    var math = this.getMath();
    var english = this.getEnglish();
    var society = this.getSociety();
    var history = this.getHistory();

    var arr = [];
    arr.push(korean);
    arr.push(math);
    arr.push(english);
    arr.push(society);
    arr.push(history);

    var checks = document.getElementsByClassName("subjects");

    var count = 0;
    var sum = 0;

    var check = false;

    for (let i = 0; i < checks.length; i++) {
        if(checks[i].checked === true){
            sum += Number(arr[i]);
            count++;
            check =true;
        }
    }
    var result;
    if(check === true){
        result = (sum / count).toFixed(1);
    } else {
        result = -1; // 체크된 것이 없다면 -1 리턴
    }
    return result;
};


// 테이블로부터 데이터를 받아서 생성자를 이용하여 객체를 생성하고 infoArray 배열에 저장 =========
function getData(){

    var names = document.getElementsByClassName("name");
    var koreans = document.getElementsByClassName("korean");
    var maths = document.getElementsByClassName("math");
    var englishs = document.getElementsByClassName("english");
    var societys = document.getElementsByClassName("society");
    var historys = document.getElementsByClassName("history");

    
    for(let i = 0 ; i < names.length; i++){
        var newObj = new StudentInfo(names[i].textContent, koreans[i].textContent, 
            maths[i].textContent, englishs[i].textContent, societys[i].textContent, historys[i].textContent);
        infoArray[i] = newObj; // 각 객체 인스턴스 infoArray 에 배열로 저장
    }

    // 배열에 저장 완료 이후 2 영역에 있는 점수 표 Table 삭제
    var table = document.getElementById("table");
    table.parentNode.removeChild(table);

}

// getData() 함수 호출 =========================================================
getData();


// 제출 버튼 클릭 이벤트 ==========================================================
$("#submitButton").click(function (){
    
    if($("#studentName").val() !== ""){
        var check = false;
        for (let i = 0; i < infoArray.length; i++) {
            if($("#studentName").val() === infoArray[i]["name"]){
                var result = infoArray[i].avg();
                if(result === -1){
                    alert("Please select a subject or subjects");
                } else{
                    alert("Student's name is " + infoArray[i]["name"] + ", Average is " + result)
                }
                check = true;
            }
        }
        if(check === false){
            alert("The name does not exist");
        }
        
    } else { // 전체학생
        var sum = 0;
        var check = true;
        var count = 0;
        for (let i = 0; i < infoArray.length; i++) {
            sum += Number(infoArray[i].avg());
            count++;
        }
        if(sum < 0){
            check = false;
        }

        if(check === true){
            var result = (sum / count).toFixed(1);
            alert("The average of all students' subject grades is + " + result);
        } else {
            alert("please write name or select subjects!");
        }
    }
});