<?php
session_start(); // 현재 세션이 가지고 있는 id와 받은 데이터의 id를 비교

/* 로그인에 성공했을 때 서버와의 통신과 관련된 PHP */

$id = $year = $month = $date = "";

$week = [];

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
    $temp = json_decode($data["week"], true);

    $id = $_SESSION["id"];

    for($i = 0; $i < sizeof($temp); $i++){
        $year = test_input($temp[$i]["year"]);
        $month = test_input($temp[$i]["month"]);
        $date = test_input($temp[$i]["date"]);

        $week[$i] = [
            'year' => $year,
            'month' => $month,
            'date' => $date
        ];
    }
}

// validation check function
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}




function task(){

    global $id;
    global $result;
    global $week;
    global $fail;

    $resultArr = [];
    $count = 0;


    for($i=0; $i < sizeof($week); $i++){ // 일주일간 만들어진 일정을 모두 확인하기 위해서
        $temp = $week[$i]["month"]+1;
        $temp2 = "0" . $temp;
        $temp2 = substr($temp2, -2);

        $PATH = "./data/" . $id . "_" . $week[$i]["year"] . $temp2 . ".json";
        
        if(is_file($PATH)){ // 파일이 있는 경우

            $json = file_get_contents($PATH);
            $jsonArr = json_decode($json, true); // json 형태의 데이터를 가지고 있는 배열이 생성됨            


            for ($j=0; $j < sizeof($jsonArr); $j++) { // 파일을 끝까지 읽으며
                $result->date = $jsonArr[$j]["date"];
                $result->time = $jsonArr[$j]["time"];
                $result->title = $jsonArr[$j]["title"];
                $result->description = $jsonArr[$j]["description"];
                
                if(!in_array(json_encode($result), $resultArr)){
                    array_push($resultArr, json_encode($result));
                }
                $count++;
            }
            
    
        }
    }
    if($count === 0){
        $fail->state = "noData";
        echo(json_encode($fail));
    } else{
        echo(json_encode($resultArr));
    }
    
}

task();

?>