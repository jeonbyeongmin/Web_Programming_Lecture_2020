
var tryit = document.getElementById("tryButton");
var canvas = document.getElementById("myCanvas");

tryit.addEventListener("click", function(){

    
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(82,50,40,0,2*Math.PI);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.stroke();

    var ctx3 = canvas.getContext("2d");
    ctx3.beginPath();
    ctx3.arc(62,40,10,3,2*Math.PI);
    ctx3.lineWidth = 3;
    ctx3.strokeStyle = "red";
    ctx3.stroke();

    var ctx4 = canvas.getContext("2d");
    ctx4.beginPath();
    ctx4.arc(102,40,10,3,2*Math.PI);
    ctx4.lineWidth = 3;
    ctx4.strokeStyle = "red";
    ctx4.stroke();

    var ctx5 = canvas.getContext("2d");

    ctx.moveTo(60,70);
    ctx.lineTo(105,70);
    ctx5.lineWidth = 3;
    ctx5.strokeStyle = "red";
    ctx5.stroke();

    var ctx2 = canvas.getContext("2d");
    ctx2.font = "italic bold 40px Georgia, serif";
    ctx2.fillStyle ="blue";
    ctx2.fillText("Merry Christmas!!",150,60);

    var context = canvas.getContext("2d");
    var video = document.getElementById('video');
    context.shadowColor = "rgba(0, 0, 0, 0.5)";
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 10;
    video.play();
    myFunction(context, video);
})

function myFunction(context, video) {
    setInterval(function(){ context.drawImage(video,50,120,700,500); }, 20);
}