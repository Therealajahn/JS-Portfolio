let width = 60;
let height = 40;

let figure = document.getElementsByTagName("figure")[0];

figure.style.setProperty("width", `${width}vw`);
figure.style.setProperty("height", `${height}vw`);

let canvas = document.getElementById("canvas");

const back = document.getElementById("back");
let backHeight = height * 0.6;
let backWidth = width * 0.6;
let backXspace = (width - backWidth) / 2;
let backYspace = (height - backHeight) / 2;

back.setAttribute("id", "back");
back.setAttribute("width", `${backWidth}vw`);
back.setAttribute("height", `${backHeight}vw`);
back.setAttribute("x", `${backXspace}vw`);
back.setAttribute("y", `${backYspace}vw`);
back.setAttribute("rx", "1.5vw");
back.setAttribute("fill", `#d9d9d9`);

const paddedWidth = backWidth * 0.9;
const gridlingSize = paddedWidth / 16;
const margin = { left: 1.9, top: 2.5 };
const space = 1.1;

for (let row = 1; row <= 10; row++) {
  for (let column = 1; column <= 16; column++) {
    // console.log(canvas);
    canvas.insertAdjacentHTML(
      "beforeend",
      ` <rect class="gridling"
     x=${backXspace + gridlingSize * (column * space) - margin.left}vw
     y=${backYspace + gridlingSize * (row * space) - margin.top + space}vw
      width= ${gridlingSize}vw
      height= ${gridlingSize}vw
      rx=.2vw
      fill="#000"></rect>`
    );
  }
}
