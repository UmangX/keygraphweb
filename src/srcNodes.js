import { nanoid } from "nanoid";
import { previewConfig } from "./srcSignals"

export function generateTextbox(
  inputText,
  x = previewConfig.value.cursor.x,
  y = previewConfig.value.cursor.y,
) {
  const padding = 5;

  const complexText = new Konva.Text({
    text: inputText,
    fontSize: 12,
    fontFamily: 'SauceCodePro Nerd Font,-apple-system, system-ui, sans-serif',
    fill: '#ffffff',
    padding: padding,
    align: 'center',
  });
  const rect = new Konva.Rect({
    stroke: '#30363d',
    strokeWidth: 1,
    fill: '#0a0a0a',
    width: complexText.width() + padding * 2,
    height: complexText.height() + padding * 2,
    shadowColor: 'black',
    shadowBlur: 5,
  });
  complexText.position({ x: padding, y: padding });
  const textgroup = new Konva.Group({
    x, y,
    opacity: 1,
    id: nanoid(),
    draggable: true,
  });
  textgroup.add(rect);
  textgroup.add(complexText);
  return textgroup;
}
