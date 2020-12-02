<?php
session_start();

/* Delete Button 을 눌렀을 때 서버에 관련 데이터를 받아와서 파일에서 제거하는 함수 */

if(!isset($success)){ // 클라이언트로 보내줄 객체 생성
    $success = new stdClass();
}

if(!isset($fail)){ // 실패시 클라이언트로 보내줄 객체 생성
    $fail = new stdClass();
}

if(!isset($_SESSION["id"])){
    $fail->state = "session_fail";
    echo(json_encode($fail));
    exit;
}

$date = $time = "";

if (isset($_POST["data"])){ // validation check
    $data = json_decode($_POST["data"], true);
    
    $date = test_input($data["date"]);
    $time = test_input($data["time"]);
}

// validation check function
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}



function deleteTask(){

    if(!isset($_SESSION["id"])){ // 세션에 아이디 없으면 종료
        $fail->state = "session_fail";
        echo(json_encode($fail));
        exit;
    }

    $id = $_SESSION["id"]; // 세션에서 아이디 정보 가져옴

    global $date;
    global $time;
    
    global $success;
    global $fail;

    $yearAndMonth = explode("-", $date);

    $PATH = "./data/" . $id . "_" . $yearAndMonth[0] . $yearAndMonth[1] . ".json";   // 수정이 일어나는 파일의 경로

    if(is_file($PATH)){

        $json = file_get_contents($PATH); // 파일 가져오고
        $jsonArr = json_decode($json, true); // array로 디코드

        for($i = 0; $i < sizeof($jsonArr); $i++){
            if($jsonArr[$i]["date"] === $date && $jsonArr[$i]["time"] === $time){
                
                array_splice($jsonArr, $i, 1); // 배열에서 해당 줄 삭제
                
            }
        }

        $myJSON = json_encode($jsonArr);
        file_put_contents($PATH, $myJSON);

        $success->state = "success";
        echo(json_encode($success));
        exit;

    }
}

deleteTask();
?>