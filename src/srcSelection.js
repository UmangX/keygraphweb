import { stage } from "./srcStage";
import { previewConfig } from "./srcSignals";


export const SelectionLayer = new Konva.Layer();
export const addSelectionLayer = () => {
  stage.add(SelectionLayer);
}

export function moveCursor() {
  let cursor = SelectionLayer.findOne('#Cursor');
  if (!cursor) {
    cursor = new Konva.Circle({
      id: 'Cursor',
      radius: 5,
      fill: 'red',
      draggable: true,
    });
    SelectionLayer.add(cursor);
  }
  cursor.position({
    x: previewConfig.value.cursor.x,
    y: previewConfig.value.cursor.y,
  });
  SelectionLayer.draw();
}
