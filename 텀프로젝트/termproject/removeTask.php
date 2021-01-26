<?php

// 일정 삭제를 위한 PHP

session_start();

if(!isset($success)){            // 클라이언트로 보내줄 객체 생성
    $success = new stdClass();
}
if(!isset($fail)){              // 실패시 클라이언트로 보내줄 객체 생성
    $fail = new stdClass();
}

if(!isset($_SESSION["id"])){
    $fail->state = "SESSION_FAIL";
    echo(json_encode($fail));
    exit;
}

$subjectTitle = $taskTitle = "";

if (isset($_POST["data"])){ // validation check
    $data = json_decode($_POST["data"], true);
    $subjectTitle = test_input($data["subject"]);
    $taskTitle = test_input($data["title"]);
}
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function deleteTask(){

    $id = $_SESSION["id"];

    global $subjectTitle;
    global $taskTitle;
    global $success;
    global $fail;

    $PATH = "./data/" . $id . "/subject/" . $subjectTitle. ".json";

    if(is_file($PATH)){

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true);

        for($i = 0; $i < sizeof($jsonArr); $i++){
            if($taskTitle == $jsonArr[$i]["title"]){
                array_splice($jsonArr, $i, 1);
            }
        }

        $myJSON = json_encode($jsonArr);
        file_put_contents($PATH, $myJSON);

        $success->state = "SUCCESS";
        echo(json_encode($success));
    }
}
deleteTask();

?>
