//<link rel="stylesheet" type="text/css" href="note.css">
var notecss = document.createElement("link");
notecss.rel = "stylesheet";
notecss.type = "text/css";
notecss.href = "note/note.css";

document.head.appendChild(notecss);

var offset;
var beingMoved;

window.addEventListener('mouseup', mouseUp, false);

function move(event) {
  console.log("move");
  event.preventDefault();
  mousePosition = {
          x : event.clientX,
          y : event.clientY
  };
  //beingMoved.style.position = "absolute";
  beingMoved.style.left = (mousePosition.x + offset[0]) + 'px';
  beingMoved.style.top  = (mousePosition.y + offset[1]) + 'px';
};

function mouseUp() {
  console.log("up");
  window.removeEventListener('mousemove', move, true);
}

function Note(name, width, height){
    this.m_name = name;
    this.m_htmlObject = document.createElement("div");

    document.body.appendChild(this.m_htmlObject);


    //this.m_htmlObject.load("note.html");
    this.m_htmlObject.id = name;
    this.m_htmlObject.style.width = width + 'px';
    this.m_htmlObject.style.height = height + 'px';
    this.m_htmlObject.style.position = "absolute";
    this.m_htmlObject.style.left = "100px";
    this.m_htmlObject.style.top = "100px";
    //<link rel="stylesheet" type="text/css" href="page.css">
    //this.m_htmlObject.innerHTML = '<div id = "note" style = "pointer-events: none; height: 100%; width: 100%; background-color: rgba(0, 0, 0, .8); border-radius: 10px;"> <textarea style = "pointer-events: auto; margin: 5%; width: 90%; height: 92.5%; font-family: ComingSoon; font-size: 16px; color: #333; background-color: rgba(0, 0, 0, 0); border: rgba(0, 0, 0, 0); resize: none;"> </textarea></div>';

    var object = this.m_htmlObject;

    var xhr= new XMLHttpRequest();
    xhr.open('GET', 'note/note.html', true);
    xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want
        object.innerHTML = this.responseText;
    };
    xhr.send();

    this.m_htmlObject.addEventListener('mousedown', mouseDown, false);

    return this;
  }

var mouseDown = function(e) {
  console.log("down");
  if(e.target.nodeName == "TEXTAREA")
    beingMoved = e.target.parentNode.parentNode;
  else beingMoved = e.target;
  offset = [
      beingMoved.offsetLeft - e.clientX,
      beingMoved.offsetTop - e.clientY
  ];
  window.addEventListener('mousemove', move, true);
}
