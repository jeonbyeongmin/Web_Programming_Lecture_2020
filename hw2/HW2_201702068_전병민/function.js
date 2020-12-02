

// Constructor ==============================================================

function Account(id, pw){
    this.id = id;
    this.pw = pw;
}

function Task(week){
    this.week = week
}

function Tasks(date, time, title, description){
    this.date = date;
    this.time = time;
    this.title = title;
    this.description = description;
}

function Week(year, month, date){
    this.year = year;
    this.month = month;
    this.date = date;
}

function Time(date, time){
    this.date = date;
    this.time = time;
}


// Pattern Validate =========================================================== 

var idValidate = /^([A-Za-z0-9]){6,15}/;
var pwValidate = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/;




//////////////////////////////////////////////////////////////////////////////
//                                                                          //
//                   Join Buttons & Logout Button                           //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

    // 세션에 로그인 아이디 정보가 있다면? ======================================================
    if($("#currentId").text() !== ""){ // 세션이 있을 경우에만 화면에 표시

        $("#addButton").attr("disabled", false); // add 버튼 활성화
        $("#joinFormContainer").css("display", "none");

        // 캘린더에 이번주 날짜 기입
        var currentDay = new Date();  
        var theYear = currentDay.getFullYear();
        var theMonth = currentDay.getMonth();
        var theDate  = currentDay.getDate();
        var theDayOfWeek = currentDay.getDay();
        
        var monthArr = [];

        for(var i=0; i<7; i++) {

            var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));

            var mm = resultDay.getMonth();
            var dd = resultDay.getDate();

            var newDd = ("0" + dd).slice(-2)
            var newMonth = ("0" + (mm+1)).slice(-2);

            monthArr.push(newMonth);

            $("#day"+i).html(newDd);
        }
        var set = Array.from(new Set(monthArr));
        
        $("#year").html(theYear);


        if(set.length > 1){
            
            var tempStr = "";

            var tempCount = 0;
            for (let i = 0; i < set.length; i++) {
                if(!(tempCount == set.length-1)){
                    tempStr = tempStr + set[i] + ", ";    
                } else {
                    tempStr = tempStr + set[i];    
                }
                tempCount++;
            }
            $("#month").html(tempStr);
        } else {
            $("#month").html(set[0]);
        }

        if(getTask(currentDay) === 0){
            alert("등록된 일정이 없습니다.");
        }
    }

    // Click Join Button ======================================================
    $("#joinButton").click(function(){
        $("#joinFormContainer").css("display", "block");
    });

    // Click Signin Button =====================================================
    $("#signinButton").click(function(){

        var id = $("#id").val();
        var pw = $("#pw").val();

        var newAccount = new Account(id, pw);
        var newJson = JSON.stringify(newAccount);

        // ID / PW 패턴 유효성 검사
        if(idValidate.test(id) && pwValidate.test(pw)){
                        
            $.ajax({
                url:'signIn.php',
                type:'POST',
                data:{data:newJson},
                dataType:'json',
                success:function(data){
                    if(data.state === "success"){
                        alert("회원가입이 완료 되었습니다.");
                    } else if(data.state === "fail") {
                        alert("이미 아이디가 존재합니다.")
                    }
                    $("#joinFormContainer").css("display", "none");
                },
                error:function(){
                    alert("서버와의 통신이 원활하지 않습니다.");
                    $("#joinFormContainer").css("display", "none");
                }
            })
        } else {
            alert("아이디 또는 패스워드가 입력 양식에 맞지 않습니다.");
            $("#joinFormContainer").css("display", "none");
            
        }
    });

    // Click Login Button ======================================================
    $("#loginButton").click(function(){

        var id = $("#id").val();
        var pw = $("#pw").val();

        var newAccount = new Account(id, pw);
        var newJson = JSON.stringify(newAccount);

        $.ajax({
            url:'login.php',
            type:'POST',
            data:{data:newJson},
            dataType:'json',
            success:function(data){
                if(data.state === "success"){
                    
                    // 로그인 성공
                    window.location.reload();

                } else if(data.state === "fail"){
                    // 로그인 실패
                    alert("로그인에 실패하였습니다.")
                    $("#joinFormContainer").css("display", "none");
                }
            },
            error:function(){
                alert("서버와의 통신이 원활하지 않습니다.")
            }
        });
    });

    // Click Logout Button ======================================================
    $("#logoutButton").click(function(){
        $.ajax({
            url:'logout.php',
            dataType:'json',
            success:function(data){
                if(data.state == "logout"){
                    alert("로그아웃이 되었습니다.");
                    window.location.reload();
                    sessionStorage.clear();             // 세션 스토리지 초기화
                } else {
                    alert("이미 로그아웃 상태입니다.")
                }
            }
        })
    });
})



//////////////////////////////////////////////////////////////////////////////
//                                                                          //
//                              ADD Buttons                                 //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

    // Click Add Button =====================================================
    $("#addButton").click(function(){
        $("#addFormContainer").css("display", "block");

        //value
        $("#date").val("");
        $("#time").val("");
        $("#title").val("");
        $("#description").val("");

        // disalbed
        $("#date").attr("disabled", false);
        $("#time").attr("disabled", false);
        $("#title").attr("disabled", false);        
        $("#description").attr("disabled", false);
        $("#saveButton").attr("disabled", false);
        $("#updateButton").attr("disabled", true);
        $("#submitButton").attr("disabled", true);
        $("#deleteButton").attr("disabled", true);

        // Date MIN / MAX
        var year = $("#year").text();
        var date = $("#day0").text();
        var tempMonth = $("#month").text();
        monthArr = tempMonth.split(", ");
        var month = monthArr[0];

        // 캘린더에 입력받은 날짜를 기준으로 일주일을 만듬
        var currentDay = new Date(year, month-1, date);  
        var theYear = currentDay.getFullYear();
        var theMonth = currentDay.getMonth();
        var theDate  = currentDay.getDate();
        var theDayOfWeek = currentDay.getDay();

                        
        for(var i=0; i<7; i++) {

            var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));

            var yyyy = resultDay.getFullYear();
            var mm = resultDay.getMonth();
            var dd = resultDay.getDate();

            var newDd = ("0" + dd).slice(-2);
            var newMonth = ("0" + (mm+1)).slice(-2);
            
            if(i == 0){
                $("#date").attr("min", yyyy+"-"+newMonth+"-"+newDd);   
            } else if (i == 6){
                $("#date").attr("max", yyyy+"-"+newMonth+"-"+newDd);
            }
        }
    });
    
    // Click Save Button =====================================================
    $("#saveButton").click(function(){
        // date, time, title, description 데이터가 필요

        var date = $("#date").val();
        var time = $("#time").val();
        var title = $("#title").val();
        var description = $("#description").val();

        var newTask = new Tasks(date, time, title, description);
        var newJson = JSON.stringify(newTask);

        $.ajax({
            url:'storeTasks.php',
            type:'post',
            data:{data:newJson},
            dataType:'json',
            success:function(data){
                if(data.state === "success"){
                    alert("파일이 저장되었습니다.");
                    var splitNewDate = date.split("-");
                    // 여기서 중복되지 않는 데이터는 date+time 뿐이다.
                    sessionStorage.setItem(date + "-" + time, newJson);

                    for (let j = 0; j < 7; j++) {
                        if($("#day" + j).text() == splitNewDate[2]){

                            var newDiv = document.createElement("div");
                            var newText = document.createTextNode(title);
                            newDiv.appendChild(newText);
                            newDiv.setAttribute("class", "taskBox");
                            newDiv.setAttribute("id", date+"-"+time);

                            // 할일 클릭했을 때 관련 정보가 나와야함.
                            newDiv.addEventListener("click", function(){

                                var tempArray = JSON.parse(sessionStorage.getItem(this.id));

                                $("#addFormContainer").css("display", "block");
                                $("#date").val(tempArray["date"]);
                                $("#time").val(tempArray["time"]);
                                $("#title").val(tempArray["title"]);
                                $("#description").val(tempArray["description"]);

                                // disalbed
                                $("#date").attr("disabled", true);
                                $("#time").attr("disabled", true);
                                $("#date").removeAttr("min");
                                $("#date").removeAttr("max");
                                $("#title").attr("disabled", true);
                                $("#description").attr("disabled", true);
                                $("#saveButton").attr("disabled", true);
                                $("#updateButton").attr("disabled", false);
                                $("#submitButton").attr("disabled", true);
                                $("#deleteButton").attr("disabled", false);
                                
                            })
                            document.getElementById("content"+j).appendChild(newDiv);
                        }
                    }
                } else if(data.state === "exist_fail"){
                    alert("같은 날짜에 작업이 존재합니다.");
                } else if(data.state === "session_fail"){
                    alert("로그인이 필요합니다.");
                    window.location.reload();
                }
            }
        })

        $("#addFormContainer").css("display", "none");
    });

    // Click Cancel Button ===================================================
    $("#cancelButton").click(function(){
        $("#addFormContainer").css("display", "none");

        //value 초기화
        $("#date").val("");
        $("#time").val("");
        $("#title").val("");
        $("#description").val("");

        // update에서 임시로 세션스토리지에 담아두었던 값 제거 
        if(sessionStorage.getItem("target") != undefined){
            sessionStorage.removeItem("target");
        }
    });

    // Click Update Button ===================================================
    $("#updateButton").click(function(){

        // disalbed 설정
        $("#date").attr("disabled", false);
        $("#time").attr("disabled", false);
        $("#title").attr("disabled", false);
        $("#description").attr("disabled", false);
        $("#saveButton").attr("disabled", true);
        $("#updateButton").attr("disabled", true);
        $("#submitButton").attr("disabled", false);
        $("#deleteButton").attr("disabled", true);

        // submit 할 때 대응하기 위해 update button을 누르면 세션 스토리지에 임시로 데이터를 담는다.
        var date = $("#date").val();
        var time = $("#time").val();
        sessionStorage.setItem("target", date+","+time);
    });

    // Click Submit Button ===================================================

    $("#submitButton").click(function(){

        // 파일 수정
        var date = $("#date").val();
        var time = $("#time").val();
        var title = $("#title").val();
        var description = $("#description").val();

        var moveTask = new Tasks(date, time, title, description);
        var moveJson = JSON.stringify(moveTask);

        $.ajax({
            url:'storeTasks.php',
            type:'post',
            data:{data:moveJson},
            dataType:'json',
            success:function(data){
                if(data.state === "success"){

                    deleteTargetTask();

                    // 여기서 중복되지 않는 데이터는 date+time 뿐이다.
                    sessionStorage.setItem(date + "-" + time, moveJson);

                    // 캘린더에 입력받은 날짜를 기준으로 일주일을 만듬
                    var currentDay = new Date(date + " " + time);  
                    var theYear = currentDay.getFullYear();
                    var theMonth = currentDay.getMonth();
                    var theDate  = currentDay.getDate();
                    var theDayOfWeek = currentDay.getDay();

                    var monthArr = [];
                        
                    for(var i=0; i<7; i++) {

                        var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));

                        var mm = resultDay.getMonth();
                        var dd = resultDay.getDate();

                        var newDd = ("0" + dd).slice(-2);
                        var newMonth = ("0" + (mm+1)).slice(-2);

                        monthArr.push(newMonth);
                        
                        $("#day"+i).html(newDd);
                    }
                    var set = Array.from(new Set(monthArr));

                    $("#year").html(theYear);

                    if(set.length > 1){
                        
                        var tempStr = "";

                        var tempCount = 0;
                        for (let i = 0; i < set.length; i++) {
                            if(!(tempCount == set.length-1)){
                                tempStr = tempStr + set[i] + ", ";    
                            } else {
                                tempStr = tempStr + set[i];    
                            }
                            tempCount++;
                        }
                        $("#month").html(tempStr);
                    } else {
                        $("#month").html(set[0]);
                    }

                    // 전체 표 한번 삭제
                    for (let i = 0; i < 7; i++) {
                        var element = document.getElementById("content"+i);
                        while(element.hasChildNodes()) {
                            element.removeChild( element.firstChild );
                        }  
                    }
                        
                    // 전체 표에 파일 데이터 읽어서 쓰기
                    getTask(currentDay);

                } else if(data.state === "exist_fail"){
                    alert("같은 날짜에 작업이 존재합니다.");
                } else {
                    alert("로그인이 필요합니다.");
                    window.location.reload();
                }
            }
        });

        $("#addFormContainer").css("display", "none");
    })

    // Click Delete Button ===================================================
    $("#deleteButton").click(function(){
        var date = $("#date").val();
        var time = $("#time").val();
        sessionStorage.setItem("target", date+","+time);

        if(deleteTargetTask()) {
            alert("삭제되었습니다.");
            // 파일에서 제거 성공 시 화면에서 제거
            var element = document.getElementById(date+"-"+time);
            element.parentNode.removeChild(element);
        }
    });

})



///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//             서버로 가서 데이터 삭제 후 화면과 스토리지에서 삭제하는 함수                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
function deleteTargetTask(){

    var isDelete= false;

    var dateAndTime = sessionStorage.getItem("target");
    var splitDateAndTime = dateAndTime.split(",");
    
    // 파일에서 제거
    var date = splitDateAndTime[0];
    var time = splitDateAndTime[1];
        
    var targetTask = new Time(date, time);
    var targetJson = JSON.stringify(targetTask);

    $.ajax({
        url:'deleteTask.php',
        type:'post',
        data:{data:targetJson},
        dataType:'json',
        async: false,
        success:function(data){
            if(data.state == "success"){

                isDelete = true;

                // 파일에서 제거 성공 시 세션 스토리지에서 제거
                sessionStorage.removeItem(date+"-"+time);
                sessionStorage.removeItem("target");
                
            } else {
                alert("세션이 끊겼습니다.");
                window.location.reload();
            }

            
        },
        error:function(){
            alert("서버 전송 오류");
        }
    });

    $("#addFormContainer").css("display", "none");
    return isDelete;
}



///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//                    서버로 가서 로그인된 아이디의 일주일 동안의                       //
//                    json에 담아서 가져온 뒤 캘린더에 추가하는 함수                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
function getTask(day){

    var theYear = day.getFullYear();
    var theMonth = day.getMonth();
    var theDate  = day.getDate();
    var theDayOfWeek = day.getDay();
    
    var week = [];

    for(var i=0; i<7; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));

        var yyyy = resultDay.getFullYear();
        var mm = resultDay.getMonth();

        var dd = resultDay.getDate();
        week[i] = new Week(yyyy, mm, dd);
    }
    var jsonWeek = JSON.stringify(week);

    var task = new Task(jsonWeek);
    var jsonTask = JSON.stringify(task);

    let count1 = 0;


    $.ajax({
        url:'task.php',
        type:'POST',
        data:{data:jsonTask},
        dataType:'json',
        async: false, // 리턴값을 받기 위해서는 비동기가 아닌 동기식으로 기다렸다가 리턴
        success:function(data){
            if(data.state === "noData"){
                // 파일 자체가 없는 경우..
            } if(data.state === "session_fail") {
                alert("세션이 끊겼습니다.");
                window.location.reload();
            } else {
                for (let i = 0; i < data.length; i++) {
                    var newArray = JSON.parse(data[i]);
                    var newDate = newArray["date"];
                    var newTime = newArray["time"];
                    var newTitle = newArray["title"];
                    var splitNewDate = newDate.split("-");

                    // 여기서 중복되지 않는 데이터는 date+time 뿐이다.
                    sessionStorage.setItem(newDate + "-" + newTime, data[i]);
                
                    for (let j = 0; j < 7; j++) {
                        

                        if($("#day" + j).text() == splitNewDate[2]){

                            var newDiv = document.createElement("div");
                            var newText = document.createTextNode(newTitle);
                            newDiv.appendChild(newText);
                            newDiv.setAttribute("class", "taskBox");
                            newDiv.setAttribute("id", newDate+"-"+newTime);

                            // 할일 클릭했을 때 관련 정보가 나와야함.
                            newDiv.addEventListener("click", function(){

                                var tempArray = JSON.parse(sessionStorage.getItem(this.id));

                                $("#addFormContainer").css("display", "block");

                                $("#date").val(tempArray["date"]);
                                $("#time").val(tempArray["time"]);
                                $("#title").val(tempArray["title"]);
                                $("#description").val(tempArray["description"]);

                                // disalbed
                                $("#date").attr("disabled", true);
                                $("#date").removeAttr("min");
                                $("#date").removeAttr("max");
                                $("#time").attr("disabled", true);
                                $("#title").attr("disabled", true);
                                $("#description").attr("disabled", true);
                                $("#saveButton").attr("disabled", true);
                                $("#updateButton").attr("disabled", false);
                                $("#submitButton").attr("disabled", true);
                                $("#deleteButton").attr("disabled", false);

                            })
                            document.getElementById("content"+j).appendChild(newDiv);
                            count1++;
                        }
                    }
                }

            }
        },
        error:function(){
            alert("서버와의 통신이 원활하지 않습니다.");
        }
    });


    return count1;

}