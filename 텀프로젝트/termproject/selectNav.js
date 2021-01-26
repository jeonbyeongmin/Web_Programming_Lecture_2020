
// 상단 Navigation에서 "과목 섹션"을 눌렀을 때
document.getElementById("subjectButton").addEventListener("click", function(){
    document.getElementById("subjectSection").style.removeProperty("display");
    document.getElementById("keywordSection").style.display = "none";
    document.getElementById("addSubjectButton").style.removeProperty("display");

    document.getElementById("subjectButton").style.backgroundColor = "white";
    document.getElementById("subjectButton").style.color = "black";
    document.getElementById("keywordButton").style.backgroundColor = "mediumseagreen";
    document.getElementById("keywordButton").style.color = "white";
    getTask();
});

// 상단 Navigation에서 "키워드 섹션"을 눌렀을 때
document.getElementById("keywordButton").addEventListener("click", function(){

    document.getElementById("subjectSection").style.display = "none";
    document.getElementById("keywordSection").style.removeProperty("display");
    document.getElementById("addSubjectButton").style.display = "none";

    document.getElementById("subjectButton").style.backgroundColor = "mediumseagreen";
    document.getElementById("subjectButton").style.color = "white";
    document.getElementById("keywordButton").style.backgroundColor = "white";
    document.getElementById("keywordButton").style.color = "black";
    getTask();
});