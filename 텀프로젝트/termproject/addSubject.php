<?php

/* 
 * 과목 추가 버튼을 눌렀을 때 작동하는 PHP 파일
 * $PATH -- 이 파일에 과목 이름만 저장해서 통합적으로 과목을 관리한다.
 * $PATH2 -- 이 파일은 다른 JSON 데이터 항목들과 공유하는 JSON 파일이다.
 */

session_start();

$title;

if(isset($_POST["data"])){
    $title = test_input($_POST["data"]);
}


if(!isset($fail)){ // 실패시 클라이언트로 보내줄 객체 생성
    $fail = new stdClass();
}

if(!isset($success)){ // 성공시 클라이언트로 보내줄 객체 생성
    $success = new stdClass();
}



if(!isset($_SESSION["id"])){
    $fail->state = "session_fail";
    echo(json_encode($fail));
    exit;
}

// ./data/사용자ID 디렉토리가 없을 경우 생성하는 과정
if(!is_dir("./data/" . $_SESSION["id"])){
    mkdir("./data/" . $_SESSION["id"]);
}

// ./data/사용자ID/과목이름 디렉토리가 없을 경우 생성하는 과정
if(!is_dir("./data/" . $_SESSION["id"]. "/subject/")){
    mkdir("./data/" . $_SESSION["id"]. "/subject/");
}

// 파일 저장 경로
$PATH = "./data/" . $_SESSION["id"] . "/subject.json";


// validation check function
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


function addTask(){

    global $PATH;
    global $title;
    global $fail;
    global $success;


    $PATH2 = "./data/" . $_SESSION["id"] . "/subject/" . $title . ".json"; 
    
    if(!is_file($PATH2)){

        $myObjArr = [];
        $myJSON = json_encode($myObjArr); // json_encode
        file_put_contents($PATH2, $myJSON); // file 저장
    }

    if(is_file($PATH)){  // task 파일이 이미 생성되어 있는 경우

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true); // json 형태의 데이터를 가지고 있는 배열이 생성
        
        for ($i=0; $i < sizeof($jsonArr); $i++) { 
            if($jsonArr[$i] === $title){
                $fail->state = "exist_fail";
                echo(json_encode($fail));
                exit;
            }
        }

        array_push($jsonArr, $title); // 해당 객체를 jsonArr 배열에 push
        $myJSON = json_encode($jsonArr); // json_encode
        file_put_contents($PATH, $myJSON); // file 저장

        $success->state = "success";
        echo(json_encode($success));

        exit;

    } else {

        $myObjArr = [$title];

        $myJSON = json_encode($myObjArr); // json_encode
        file_put_contents($PATH, $myJSON); // file 저장

        $success->state = "success";
        echo(json_encode($success));

        exit;

    }
}

addTask();

?>