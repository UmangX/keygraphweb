// @ts-check
import Konva from 'konva';
import { effect } from '@preact/signals-core';
import { tinykeys } from "tinykeys";
import { MODES, previewConfig, modalMode, selectedShape, SHAPES, cursorJump } from './srcSignals';
import { stage, stageSetup, primeLayer } from './srcStage';
import { drawGrid } from './srcGrid';
import { addpreviewLayer, PreviewLayer, moveCursor } from './srcPreview';
import { generateTextbox } from './srcNodes';
import { nanoid } from 'nanoid';

//dom elements
const modeDisplay = document.getElementById("status-display")
const input = document.getElementById("user-input");
const submitbutton = document.getElementById("submit-btn");
const infoWindow = document.getElementById("infobar")
const shapeDisplayWindow = document.getElementById("shapeDisplay")
const shapeSizeDisplayWindow = document.getElementById("shapeSizeDisplay")


stageSetup()
drawGrid()
addpreviewLayer()


function handlesubmit() {
  const value = input.value.trim();
  if (selectedShape.value === SHAPES.TEXTBOX) {
    primeLayer.add(generateTextbox(value));
  }
  if (selectedShape.value === SHAPES.CIRCLE) {
    const circle = new Konva.Circle({
      id: nanoid(),
      x: previewConfig.value.cursor.x,
      y: previewConfig.value.cursor.y,
      stroke: 'green',
      radius: previewConfig.value.width,
      strokeWidth: 5,
      draggable: true,
    })
    primeLayer.add(circle)
    console.log("SHAPES.CIRCLE EXECUTED");
  }
  input.value = "";
  primeLayer.draw();
}

// function haveIntersection(r1, r2) {
//   return !(
//     r2.x > r1.x + r1.width ||
//     r2.x + r2.width < r1.x ||
//     r2.y > r1.y + r1.height ||
//     r2.y + r2.height < r1.y
//   );
// }

effect(() => {
  //startup functions
  primeLayer.add(generateTextbox("Welcome to Keygraph,!", 10, 10));
})

effect(() => {
  const _cshape = selectedShape.value;
  shapeDisplayWindow.innerHTML = String(selectedShape.value);
});

effect(() => {
  const _cwidth = previewConfig.value.width;
  const _cheight = previewConfig.value.height;
  shapeSizeDisplayWindow.innerHTML = String(_cwidth + " " + _cheight);
})

effect(() => {
  const _cx = previewConfig.value.cursor.x;
  const _cy = previewConfig.value.cursor.y;
  moveCursor()
});

effect(() => {
  const _cursorJump = cursorJump.value;
  infoWindow.innerHTML = String(cursorJump.value) + " pixel";
})

effect(() => {
  modeDisplay.textContent = modalMode.value;
  if (modalMode.value === MODES.PREVIEW || modalMode.value === MODES.EDIT) {
    PreviewLayer.show();
  } else {
    PreviewLayer.hide();
  }
})

// const notTyping = () => {
//   const tag = document.activeElement?.tagName;
//   return tag !== 'INPUT' && tag !== 'TEXTAREA';
// }

tinykeys(window, {
  // edit MODES keybindings
  "Escape": () => {
    if (modalMode.value !== MODES.EDIT) {
      modalMode.value = MODES.EDIT
      document.getElementById("user-input").focus();
    }
  },

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
      cursorJump.value = cursorJump.value + 50;
    }
  },
  "Space -": () => {
    if (modalMode.value === MODES.PREVIEW) {
      cursorJump.value = cursorJump.value - 50;
    }
  },
  "l": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          x: previewConfig.value.cursor.x + cursorJump.value,
        }
      };
    }
  },
  "h": () => {
    if (modalMode.value === MODES.PREVIEW) {
      previewConfig.value = {
        ...previewConfig.value,
        cursor: {
          ...previewConfig.value.cursor,
          x: previewConfig.value.cursor.x - cursorJump.value,
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
          y: previewConfig.value.cursor.y - cursorJump.value,
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
          y: previewConfig.value.cursor.y + cursorJump.value,
        }
      };
    }
  },
  "1": () => {
    if (modalMode.value === MODES.PREVIEW) {
      selectedShape.value = SHAPES.TEXTBOX;
    }
  },
  "2": () => {
    if (modalMode.value === MODES.PREVIEW) {
      selectedShape.value = SHAPES.CIRCLE;
    }
  },
});

window.addEventListener('resize', () => {
  stage.width(window.innerWidth)
  stage.height(window.innerHeight)
  drawGrid();
})

if (submitbutton) submitbutton.addEventListener('click', handlesubmit);

if (input) {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handlesubmit();
  });
}
