<?php

/* 
 * 할일 목록을 체크하면 서버에서 해당 과목 파일에서 해당 일정의 제목을 찾아서 체크하는 PHP
 * 이미 체크되어 있다면 체크를 해제를 JSON 파일에 표시하도록 하였다. 
 * 다른 JSON 항목들 즉 일정명 등의 데이터와 같은 JSON 파일을 공유한다.
 */


session_start();

$data;

// data가 넘어오지 않았다면 에러 메시지 출력
if(isset($_POST["data"])){
    $data = json_decode($_POST["data"], true);
} else {
    echo "FAIL";
    exit;
}

// 만약 세션에 아이디가 저장되어 있지 않다면 에러 메시지 출력
if(!isset($_SESSION["id"])){
    echo "LOG_FAIL";
    exit;
}

// ./data/사용자ID/과목이름 디렉토리가 없을 경우 생성하는 과정
if(!is_dir("./data/" . $_SESSION["id"])){
    mkdir("./data/" . $_SESSION["id"]);
}

// ./data/사용자ID/과목이름 디렉토리가 없을 경우 생성하는 과정
if(!is_dir("./data/" . $_SESSION["id"]. "/subject")){
    mkdir("./data/" . $_SESSION["id"] . "/subject");
}

// 파일 저장 경로
$PATH = "./data/" . $_SESSION["id"] . "/subject/" . $data["subject"] . ".json";

// validation check function
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


// 사용자가 일정을 추가하면 파일에서도 일정 추가
function addChecked(){

    global $PATH;
    global $data;

    $title = test_input($data["title"]);


    if(is_file($PATH)){  // task 파일이 이미 생성되어 있는 경우

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true); // json 형태의 데이터를 가지고 있는 배열이 생성
        
        for ($i=0; $i < sizeof($jsonArr); $i++) { 
            if($jsonArr[$i]["title"] === $title){

                if($jsonArr[$i]["checked"] == "false"){ // 채크가 안되어 있다면
                    $jsonArr[$i]["checked"] = "true";   // 체크해준다
                }
                else {                                  // 이미 체크가 되어 있는 상태였다면
                    $jsonArr[$i]["checked"] = "false";  // 체크를 해제해준다.
                }

                $myJSON = json_encode($jsonArr); // json_encode
                file_put_contents($PATH, $myJSON); // file 저장

                echo "SUCCESS";
                exit;
            }
        }
    }
}

addChecked();

?>