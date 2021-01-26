<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">

    <title>Todo List For Student</title>

    <!-- JS 라이브러리를 위한 link 와 script (Ajax / Bootstrap) -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    <!-- css를 외부파일로 받기 -->
    <link rel="stylesheet" href="style.css">

    <!-- jquery 관련 script -->
    <script  src="http://code.jquery.com/jquery-latest.min.js"></script>

  </head>
  <body class="container"> <!-- 부트스트랩 Container 이용 -->

      <!-- HEADER -->
    <header class="row">
      <h1>TLFS</h1>
      <?php 
        if(!isset($_SESSION["id"])) {
          echo "<a href='login.html' id='loginBT'>Login</a>";
        } else {
          echo '<span id="currentId">' . $_SESSION['id'] . '</span>';
          echo "<input type='button' id='logoutBT' value='Logout'>";
        }
      ?>
      
    </header>

    <!-- 과목섹션 버튼 및 키워드섹션 버튼 (Navigation) -->
    <nav class="row">
      <input class="col-md-6" type="button" id="subjectButton" value="과목 섹션">
      <input class="col-md-6" type="button" id="keywordButton" value="키워드 섹션">
    </nav>

    <br>

    <!-- 정렬 방법 선택 -->
    <select name="sort" id="sortlist" class="sortlist" onchange="getTask()">
        <option value="deadline">마감일순</option>
        <option value="flag">중요도순</option>
    </select>
    <br>


    <!-- 과목섹션 -->
    <section id="subjectSection" class="row">
      
    </section>

    <!-- 키워드섹션 -->
    <section id="keywordSection" class="row" style="display: none">
      <div class="keywordContainer col-lg-6 col-12">
        <h1>homework</h1>
        <hr>
        <table class="taskContainer">
        </table> 
      </div>
      <div class="keywordContainer col-lg-6 col-12">
        <h1>lecture</h1>
        <hr>
        <table class="taskContainer">
        </table> 
      </div>
      <div class="keywordContainer col-lg-6 col-12">
        <h1>test</h1>
        <hr>
        <table class="taskContainer">
        </table> 
      </div>
      <div class="keywordContainer col-lg-6 col-12">
        <h1>other</h1>
        <hr>
        <table class="taskContainer">
        </table> 
      </div>
    </section>

      
    <!-- 과목 추가 버튼 -->
    <div id="addSubject">
      <input type="button" id="addSubjectButton" value="+">
    </div>

    <!-- 일정 추가 팝업 -->
    <div id="black_bg"></div> <!-- 팝업 뒤로 클릭되는 것을 막기 위해서 -->
    <div class="wrap" >
      <div class="form-container" id="myForm">

        <!-- 일정 이름 입력 -->
        <h1> 
          <input type="text" id="taskTitle" name="taskTitle" placeholder="일정 이름을 입력해주세요.">
        </h1>
        <br>
        
        <!-- 키워드 선택 -->
        <input type="radio" id="homework" name="keyword" value="homework">
        <label for="homework" class="radioText">과제 &nbsp;&nbsp; </label>

        <input type="radio" id="lecture" name="keyword" value="lecture">
        <label for="lecture"class="radioText">강의 &nbsp;&nbsp; </label>

        <input type="radio" id="test" name="keyword" value="test">
        <label for="test"class="radioText">시험 &nbsp;&nbsp; </label>

        <input type="radio" id="other" name="keyword" value="other">
        <label for="other"class="radioText">기타&nbsp;&nbsp; </label>
        <br>
        <br>
  
        <!-- 중요도 선택 -->
        <label for="flag">중요도</label>
        <input type="range" id="flag" min="1" max="5" step="1" name="products-price">
        <output for="flag"></output>
        <br>
  
        <!-- 마감일 선택 -->
        <label for="deadline">마감일</label>
        <input type="datetime-local" id="deadline" name="products-count">
        <br>
        <br>
        <hr>

        <!-- Form 관련 버튼 -->
        <div id="formButtons">
          <input type="button" id="cancelButtonInForm" value="취소">
          <input type="button" id="addTaskButtonInForm" value="일정 추가">
        </div>
      </div>    
    </div>
    <script src="function.js"></script>
    <script src="selectNav.js"></script>
    <script src="logout.js"></script>
    <script src="getTask.js"></script>
  </body>
  
</html>
