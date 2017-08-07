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

    this.m_htmlObject.id = name;
    this.m_htmlObject.style.width = width + 'px';
    this.m_htmlObject.style.height = height + 'px';
    this.m_htmlObject.style.position = "absolute";
    this.m_htmlObject.style.left = "100px";
    this.m_htmlObject.style.top = "100px";
    this.m_htmlObject.style.pointerEvents = 'none';

    var object = this.m_htmlObject;

    var xhr= new XMLHttpRequest();
    xhr.open('GET', 'note/note.html', true);
    xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        object.innerHTML = this.responseText;
    };
    xhr.send();

    this.m_htmlObject.addEventListener('mousedown', mouseDown, false);

    return this;
  }

var mouseDown = function(e) {
  console.log("down");
  if(e.target.id == "move")
  {
    beingMoved = e.target.parentNode.parentNode;
    offset = [
        beingMoved.offsetLeft - e.clientX,
        beingMoved.offsetTop - e.clientY
    ];
    window.addEventListener('mousemove', move, true);
  }
}
