function init() {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, "diagramDiv", {
    "undoManager.isEnabled": true
  });

  // Manual step
  diagram.nodeTemplateMap.add("Manual",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle", { fill: "#cce5ff", stroke: "#003366" }),
      $(go.Panel, "Horizontal",
        $(go.TextBlock, "\u{1F464}", { margin: 2 }), // person icon
        $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
      )
    ));

  // Automatic step
  diagram.nodeTemplateMap.add("Automatic",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle", { fill: "#d4edda", stroke: "#155724" }),
      $(go.Panel, "Horizontal",
        $(go.TextBlock, "\u2699\uFE0F", { margin: 2 }), // gear icon
        $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
      )
    ));

  // Critical step
  diagram.nodeTemplateMap.add("Critical",
    $(go.Node, "Auto",
      $(go.Shape, "Triangle", { fill: "#f8d7da", stroke: "darkred" }),
      $(go.TextBlock, { margin: 6, stroke: "darkred", font: "bold 12px sans-serif" },
        new go.Binding("text", "text"))
    ));

  // Decision nodes
  diagram.nodeTemplateMap.add("DecisionBinary",
    $(go.Node, "Auto",
      $(go.Shape, "Diamond", { fill: "#fff3cd", stroke: "#856404" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("DecisionMulti",
    $(go.Node, "Auto",
      $(go.Shape, "Diamond", { fill: "#ffeeba", stroke: "#856404" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("DecisionThreshold",
    $(go.Node, "Auto",
      $(go.Shape, "Diamond", { fill: "#e2e3e5", stroke: "#383d41" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  // Alarm nodes
  diagram.nodeTemplateMap.add("AlarmMinor",
    $(go.Node, "Auto",
      $(go.Shape, "Triangle", { fill: "#fff3cd", stroke: "#856404" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("AlarmCritical",
    $(go.Node, "Auto",
      $(go.Shape, "Triangle", { fill: "#f8d7da", stroke: "#721c24" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("AlarmAudio",
    $(go.Node, "Auto",
      $(go.Shape, "Triangle", { fill: "#d1ecf1", stroke: "#0c5460" }),
      $(go.Panel, "Horizontal",
        $(go.TextBlock, "\u{1F50A}", { margin: 2 }), // speaker icon
        $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
      )
    ));

  // Start/End variants and resume
  diagram.nodeTemplateMap.add("Start",
    $(go.Node, "Auto",
      $(go.Shape, "Circle", { fill: "#d4edda", stroke: "#155724" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("End",
    $(go.Node, "Auto",
      $(go.Shape, "Circle", { fill: "#d6d8db", stroke: "#383d41" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Resume",
    $(go.Node, "Auto",
      $(go.Shape, "Circle", { fill: "#ffeeba", stroke: "#856404" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  // Miscellaneous nodes
  diagram.nodeTemplateMap.add("Comment",
    $(go.Node, "Auto",
      $(go.Shape, "File", { fill: "white", stroke: "#6c757d" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Resource",
    $(go.Node, "Auto",
      $(go.Shape, "Rectangle", { fill: "#c3e6cb", stroke: "#155724" }),
      $(go.Panel, "Horizontal",
        $(go.TextBlock, "\u{1F4E6}", { margin: 2 }),
        $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
      )
    ));

  diagram.nodeTemplateMap.add("Timer",
    $(go.Node, "Auto",
      $(go.Shape, "Circle", { fill: "#bee5eb", stroke: "#0c5460" }),
      $(go.Panel, "Horizontal",
        $(go.TextBlock, "\u23F1", { margin: 2 }),
        $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
      )
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
    { category: "Manual", text: "Étape manuelle" },
    { category: "Automatic", text: "Étape automatique" },
    { category: "Critical", text: "Étape critique" },
    { category: "DecisionBinary", text: "Décision binaire" },
    { category: "DecisionMulti", text: "Décision multiple" },
    { category: "DecisionThreshold", text: "Décision seuil" },
    { category: "AlarmMinor", text: "Alarme mineure" },
    { category: "AlarmCritical", text: "Alarme critique" },
    { category: "AlarmAudio", text: "Alarme audio" },
    { category: "Start", text: "Début" },
    { category: "End", text: "Fin" },
    { category: "Resume", text: "Reprise" },
    { category: "Comment", text: "Commentaire" },
    { category: "Resource", text: "Ressource" },
    { category: "Timer", text: "Minuterie" }
  ]);

  document.getElementById("saveBtn").addEventListener("click", () => {
    document.getElementById("jsonText").value = diagram.model.toJson();
  });

  document.getElementById("loadBtn").addEventListener("click", () => {
    const json = document.getElementById("jsonText").value;
    if (json) diagram.model = go.Model.fromJson(json);
  });
}
