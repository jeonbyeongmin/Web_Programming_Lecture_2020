<?php
session_start(); // 현재 세션이 가지고 있는 id와 받은 데이터의 id를 비교

/* 할 일을 추가했을 때 서버와의 통신과 관련된 PHP */


if(!isset($result)){ // 성공시 클라이언트로 보내줄 객체 생성
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

$date = $time = $title = $description = "";


if (isset($_POST["data"])){ // validation check
    $data = json_decode($_POST["data"], true);

    $date = test_input($data["date"]);
    $time = test_input($data["time"]);
    $title = test_input($data["title"]);
    $description = test_input($data["description"]);

}

// validation check function
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}




function tasks(){

    global $date;
    global $time;
    global $title;
    global $description;
    global $success;
    global $fail;

    if(!isset($_SESSION["id"])){ // 세션에 아이디 없으면 종료
        $fail->state = "session_fail";
        echo(json_encode($fail));
        exit;
    }

    $id = $_SESSION["id"]; // 세션에서 아이디 정보 가져옴



    $yearAndMonth = explode("-", $date);

    $PATH = "./data/" . $id . "_" . $yearAndMonth[0] . $yearAndMonth[1] . ".json"; 

    if(is_file($PATH)){ // 파일이 이미 있다면?

        $json = file_get_contents($PATH); // 파일 가져오고
        $jsonArr = json_decode($json, true); // array로 디코드

        for($i = 0; $i < sizeof($jsonArr); $i++){
            if($jsonArr[$i]["date"] === $date && $jsonArr[$i]["time"] === $time){
                $fail->state = "exist_fail"; // 같은 날짜 같은 시간에 작업이 있어 파일 저장 실패
                echo(json_encode($fail));
                exit;
            }
        }

        if(!isset($myObj)){
            $myObj = new stdClass();
        }
        $myObj->date = $date;
        $myObj->time = $time;
        $myObj->title = $title;
        $myObj->description = $description;
        
        array_push($jsonArr, $myObj);

        $myJSON = json_encode($jsonArr);
        file_put_contents($PATH, $myJSON);

        $success->state = "success";
        echo(json_encode($success));
        exit;

    } else { // 파일이 없을 때

        if(!isset($myObj)){
            $myObj = new stdClass();
        }
        $myObj->date = $date;
        $myObj->time = $time;
        $myObj->title = $title;
        $myObj->description = $description;

        $myObjArr = [$myObj]; // 배열 생성

        $myJSON = json_encode($myObjArr);
        file_put_contents($PATH, $myJSON);

        $success->state = "success";
        echo(json_encode($success));
        exit;
    }
    
}

tasks();

?>