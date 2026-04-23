import { previewConfig } from "./srcSignals";


export function generateTextbox(inputText) {
  const complexText = new Konva.Text({
    text: inputText,
    fontSize: 20,
    fontFamily: 'Hermit,-apple-system, system-ui,sans-serif',
    fill: '#c9d1d9',
    padding: 20,
    align: 'center',
  });

  const rect = new Konva.Rect({
    stroke: '#30363d',
    strokeWidth: 1,
    fill: '#161b22',
    width: complexText.width(),
    height: complexText.height(),
    shadowColor: 'black',
    shadowBlur: 5,
    shadowOpacity: 0.3,
    cornerRadius: 6,
  });

  const textgroup = new Konva.Group({
    x: previewConfig.value.cursor.x,
    y: previewConfig.value.cursor.y,
    id: `node-${Date.now()}`,
    draggable: true,
  })

  textgroup.add(rect)
  textgroup.add(complexText)
  return textgroup
}
