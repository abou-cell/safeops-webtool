let diagram;
let currentTheme = 'light';

function getCSSVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function applyTheme() {
  if (!diagram) return;
  diagram.nodeTemplateMap.get("Normal").findObject("SHAPE").fill = getCSSVar('--node-normal-color');
  diagram.nodeTemplateMap.get("Emergency").findObject("SHAPE").fill = getCSSVar('--node-emergency-color');
  diagram.nodeTemplateMap.get("Decision").findObject("SHAPE").fill = getCSSVar('--node-decision-color');
  diagram.nodeTemplateMap.get("Alarm").findObject("SHAPE").fill = getCSSVar('--node-alarm-color');
  diagram.nodeTemplateMap.get("StartEnd").findObject("SHAPE").fill = getCSSVar('--node-startend-color');

  ['Normal','Emergency','Decision','Alarm','StartEnd'].forEach(cat => {
    diagram.nodeTemplateMap.get(cat).findObject("TEXT").stroke = getCSSVar('--text-color');
  });
  diagram.requestUpdate();
}

function init() {
  const $ = go.GraphObject.make;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    document.body.setAttribute('data-theme', currentTheme);
  }

  diagram = $(go.Diagram, "diagramDiv", {
    "undoManager.isEnabled": true
  });

  diagram.nodeTemplateMap.add("Normal",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle", { name: "SHAPE", fill: getCSSVar('--node-normal-color') }),
      $(go.TextBlock, { name: "TEXT", margin: 6, stroke: getCSSVar('--text-color') }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Emergency",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle", { name: "SHAPE", fill: getCSSVar('--node-emergency-color') }),
      $(go.TextBlock, { name: "TEXT", margin: 6, stroke: getCSSVar('--text-color') }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Decision",
    $(go.Node, "Auto",
      $(go.Shape, "Diamond", { name: "SHAPE", fill: getCSSVar('--node-decision-color') }),
      $(go.TextBlock, { name: "TEXT", margin: 6, stroke: getCSSVar('--text-color') }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Alarm",
    $(go.Node, "Auto",
      $(go.Shape, "Triangle", { name: "SHAPE", fill: getCSSVar('--node-alarm-color') }),
      $(go.TextBlock, { name: "TEXT", margin: 6, stroke: getCSSVar('--text-color') }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("StartEnd",
    $(go.Node, "Auto",
      $(go.Shape, "Ellipse", { name: "SHAPE", fill: getCSSVar('--node-startend-color') }),
      $(go.TextBlock, { name: "TEXT", margin: 6, stroke: getCSSVar('--text-color') }, new go.Binding("text", "text"))
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

  document.getElementById("themeToggle").addEventListener("click", () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    applyTheme();
  });

  applyTheme();
}
