# keygraphweb

## this is a ai generated readme but enough to provide help for development

A keyboard-driven, canvas-based diagramming tool for the web. Inspired by Vim's modal editing philosophy, keygraphweb lets you place and arrange shapes on an infinite canvas entirely from your keyboard — no mouse required.

---

## ✨ Features

- **Modal editing** — Switch between View, Preview, and Edit modes just like Vim
- **Keyboard-first navigation** — Move a cursor around the canvas using `h`, `j`, `k`, `l`
- **Adjustable step size** — Control how many pixels the cursor jumps per keystroke
- **Shape placement** — Place textboxes and circles at the cursor position
- **Live grid** — A background grid that adapts to the canvas
- **Reactive UI** — Status bar and shape info update in real time via signals
- **Responsive canvas** — Automatically resizes with the browser window

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/UmangX/keygraphweb.git
cd keygraphweb
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## ⌨️ Keyboard Shortcuts

keygraphweb uses a modal system similar to Vim. Every action is a keystroke away.

### Mode Switching

| Key | Action |
|-----|--------|
| `Space p` | Enter **Preview** mode (move cursor, select shapes) |
| `Space e` | Enter **Edit** mode (focus text input) |
| `Escape` | Return to **View** mode |

### Cursor Movement *(Preview mode only)*

| Key | Action |
|-----|--------|
| `h` | Move cursor left |
| `l` | Move cursor right |
| `k` | Move cursor up |
| `j` | Move cursor down |
| `Space =` | Increase step size by 50px |
| `Space -` | Decrease step size by 50px |

### Shape Selection *(Preview mode only)*

| Key | Shape |
|-----|-------|
| `1` | Textbox |
| `2` | Circle |

### Placing a Shape

1. Enter **Preview** mode (`Space p`) and navigate to the desired position
2. Switch to **Edit** mode (`Space e`) and type your label/text
3. Press `Enter` or click **Submit** to place the shape on the canvas

---

## 🏗️ Tech Stack

| Library | Purpose |
|---------|---------|
| [Konva.js](https://konvajs.org/) | 2D canvas rendering and shape management |
| [@preact/signals-core](https://github.com/preactjs/signals) | Reactive state management |
| [tinykeys](https://github.com/jamiebuilds/tinykeys) | Lightweight keyboard shortcut binding |
| [nanoid](https://github.com/ai/nanoid) | Unique shape ID generation |

---

## 📁 Project Structure

```
keygraphweb/
├── src/
│   ├── main.js          # Entry point — mode logic, keybindings, event wiring
│   ├── srcSignals.js    # Global reactive state (modes, cursor, selected shape)
│   ├── srcStage.js      # Konva stage and layer setup
│   ├── srcGrid.js       # Background grid drawing
│   ├── srcPreview.js    # Preview layer and cursor rendering
│   └── srcNodes.js      # Shape generators (textbox, etc.)
└── index.html           # App shell with status bar and input UI
```

---

## 🗺️ Roadmap

- [ ] More shapes (rectangles, lines, arrows)
- [ ] Shape selection and deletion
- [ ] Canvas pan and zoom
- [ ] Export to PNG / SVG
- [ ] Save/load diagrams (local storage or file)
- [ ] Connecting shapes with edges (graph mode)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source. See [LICENSE](./LICENSE) for details.
