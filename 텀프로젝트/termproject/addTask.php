<?php

/* 
 * 과목에 대한 일정의 정보를 저장하는 PHP.
 * 파일이름은 과목명.json 이고, 과목명이 겹치지 않도록 js에서 예외처리를 해주었다. 마찬가지로 같은 과목 내에서
 * 같은 이름의 일정이 존재하지 않도록 js에서 일전에 차단해두었다.
 * 일정명, 중요도, 마감일 등의 데이터가 JSON 형태로 해당 경로에 저장된다.
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
function addTask(){

    global $PATH;
    global $data;
    
    $title = test_input($data["title"]);
    $keyword = test_input($data["keyword"]);
    $flag = test_input($data["flag"]);
    $deadline = test_input($data["deadline"]);
    $check = test_input($data["checked"]);

    if(is_file($PATH)){  // task 파일이 이미 생성되어 있는 경우

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true); // json 형태의 데이터를 가지고 있는 배열이 생성
        
        for ($i=0; $i < sizeof($jsonArr); $i++) { 
            if($jsonArr[$i]["title"] === $title){
                echo "EXIST_FAIL";
                exit;
            }
        }

        // 클라이언트에서 받아온 데이터를 가진 객체 생성 
        if(!isset($myObj)){
            $myObj = new stdClass();
        }
        $myObj->title = $title;
        $myObj->keyword = $keyword;
        $myObj->flag = $flag;
        $myObj->deadline = $deadline;
        $myObj->checked = $check;

        array_push($jsonArr, $myObj); // 해당 객체를 jsonArr 배열에 push

        $myJSON = json_encode($jsonArr); // json_encode
        file_put_contents($PATH, $myJSON); // file 저장

        echo "SUCCESS";
        exit;

    } else {

        // 클라이언트에서 받아온 데이터를 가진 객체 생성 
        if(!isset($myObj)){
            $myObj = new stdClass();
        }
        $myObj->title = $title;
        $myObj->keyword = $keyword;
        $myObj->flag = $flag;
        $myObj->deadline = $deadline;
        $myObj->checked = $check;

        $myObjArr = [$myObj];

        $myJSON = json_encode($myObjArr); // json_encode
        file_put_contents($PATH, $myJSON); // file 저장

        echo "SUCCESS";
        exit;

    }
}

addTask();

?>