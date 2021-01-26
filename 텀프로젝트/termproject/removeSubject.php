<?php

// 과목 자체를 삭제하기 위한 PHP

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

$subject = "";

if (isset($_POST["data"])){ // validation check
    $data = json_decode($_POST["data"], true);
    $subject = test_input($data["subject"]);
}
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function deleteSubject(){

    $id = $_SESSION["id"];

    global $subject;
    global $success;
    global $fail;

    $PATH = "./data/" . $id . "/subject.json";
    $DATAPATH = "./data/" . $id . "/subject/" . $subject. ".json";

    if(is_file($DATAPATH)){     // 해당 과목 자체 json 파일 삭제
        unlink($DATAPATH);    
    }
    if(is_file($PATH)){         // 과목 명단에서 해당 과목 이름 제거

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true);

        for($i = 0; $i < sizeof($jsonArr); $i++){
            if($subject == $jsonArr[$i]){
                array_splice($jsonArr, $i, 1);
            }
        }

        $myJSON = json_encode($jsonArr);
        file_put_contents($PATH, $myJSON);

        $success->state = "SUCCESS";
        echo(json_encode($success));
    }
}
deleteSubject();

?>
