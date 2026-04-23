import { stage } from "./srcStage";
import { previewConfig } from "./srcSignals";


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
  PreviewLayer.draw();
}
