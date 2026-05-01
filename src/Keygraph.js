import Konva from 'konva';
import { effect } from '@preact/signals-core';
import { tinykeys } from "tinykeys";
import { MODES, previewConfig, modalMode, selectedShape, SHAPES, cursorJump, primeNodes, primeIndex } from './srcSignals';
import { stage, stageSetup, primeLayer } from './srcStage';
import { drawGrid } from './srcGrid';
import { addpreviewLayer, PreviewLayer, moveCursor } from './srcPreview';
import { generateTextbox } from './srcNodes';
import { nanoid } from 'nanoid';
import { switchPrime, selectNode } from './Utils';

//dom elements
const modeDisplay = document.getElementById("status-display")
const input = document.getElementById("user-input");
const submitbutton = document.getElementById("submit-btn");
const infoWindow = document.getElementById("infobar")
const shapeDisplayWindow = document.getElementById("shapeDisplay")
const shapeSizeDisplayWindow = document.getElementById("shapeSizeDisplay")
const nodeBar = document.getElementById("node-bar")

stageSetup()
drawGrid()
addpreviewLayer()

export function handlesubmit() {
  const value = input.value.trim();
  if (selectedShape.value === SHAPES.TEXTBOX) {
    const textBox = generateTextbox(value, undefined, undefined);
    textBox.on('dragend', () => {
      primeNodes.value = new Map(primeNodes.value).set(textBox.id(), textBox.getAttrs());
    });
    textBox.on('click tap', () => selectNode(textBox.id()));
    primeLayer.add(textBox);
    primeNodes.value = new Map(primeNodes.value).set(textBox.id(), textBox.getAttrs());
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
      shadowEnabled: true,
    })
    circle.on('click tap', () => selectNode(circle.id()));
    circle.on('dragend', () => {
      primeNodes.value = new Map(primeNodes.value).set(circle.id(), circle.getAttrs());
    });
    primeLayer.add(circle);
    primeNodes.value = new Map(primeNodes.value).set(circle.id(), circle.getAttrs());
  }
  input.value = "";
  primeLayer.batchDraw();
}

// function selectNode(id) {
//   primeLayer.getChildren().forEach((node) => {
//     if (node.nodeType === "Group") {
//       node.getChildren().forEach((child) => {
//         if (child.getClassName() === "Rect") {
//           child.stroke('#30363d');
//           child.strokeWidth(1);
//         }
//       });
//     } else if (node.nodeType === "Shape") {
//       node.stroke('green');
//     }
//   });
//   primeIndex.value = id;
//   const selectedNode = primeLayer.findOne(`#${id}`);
//   if (selectedNode) {
//     if (selectedNode.nodeType === "Group") {
//       selectedNode.getChildren().forEach((child) => {
//         if (child.getClassName() === "Rect") {
//           child.stroke('#ffb000');
//           child.strokeWidth(2);
//         }
//       });
//     } else {
//       selectedNode.stroke('#ffb000');
//     }
//   }
//   primeLayer.batchDraw();
// }

const startup = () => {
  const node = generateTextbox("Welcome to Keygraph!", 10, 10);
  node.on('dragend', () => {
    primeNodes.value = new Map(primeNodes.value).set(node.id(), node.getAttrs());
  });
  primeLayer.add(node);
  primeNodes.value = new Map(primeNodes.value).set(node.id(), node.getAttrs());
}
startup()

effect(() => {
  const listHTML = Array.from(primeNodes.value.entries())
    .map(([id, attrs]) => `<span id="${id}">${id}</span>`)
    .join('');
  nodeBar.innerHTML = listHTML || '<p>No nodes found</p>';
});

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
  "Tab": event => {
    event.preventDefault();
    const ids = Array.from(primeNodes.value.keys());
    if (ids.length === 0) return;
    let currentIndex = ids.indexOf(primeIndex.value);
    if (currentIndex === -1) {
      currentIndex = 0;
    } else {
      currentIndex = (currentIndex + 1) % ids.length;
    }
    const nextId = ids[currentIndex];
    selectNode(nextId);
    console.log("Selected:", nextId);
  },
  "r -": event => {
    if (modalMode.value === MODES.EDIT) {
      const id = primeIndex.value;
      if (!id) return;
      const currentNode = primeLayer.findOne("#" + id);
      if (!currentNode) return;
      const current = currentNode.scale();
      const next = { x: current.x - 0.5, y: current.y - 0.5 };
      currentNode.scale(next);
      primeNodes.value = new Map(primeNodes.value).set(id, currentNode.getAttrs());
      primeLayer.batchDraw();
    }
  },
  "r =": event => {
    if (modalMode.value === MODES.EDIT) {
      const id = primeIndex.value;
      if (!id) return;
      const currentNode = primeLayer.findOne("#" + id);
      if (!currentNode) return;
      const current = currentNode.scale();
      const next = { x: current.x + 0.5, y: current.y + 0.5 };
      currentNode.scale(next);
      primeNodes.value = new Map(primeNodes.value).set(id, currentNode.getAttrs());
      primeLayer.batchDraw();
    }
  },
  "x x": () => {
    if (modalMode.value == MODES.PREVIEW) {
      const id = primeIndex.value;
      if (!id) return;
      const currentNode = primeLayer.findOne("#" + id);
      if (!currentNode) return;
      switchPrime()
      currentNode.destroy();
      primeNodes.value.delete(id);
      const _updatePrimeNodes = primeNodes.value;
      primeNodes.value = new Map(_updatePrimeNodes);
      primeLayer.batchDraw();
    }
  },
  "p": () => {
    if (modalMode.value == MODES.PREVIEW) {
      const id = primeIndex.value;
      if (!id) return;
      const currentNode = primeLayer.findOne("#" + id);
      currentNode.position({
        x: previewConfig.value.cursor.x,
        y: previewConfig.value.cursor.y,
      })
      primeNodes.value = new Map(primeNodes.value).set(id, currentNode.getAttrs());
      primeLayer.batchDraw();
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
