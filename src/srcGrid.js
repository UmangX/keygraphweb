import { stage } from "./srcStage";

export const dotlayer = new Konva.Layer();
stage.add(dotlayer);

export const gridConfig = {
  gap: 50,
  radius: 3,
  fill: '#0FBF3E',
}

export function drawGrid() {
  dotlayer.destroyChildren();
  const w = stage.width();
  const h = stage.height();
  for (let i = 0; i <= w; i += gridConfig.gap) {
    for (let j = 0; j <= h; j += gridConfig.gap) {
      const dot = new Konva.Circle({
        x: i,
        y: j,
        radius: gridConfig.radius,
        fill: gridConfig.fill,
        listening: false,
      });
      dotlayer.add(dot);
    }
  }
  dotlayer.draw();
}
