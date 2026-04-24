import { nanoid } from "nanoid";
import { previewConfig } from "./srcSignals";


export function generateTextbox(inputText, x = previewConfig.value.cursor.x, y = previewConfig.value.cursor.y) {
  const padding = 20;
  const complexText = new Konva.Text({
    text: inputText,
    fontSize: 20,
    fontFamily: 'SauceCodePro Nerd Font,-apple-system, system-ui,sans-serif',
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
    x: x,
    y: y,
    opacity: 1,
    id: nanoid(),
    draggable: true,
  })

  textgroup.add(rect)
  textgroup.add(complexText)
  return textgroup
}

export function generatePreviewTextBox() {
  const rect = new Konva.Rect({
    id: "preview",
    x: previewConfig.value.cursor.x,
    y: previewConfig.value.cursor.y,
    stroke: '#30363d',
    strokeWidth: 1,
    fill: '#161b22',
    width: previewConfig.value.width,
    height: previewConfig.value.height,
    shadowColor: 'black',
    shadowBlur: 5,
    //shadowOpacity: 0.3,
    cornerRadius: 6,
  });
  return rect;
}
