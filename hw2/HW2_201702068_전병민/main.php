<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HW2 201702068 전병민</title>
    <link rel="stylesheet" href="style.css">
    
    <!-- jquery 관련 script -->
    <script  src="http://code.jquery.com/jquery-latest.min.js"></script>

</head>
<body>
    <div id="header">
        <input type="button" id="addButton" value="Add" disabled>

        <!-- float right 속성 적용 시 순서가 뒤바뀌기 때문에 순서를 바꿔서 입력-->
        <input type="button" id="logoutButton" value="Logout">
        <input type="button" id="joinButton" value="Join">
        <?php
            if(isset($_SESSION['id'])){
                echo '<span id="currentId">' . $_SESSION['id'] . '</span>';
            }
        ?>
    </div>
    <br>
    <br>
    <br>
    <div id="calendarWrap">
        <div id="yearMonth">
            <span id="year"></span>
            <span>년</span>
            <span>&nbsp;&nbsp;</span>
            <span id="month"></span>
            <span>월</span>
        </div>
        <div id="calenderTable">
            <table id="calendar">
                <tr id="week" class="calendarRow">
                    <td class="col0">
                        <span id="day0" class="day"></span>
                        <span>(Sun)</span>
                    </td>
                    <td class="col1">
                        <span id="day1" class="day"></span>
                        <span>(Mon)</span>
                    </td>
                    <td class="col2">
                        <span id="day2" class="day"></span>
                        <span>(Tue)</span>
                    </td>
                    <td class="col3">
                        <span id="day3" class="day"></span>
                        <span>(Wed)</span>
                    </td>
                    <td class="col4">
                        <span id="day4" class="day"></span>
                        <span>(Thu)</span>
                    </td>
                    <td class="col5">
                        <span id="day5" class="day"></span>
                        <span>(Fri)</span>
                    </td>
                    <td class="col6">
                        <span id="day6" class="day"></span>
                        <span>(Sat)</span>
                    </td>
                </tr>
                <tr id="weekContent" class="calendarRow">
                    <td class="col0 contentsWrap" id="content0"></td>
                    <td class="col1 contentsWrap" id="content1"></td>
                    <td class="col2 contentsWrap" id="content2"></td>
                    <td class="col3 contentsWrap" id="content3"></td>
                    <td class="col4 contentsWrap" id="content4"></td>
                    <td class="col5 contentsWrap" id="content5"></td>
                    <td class="col6 contentsWrap" id="content6"></td>
                </tr>
            </table>
        </div>
    </div>

    <div id="joinFormWrap">
        <div id="joinFormContainer">
            <table id="joinFormTable">
                <tr class="joinFormRow">
                    <td><label for="id" class="joinFormCol">id</label></td>
                    <td colspan="2"><input type="text" naem="id" id="id"></td>
                </tr>
                <tr class="joinFormRow" class="joinFormCol">
                    <td><label for="pw">password</label></td>
                    <td colspan="2"><input type="password" name="pw" id="pw"></td>
                </tr>
                <tr class="joinFormRow">
                    <td></td>
                    <td><input type="button" value="Login" id="loginButton"></td>
                    <td><input type="button" value="Signin" id="signinButton"></td>
                </tr>
            </table>
        </div>
    </div>

    <div id="addFormWrap">
        <div id="addFormContainer">
            <table id="addFormTable">
                <tr class="addFormRow">
                    <td><label for="date">date</label></td>
                    <td>
                        <input type="date" name="date" id="date">
                        <input type="time" name="time" id="time">
                    </td>
                </tr>
                <tr class="addFormRow">
                    <td><label for="title">title</label></td>
                    <td><input type="text" id="title" name="title"></td>
                </tr>
                <tr class="addFormRow">
                    <td><label for="description">description</label></td>
                    <td><input type="text" id="description" name="description"></td>
                </tr>
                <tr class="addFormRow">
                    <td></td>
                    <td>
                        <input type="button" id="saveButton" value="Save">
                        <input type="button" id="updateButton" value="Update" disabled>
                        <input type="button" id="submitButton" value="Submit" disabled>
                        <input type="button" id="deleteButton" value="Delete" disabled>
                        <input type="button" id="cancelButton" value="Cancel">
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <script src="function.js"></script>
</body>
</html>