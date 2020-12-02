<?php

if(!is_dir("./data")) {
    mkdir("./data");
}

$PATH = "./data/person.json"; // 파일 경로

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


function createAccount(){

    global $PATH;
    global $result;

    $id = $pw = "";

    if(isset($_POST["data"])){
        $data = json_decode($_POST["data"], true);
        $id = test_input($data["id"]);
        $pw = test_input($data["pw"]);
    }

    if(is_file($PATH)){

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true);

        for($i = 0; $i < sizeof($jsonArr); $i++){
            if($jsonArr[$i]["id"] === $id){
                $result->id = $id;
                $result->state = "fail";
                echo(json_encode($result));
                exit;
            }
        }

        if(!isset($myObj)){
            $myObj = new stdClass();
        }
        $myObj->id = $id;
        $myObj->pw = $pw;

        array_push($jsonArr, $myObj);

        $myJSON = json_encode($jsonArr);
        file_put_contents($PATH, $myJSON);

        $result->id = $id;
        $result->state = "success";
        echo(json_encode($result));

        exit;
    } else {

        if(!isset($myObj)){
            $myObj = new stdClass();
        }
        $myObj->id = $id;
        $myObj->pw = $pw;

        $myObjArr = [$myObj]; // 배열 생성

        $myJSON = json_encode($myObjArr);
        file_put_contents($PATH, $myJSON);

        $result->id = $id;
        $result->state = "success";
        echo(json_encode($result));
        exit;
    }
}

createAccount();


?>