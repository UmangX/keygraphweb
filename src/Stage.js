import Konva from "konva";

export const stage = new Konva.Stage({
  container: 'main-canvas',
  width: window.innerWidth,
  height: window.innerHeight,
});

export const stageSetup = () => {
  stage.container().style.backgroundColor = '#111111';
}

export const primeLayer = new Konva.Layer();
stage.add(primeLayer);
