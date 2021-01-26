function Account(id, pw){
    this.id = id;
    this.pw = pw;
}

$(document).ready(function(){

    var idValidate = /^([A-Za-z0-9]){6,15}/; // 대소문자, 숫자의 조합으로 6 ~ 15자리
    var pwValidate = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/; // 문자, 숫자, 특수문자의 조합으로 8 ~ 15자리

    /* 
    로그인 버튼을 눌렀을 때 서버로 id / pw 데이터를 넘겨서
    같은 id / pw 를 가진 정보가 있는 지 알아보고 같은 데이터가
    존재하면 세션에 id 정보를 담는다.
    */
    $("#loginButton").click(function(){

        var id = $("#inputId").val();
        var pw = $("#inputPw").val();

        if(idValidate.test(id) && pwValidate.test(pw)){

            var newAccount = new Account(id, pw);
            var newJson = JSON.stringify(newAccount);
                
            $.ajax({
                url:'login.php',
                type:'POST',
                data: {data:newJson},
                dataType:'json',
                success:function(data){
                    if(data.state === "success"){
                    
                        window.location.href = "index.php"; // 첫페이지로 이동
    
                    } else if(data.state === "fail"){
                        // 로그인 실패
                        alert("로그인에 실패하였습니다.");
                    }
                },
                error:function(){
                    alert("서버와의 통신이 원할하지 않습니다.");
                } 
            })

        } else {
            alert("아이디나 패스워드 형식이 올바르지 않습니다.\n" + "ID : 대소문자, 숫자의 조합으로 6 ~ 15자리\n" + "PW  : 문자, 숫자, 특수문자의 조합으로 8 ~ 15자리");
            document.getElementById("inputId").value = null;
            document.getElementById("inputPw").value = null;
        }

    })

    /* 
    SIGN-UP 버튼을 눌렀을 때 서버로 id / pw 데이터를 넘겨서 id.json 파일에 저장한다.
    단 같은 id가 존재할 경우 저장하지 않고 같은 아이디가 존재한다는 알림을 띄운다.
    */
    $("#signUpButton").click(function(){

        var id = $("#inputId").val();
        var pw = $("#inputPw").val();

        if(idValidate.test(id) && pwValidate.test(pw)){

            var newAccount = new Account(id, pw);
            var newJson = JSON.stringify(newAccount);

            $.ajax({
                url: 'sign.php',
                type:'POST',
                data: {data:newJson},
                dataType:'json',
                success:function(data){
                    if(data.state === "success"){
                        alert("회원가입이 완료 되었습니다.");
                    } else if(data.state === "fail") {
                        alert("이미 아이디가 존재합니다.")
                    }
                },
                error:function(){
                    alert("서버와의 통신이 원할하지 않습니다.");
                }
            })
        } else {
            alert("아이디나 패스워드 형식이 올바르지 않습니다.\n" + "ID : 대소문자, 숫자의 조합으로 6 ~ 15자리\n" + "PW  : 문자, 숫자, 특수문자의 조합으로 8 ~ 15자리");
            document.getElementById("inputId").value = null;
            document.getElementById("inputPw").value = null;
        }

    })

})
