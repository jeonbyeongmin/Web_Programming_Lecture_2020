<?php

// 로그인을 위한 PHP

session_start();

$PATH = "./data/id.json"; // person json 데이터 저장 경로

if(!isset($result)){ // 클라이언트로 보내줄 객체 생성
    $result = new stdClass();
}

// validation check function
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function login(){

    global $PATH;
    global $result;

    $id = $pw = "";
    
    if (isset($_POST["data"])){ // validation check
        $data = json_decode($_POST["data"], true);
        $id = test_input($data["id"]);
        $pw = test_input($data["pw"]);
    }

    if(is_file($PATH)){ 

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true); // json 형태의 데이터를 가지고 있는 배열이 생성됨
        $check = false;
        
        for ($i=0; $i < sizeof($jsonArr); $i++) { 
            if($jsonArr[$i]["id"] === $id && $jsonArr[$i]["pw"] === $pw){
                $check = true; // id와 pw가 일치 
            break;
            }
        }

        if($check){ // id와 pw가 일치하는 데이터가 있을 때
            $_SESSION["id"] = $id; // session에 id 정보를 저장
            $result->id = $id;
            $result->state = "success";
            echo(json_encode($result));
            exit;
        } else { // 일치하는 데이터가 없을 때
            $result->id = $id;
            $result->state = "fail";
            echo(json_encode($result));
            exit;
        }
    } else {
        $result->id = $id;
        $result->state = "fail";
        echo(json_encode($result)); // 파일이 없을 경우 입력한 id가 존재하지 않기 때문에 에러 메시지 전송
        exit;
    }

}

login();

?>