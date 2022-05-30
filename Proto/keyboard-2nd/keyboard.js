let figure = d3
  .select("figure")
  .style("width", "40vw")
  .style("height", "25vw")
  .style("align-self", "center");

let canvas = figure.append("svg");
canvas.call(handleResize);

d3.select(window).on("resize", handleResize);

function handleResize() {
  const width = computeStyle(figure).width;
  const height = computeStyle(figure).height;
  canvas.attr("width", width).attr("height", height);
}

function computeStyle(element) {
  const style = window.getComputedStyle(element.node());
  return {
    width: parseInt(style.width),
    height: parseInt(style.height),
  };
}

createBlockField(canvas, createDataInit, computeStyle);

function createBlockField() {
  const flatGrid = flattenData(createDataInit());
  console.log(flatGrid);

  function createBack() {
    canvas
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("rx", "1vw")
      .attr("fill", "#d9d9d9")
      .attr("id", "back");
  }
  createBack();

  function createGridlings() {
    const fraction = 0.9;
    const spaceBetween = 2;
    const computeBack = computeStyle(d3.select("#back"));
    let gridlingSize = (computeBack.height * fraction) / 10;

    //after failing to center the gridlings, I decided to go back to my older approach using viewport units
    margin = {
      left:
        (computeBack.height -
          computeBack.height * fraction -
          spaceBetween * 10) /
        2,
      bottom: 2,
    };

    console.log(
      "height",
      computeBack.height,
      "fraction",
      computeBack.height * fraction,
      "difference",
      computeBack.height - computeBack.height * fraction,
      "half difference",
      (computeBack.height - computeBack.height * fraction) / 2
    );

    canvas
      .selectAll(".gridling")
      .data(flatGrid)
      .enter()
      .append("rect")
      .attr("class", "gridling")
      .attr("width", gridlingSize)
      .attr("height", gridlingSize)
      .attr(
        "x",
        (_, i) => `${(i % 16) * (gridlingSize + spaceBetween) + margin.left}`
      )
      .attr(
        "y",
        (_, i) => `${Math.floor(i / 16) * (gridlingSize + spaceBetween)}`
      )
      .attr("fill", "#000");
  }
  createGridlings();
}

function createDataInit() {
  let data = {};
  for (let row = 0; row < 10; row++) {
    let currentRow = [];
    for (let column = 0; column < 16; column++) {
      currentRow.push(0);
    }
    data[row] = currentRow;
  }
  return data;
}

function flattenData(data) {
  let flatData = [];
  for (row in data) {
    flatData = flatData.concat(data[row]);
  }
  return flatData;
}
