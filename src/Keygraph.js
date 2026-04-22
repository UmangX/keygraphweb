// @ts-check
import Konva from 'konva';
import { effect } from '@preact/signals-core';
import { tinykeys } from "tinykeys";
import { MODES, previewConfig, modalMode } from './srcSignals';
import { stage, stageSetup } from './srcStage';
import { gridConfig, drawGrid } from './srcGrid';
import { drawSelectionLayer, SelectionLayer } from './srcSelection';


//dom elements
const modeDisplay = document.getElementById("status-display")
const input = document.getElementById("user-input");
const submitbutton = document.getElementById("submit-btn");
const infoWindow = document.getElementById("infobar")

stageSetup()
drawGrid()
drawSelectionLayer()


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

// effects and events
let exGap = previewConfig.value.gap;
effect(() => {
  const currentGap = previewConfig.value.gap;
  if (currentGap !== exGap) {
    exGap = currentGap;
    if (modalMode.value === MODES.PREVIEW) {
      drawSelectionLayer();
    }
  }
});

let previewBlocks = []

effect(() => {
  modeDisplay.textContent = modalMode.value;
  if (modalMode.value === MODES.PREVIEW) {
    drawSelectionLayer();
    if (previewBlocks.length === 0) {
      previewBlocks = SelectionLayer.getChildren()
    }
    infoWindow.innerText = previewBlocks.length.toString()
    SelectionLayer.show();
  } else {
    SelectionLayer.hide();
  }
})

tinykeys(window, {
  // view MODES keybindings
  "Escape": () => {
    if (modalMode.value !== MODES.VIEW) {
      modalMode.value = MODES.VIEW;
      document.getElementById('main-canvas').focus()
    }
  },

  // edit MODES keybindings
  "Space e": () => {
    if (modalMode.value !== MODES.EDIT) {
      modalMode.value = MODES.EDIT
      document.getElementById("user-input").focus();
    }
  },

  // preview MODES keybindings
  "Space p": () => {
    if (modalMode.value !== MODES.PREVIEW) {
      modalMode.value = MODES.PREVIEW;
      document.getElementById('main-canvas').focus()
    }
  },
  "Space =": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        gap: previewConfig.value.gap + 10
      };
      console.log("increased the previewGap by 10")
    }
  },
  "Space -": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        gap: previewConfig.value.gap - 10
      };
      console.log("decreased the previewGap by 10")
    }
  },
  "l": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          x: previewConfig.value.cursor.x + 30
        }
      };
      console.log("decreased the cursos by 30")
    }
  },
  "h": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          x: previewConfig.value.cursor.x - 30
        }
      };
      console.log("decreased the cursos by 30")
    }
  },
  "j": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          y: previewConfig.value.cursor.y - 30
        }
      };
      console.log("decreased the cursos by 30")
    }
  },
  "k": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          y: previewConfig.value.cursor.y + 30
        }
      };
      console.log("decreased the cursos by 30")
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



// // Zoom relative to pointer
// var scaleBy = 1.05;
// stage.on('wheel', function (e) {
//   e.evt.preventDefault();
//   var oldScale = stage.scaleX();
//   var pointer = stage.getPointerPosition();
//   var mousePointTo = {
//     x: (pointer.x - stage.x()) / oldScale,
//     y: (pointer.y - stage.y()) / oldScale,
//   };
//   var direction = e.evt.deltaY > 0 ? -1 : 1;
//   if (e.evt.ctrlKey) { direction = -direction; }
//   var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
//   newScale = Math.max(0.1, Math.min(10, newScale));
//   stage.scale({ x: newScale, y: newScale });
//   var newPos = {
//     x: pointer.x - mousePointTo.x * newScale,
//     y: pointer.y - mousePointTo.y * newScale,
//   };
//   stage.position(newPos);
// });
