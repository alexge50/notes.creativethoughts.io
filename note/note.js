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

    this.m_htmlObject.id = name;
    this.m_htmlObject.style.width = width + 'px';
    this.m_htmlObject.style.height = height + 'px';
    this.m_htmlObject.style.position = "absolute";
    this.m_htmlObject.style.left = "100px";
    this.m_htmlObject.style.top = "100px";
    //<link rel="stylesheet" type="text/css" href="page.css">
    this.m_htmlObject.innerHTML = '<div id = "note" style = "pointer-events: none; height: 100%; width: 100%; background-color: #eee; border-radius: 10px;"> <textarea style = "pointer-events: auto; margin: 5%; width: 90%; height: 92.5%; font-family: ComingSoon; font-size: 16px; color: #333; background-color: rgba(0, 0, 0, 0); border: rgba(0, 0, 0, 0); resize: none;"> </textarea></div>';

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
