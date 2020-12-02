<?php 

session_start();

if(!isset($data)){ // 클라이언트로 보내줄 객체 생성
    $data = new stdClass();
}

if(isset($_SESSION["id"])){

    session_destroy();
    $data->state = "logout";
    echo(json_encode($data));
    exit;

} else {

    $data->state = "error";
    echo(json_encode($data));
    exit;

}

?>