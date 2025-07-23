function init() {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, "diagramDiv", {
    "undoManager.isEnabled": true
  });

  diagram.nodeTemplateMap.add("Normal",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle", { fill: "lightblue" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Emergency",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle", { fill: "orangered" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Decision",
    $(go.Node, "Auto",
      $(go.Shape, "Diamond", { fill: "lightyellow" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Alarm",
    $(go.Node, "Auto",
      $(go.Shape, "Triangle", { fill: "pink" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("StartEnd",
    $(go.Node, "Auto",
      $(go.Shape, "Ellipse", { fill: "palegreen" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.linkTemplate =
    $(go.Link,
      { routing: go.Link.AvoidsNodes, corner: 5 },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );

  const palette = $(go.Palette, "palette", {
    nodeTemplateMap: diagram.nodeTemplateMap
  });

  palette.model = new go.GraphLinksModel([
    { category: "Normal", text: "Étape normale" },
    { category: "Emergency", text: "Étape d'urgence" },
    { category: "Decision", text: "Décision" },
    { category: "Alarm", text: "Alarme" },
    { category: "StartEnd", text: "Début/Fin" }
  ]);

  document.getElementById("saveBtn").addEventListener("click", () => {
    document.getElementById("jsonText").value = diagram.model.toJson();
  });

  document.getElementById("loadBtn").addEventListener("click", () => {
    const json = document.getElementById("jsonText").value;
    if (json) diagram.model = go.Model.fromJson(json);
  });

  document.getElementById("undoBtn").addEventListener("click", () => {
    if (diagram.undoManager.canUndo()) diagram.undoManager.undo();
  });

  document.getElementById("redoBtn").addEventListener("click", () => {
    if (diagram.undoManager.canRedo()) diagram.undoManager.redo();
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    diagram.model = new go.GraphLinksModel();
  });

  document.getElementById("pngBtn").addEventListener("click", () => {
    const img = diagram.makeImage({ background: "white" });
    const w = window.open("");
    if (w) w.document.body.appendChild(img);
  });

  document.getElementById("svgBtn").addEventListener("click", () => {
    const svg = diagram.makeSvg({ background: "white" });
    const w = window.open("");
    if (w) w.document.body.appendChild(svg);
  });
}
