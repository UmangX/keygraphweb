import { primeIndex, primeNodes } from "./SignalOrigin";
import { primeLayer } from "./Stage";
import { generateTextbox } from "./Textbox";

export function selectNode(id) {
  primeLayer.getChildren().forEach((node) => {
    if (node.nodeType === "Group") {
      node.getChildren().forEach((child) => {
        if (child.getClassName() === "Rect") {
          child.stroke('#30363d');
          child.strokeWidth(1);
        }
      });
    } else if (node.nodeType === "Shape") {
      node.stroke('green');
    }
  });

  primeIndex.value = id;
  const selectedNode = primeLayer.findOne(`#${id}`);
  if (selectedNode) {
    if (selectedNode.nodeType === "Group") {
      selectedNode.getChildren().forEach((child) => {
        if (child.getClassName() === "Rect") {
          child.stroke('#ffb000');
          child.strokeWidth(2);
        }
      });
    } else {
      selectedNode.stroke('#ffb000');
    }
  }
  primeLayer.batchDraw();
}

export function switchPrime() {
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
}


export const startup = () => {
  const node = generateTextbox("Welcome to Keygraph!", 10, 10);
  node.on('dragend', () => {
    primeNodes.value = new Map(primeNodes.value).set(node.id(), node.getAttrs());
  });
  primeLayer.add(node);
  primeNodes.value = new Map(primeNodes.value).set(node.id(), node.getAttrs());
}
