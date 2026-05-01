import { primeLayer, stage } from "./Stage";
import { previewConfig, primeIndex } from "./SignalOrigin";
import Konva from "konva/lib/_CoreInternals";

export const PreviewLayer = new Konva.Layer();
export const addpreviewLayer = () => {
  stage.add(PreviewLayer);
}
export function moveCursor() {
  let cursor = PreviewLayer.findOne('#Cursor');
  if (!cursor) {
    cursor = new Konva.Circle({
      id: 'Cursor',
      radius: 5,
      fill: '#58a6ff',
      draggable: true,
    });
    PreviewLayer.add(cursor);
  }
  cursor.position({
    x: previewConfig.value.cursor.x,
    y: previewConfig.value.cursor.y,
  });
  primeLayer.getChildren().forEach(function (node) {
    console.log(node.id());
  }
  )
  PreviewLayer.batchDraw();
}
