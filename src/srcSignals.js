import { signal } from '@preact/signals-core'

export const MODES = {
  VIEW: "VIEW",
  EDIT: "EDIT",
  PREVIEW: "PREVIEW",
};

export const SHAPES = {
  TEXTBOX: "textbox",
  CIRCLE: "circle",
  LINE: "line",
}

export const modalMode = signal(MODES.VIEW);
export const selectedShape = signal(SHAPES.TEXTBOX)
export const previewConfig = signal({
  height: 30,
  width: 30,
  cursor: {
    x: window.innerWidth / 2, // Fixed: x should typically align with width
    y: window.innerHeight / 2,
    moveByPoint: 50,
  }
});
