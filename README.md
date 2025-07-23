# safeops-webtool

This project is a simple flow editor built with [GoJS](https://gojs.net/). It lets you design operation procedures by dragging nodes onto a diagram and connecting them.

## Opening `index.html`
1. Clone this repository.
2. Launch a local web server or open `index.html` directly in your browser. For example:
   ```bash
   python3 -m http.server
   ```
   Then navigate to `http://localhost:8000` and open `index.html`.

## Dependencies
The editor uses GoJS served from a CDN. The script tag appears in `index.html`:
```html
<script src="https://unpkg.com/gojs/release/go.js"></script>
```
No other build steps are required.

## Development
1. Start the static server or open `index.html` as described above.
2. Modify files in `js/` or `css/` and refresh your browser to see the changes.

## Toolbar Buttons
- **Sauvegarder** – Saves the current diagram to the JSON textarea.
- **Charger** – Loads the diagram from the JSON found in the textarea.

Copy the JSON somewhere to persist your work. Paste the JSON back and press **Charger** to restore a saved diagram.

## Keyboard Shortcuts
Because the diagram enables GoJS's `UndoManager`, you can use **Ctrl+Z** to undo and **Ctrl+Y** to redo actions.

## Advanced Features
- A palette with predefined node types: normal step, emergency step, decision, alarm and start/end.
- Links avoid nodes automatically and end with arrowheads for clarity.
