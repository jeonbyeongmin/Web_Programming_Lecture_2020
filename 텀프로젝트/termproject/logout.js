

// 로그아웃 버튼을 누르게 되면 logout.php에서 세션을 끊고 리로드하여 화면을 초기화한다.

$("#logoutBT").click(function(){
    $.ajax({
        url:'logout.php',
        dataType:'json',
        success:function(data){
            if(data.state == "logout"){
                alert("로그아웃이 되었습니다.");
                window.location.reload();
            } else {
                alert("이미 로그아웃 상태입니다.")
            }
        }
    })
});