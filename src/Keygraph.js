// @ts-check
import Konva from 'konva';
import { effect } from '@preact/signals-core';
import { tinykeys } from "tinykeys";
import { MODES, previewConfig, modalMode } from './srcSignals';
import { stage, stageSetup, primeLayer } from './srcStage';
import { drawGrid } from './srcGrid';
import { addSelectionLayer, SelectionLayer, moveCursor } from './srcSelection';


//dom elements
const modeDisplay = document.getElementById("status-display")
const input = document.getElementById("user-input");
const submitbutton = document.getElementById("submit-btn");
const infoWindow = document.getElementById("infobar")

stageSetup()
drawGrid()
addSelectionLayer()

function handlesubmit() {

  const value = input.value.trim();

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
    x: previewConfig.value.cursor.x,
    y: previewConfig.value.cursor.y,
    id: `node-${Date.now()}`,
    draggable: true,
  })

  textgroup.add(rect)
  textgroup.add(complexText)
  primeLayer.add(textgroup);

  input.value = "";
  primeLayer.draw();
}

effect(() => {
  const _cx = previewConfig.value.cursor.x;
  const _cy = previewConfig.value.cursor.y;
  const _moveby = previewConfig.value.cursor.moveByPoint;
  infoWindow.innerHTML = String(previewConfig.value.cursor.moveByPoint);
  console.log(previewConfig.value)
  moveCursor()
});

effect(() => {
  modeDisplay.textContent = modalMode.value;
  if (modalMode.value === MODES.PREVIEW || modalMode.value === MODES.EDIT) {
    SelectionLayer.show();
  } else {
    SelectionLayer.hide();
  }
})

// const notTyping = () => {
//   const tag = document.activeElement?.tagName;
//   return tag !== 'INPUT' && tag !== 'TEXTAREA';
// }

tinykeys(window, {
  // view MODES keybindings
  "Escape": () => {
    if (modalMode.value !== MODES.VIEW) {
      modalMode.value = MODES.VIEW;
      input.blur()
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
      input.blur()
      document.getElementById('main-canvas').focus()
    }
  },
  "Space =": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          moveByPoint: previewConfig.value.cursor.moveByPoint + 10,
        }
      };
      console.log("increased the cursor move by 10")
    }
  },
  "Space -": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          moveByPoint: previewConfig.value.cursor.moveByPoint - 10,
        }
      }
    }
  },
  "l": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          x: previewConfig.value.cursor.x + previewConfig.value.cursor.moveByPoint
        }
      };
      console.log(previewConfig.value.cursor.moveByPoint)
    }
  },
  "h": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          x: previewConfig.value.cursor.x - previewConfig.value.cursor.moveByPoint,
        }
      };
    }
  },
  "k": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          y: previewConfig.value.cursor.y - previewConfig.value.cursor.moveByPoint
        }
      };
    }
  },
  "j": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          y: previewConfig.value.cursor.y + previewConfig.value.cursor.moveByPoint
        }
      };
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
  if (e.key === 'Enter' && input.value.trim() !== "") {
    handlesubmit();
  }
});
