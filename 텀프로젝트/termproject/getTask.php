<?php

/* 해당 아이디에 있는 과목과 일정에 대한 데이터를 JSON 형태로 클라이언트로 보내줌 */

session_start();

// validation check function
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$id = "";

if(!isset($result)){ // 클라이언트로 보내줄 객체 생성
    $result = new stdClass();
}


if(!isset($fail)){ // 실패시 클라이언트로 보내줄 객체 생성
    $fail = new stdClass();
}

if(!isset($_SESSION["id"])){
    $fail->state = "session_fail";
    echo(json_encode($fail));
    exit;
}

if (isset($_POST["data"])){ // validation check
    $data = json_decode($_POST["data"], true);
    $id = $data["id"];
}


function task(){

    global $id;
    global $fail;
    global $result;
    $subjects = [];
    $resultArr = [];
    $PATH = "./data/" . $id . "/subject.json";

    // echo $PATH;

    if(is_file($PATH)){ // 파일이 있는 경우

        $json = file_get_contents($PATH);
        $jsonArr = json_decode($json, true); // json 형태의 데이터를 가지고 있는 배열이 생성됨            

        for ($i=0; $i < sizeof($jsonArr); $i++) { // 파일을 끝까지 읽으며
            array_push($subjects, $jsonArr[$i]);
        }
    } 
    else { // subject 파일이 없으면 등록된 과목이 없다는 뜻
        $fail->state = "noData";
        echo(json_encode($fail));
        exit;
    }


    $count = 0;

    for($i=0; $i < sizeof($subjects); $i++){

        $PATH = "./data/" . $id . "/subject/" . $subjects[$i] . ".json";
        
        if(is_file($PATH)){

            $json = file_get_contents($PATH);
            $jsonArr = json_decode($json, true);

            if(sizeof($jsonArr) == 0){
                $result->subject = $subjects[$i];
                $result->title =  "";
                $result->keyword =  "";
                $result->flag = "";
                $result->deadline = "";
                $result->checked = "";
                if(!in_array(json_encode($result), $resultArr)){
                    array_push($resultArr, json_encode($result));
                }
            }
            else {
                for ($j=0; $j < sizeof($jsonArr); $j++) {
                    $result->subject = $subjects[$i];
                    $result->title = $jsonArr[$j]["title"];
                    $result->keyword = $jsonArr[$j]["keyword"];
                    $result->flag = $jsonArr[$j]["flag"];
                    $result->deadline = $jsonArr[$j]["deadline"];
                    $result->checked = $jsonArr[$j]["checked"];
                    
                    if(!in_array(json_encode($result), $resultArr)){
                        array_push($resultArr, json_encode($result));
                    }
                    $count++;
                }
            }
        }
    }
    echo(json_encode($resultArr));
}

task();

?>