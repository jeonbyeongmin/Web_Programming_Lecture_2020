


/************************** Drag and Drop ******************************/

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  countImg();
}

function countImg() {
    var div1 = document.getElementById("a");
    var div2 = document.getElementById("b");

    if (typeof(Storage) !== "undefined") {
      sessionStorage.setItem(div1.id, div1.childElementCount);
      sessionStorage.setItem(div2.id, div2.childElementCount);
      
    }
}



/****************************** Worker ************************************ */

var w;

function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
           w = new Worker("demo_workers.js");
        }
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
            if(event.data === 40){
                stopWorker();
                alert("A 장바구니 : " + sessionStorage.getItem("a") + " B 장바구니 : " + sessionStorage.getItem("b"));
                document.getElementById("addIMG").setAttribute('disabled', true);
                document.getElementById("startBT").removeAttribute('disabled');
            }
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}

function stopWorker() { 
    w.terminate();
    w = undefined;
}

document.getElementById("startBT").addEventListener("click", function(){
    startWorker();
    document.getElementById("addIMG").removeAttribute('disabled');
    document.getElementById("startBT").setAttribute('disabled', true);
    
});




/**************************** Add Image ********************************* */

var count = 1;

function addImage(){
    var _images = document.getElementById("images");
    var _file = document.getElementById("file");
    
    var image = document.createElement('img');
    image.src =_file.files[0].name;
    image.className = "img";
    image.width = 300;
    image.height = 200;
    image.draggable = true;
    image.id ="drag" + count++;
    image.setAttribute('ondragstart', 'drag(event)');
    _images.appendChild(image);
}

document.getElementById("addIMG").addEventListener("click", addImage);


