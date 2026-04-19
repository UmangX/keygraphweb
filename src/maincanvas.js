// @ts-check
import Konva from 'konva';
import { signal, effect } from '@preact/signals-core';
import { tinykeys } from "tinykeys";

//signals
const mode = {
  VIEW: "VIEW",
  EDIT: "EDIT",
}
const modalMode = signal(mode.VIEW);
const modeDisplay = document.getElementById("status-display")


// domelements
const input = document.getElementById("user-input");
const submitbutton = document.getElementById("submit-btn");

//konva setup
const stage = new Konva.Stage({
  container: 'main-canvas',
  width: window.innerWidth,
  height: window.innerHeight,
});

stage.container().style.backgroundColor = '#0d1117';

const dotlayer = new Konva.Layer();
stage.add(dotlayer);

let grid_gap = 50;

function drawGrid() {
  dotlayer.destroyChildren();
  const w = stage.width();
  const h = stage.height();
  for (let i = 0; i <= w; i += grid_gap) {
    for (let j = 0; j <= h; j += grid_gap) {
      const dot = new Konva.Circle({
        x: i,
        y: j,
        radius: 2,
        fill: '#0FBF3E',
        listening: false,
      });
      dotlayer.add(dot);
    }
  }


  dotlayer.draw();
}
drawGrid()

const layer = new Konva.Layer();
stage.add(layer);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function handlesubmit() {
  const value = input.value.trim();
  if (value === "") return;

  const rx = getRandomInt(50, window.innerWidth - 350);
  const ry = getRandomInt(50, window.innerHeight - 150);

  const complexText = new Konva.Text({
    text: value,
    fontSize: 14,
    fontFamily: 'Hermit,-apple-system, system-ui,sans-serif',
    fill: '#c9d1d9', // GitHub text color
    padding: 20,
    align: 'center',
  });

  const rect = new Konva.Rect({
    stroke: '#30363d',
    strokeWidth: 1,
    fill: '#161b22', // GitHub secondary dark
    width: complexText.width(),
    height: complexText.height(),
    shadowColor: 'black',
    shadowBlur: 5,
    shadowOpacity: 0.3,
    cornerRadius: 6,
  });

  const textgroup = new Konva.Group({
    x: rx,
    y: ry,
    id: `node-${Date.now()}`,
    draggable: true,
  })

  textgroup.add(rect)
  textgroup.add(complexText)
  layer.add(textgroup);

  input.value = "";
  layer.draw();
}

// effects

effect(() => {
  modeDisplay.textContent = modalMode.value;
  if (modalMode.value == mode.EDIT) {
    //
  }
  if (modalMode.value == mode.VIEW) {
    //
  }
})


// const idLayer = new Konva.Layer()
// stage.add(idLayer)
// effect(() => {
//   modeDisplay.textContent = modalMode.value

//   if (modalMode.value == 'COMMAND') {
//     idLayer.destroyChildren();
//     layer.getChildren().forEach(node => {
//       const idText = new Konva.Text({
//         x: node.x(),
//         y: node.y(),
//         fontSize: 10,
//         fontFamily: 'Hermit,-apple-system, system-ui,sans-serif',
//         fill: '#c9d1d9', // GitHub text color
//         text: node.id() || "NO ID",
//         listening: false,
//       });
//       console.log("adding element")
//       console.log(node.id())
//       idLayer.add(idText);
//     })
//     idLayer.draw();
//   }
// })

//event handling
//TODO focus on canvas in focus mode
tinykeys(window, {
  "Escape": () => {
    if (modalMode.value === mode.EDIT) {
      modalMode.value = mode.VIEW;
      document.getElementById('main-canvas').focus()
    }
  },
  "Space e": () => {
    if (modalMode.value === mode.VIEW) {
      modalMode.value = mode.EDIT;
      document.getElementById("user-input").focus();
    }
  },
});

window.addEventListener('resize', () => {
  stage.width(window.innerWidth)
  stage.height(window.innerHeight)
  drawGrid();
})

submitbutton.addEventListener('click', handlesubmit);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handlesubmit();
  }
});
