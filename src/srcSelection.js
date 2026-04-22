import { stage } from "./srcStage";
import { previewConfig } from "./srcSignals";

export const SelectionLayer = new Konva.Layer();
stage.add(SelectionLayer);

export function drawSelectionLayer() {

  SelectionLayer.destroyChildren();
  const w = stage.width();
  const h = stage.height();
  for (let i = 0; i <= w; i += previewConfig.value.gap) {
    for (let j = 0; j <= h; j += previewConfig.value.gap) {
      const previewRect = new Konva.Rect({
        x: i,
        y: j,
        height: previewConfig.value.height,
        width: previewConfig.value.width,
        fill: "#868e96",
        opacity: 0.1,
      })
      SelectionLayer.add(previewRect)
    }
  }
  const cursorCircle = new Konva.Circle({
    id: 'Cursor',
    x: previewConfig.value.cursor.x,
    y: previewConfig.value.cursor.y,
    radius: 5,
    fill: 'red',
    draggable: true,
  });
  SelectionLayer.add(cursorCircle)
  SelectionLayer.draw();
}
