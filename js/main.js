function init() {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, "diagramDiv", {
    "undoManager.isEnabled": true
  });

  diagram.nodeTemplateMap.add("Normal",
    $(go.Node, "Auto",
      { title: "" },
      new go.Binding("title", "text"),
      $(go.Shape, "RoundedRectangle", { fill: "lightblue" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Emergency",
    $(go.Node, "Auto",
      { title: "" },
      new go.Binding("title", "text"),
      $(go.Shape, "RoundedRectangle", { fill: "orangered" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Decision",
    $(go.Node, "Auto",
      { title: "" },
      new go.Binding("title", "text"),
      $(go.Shape, "Diamond", { fill: "lightyellow" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Alarm",
    $(go.Node, "Auto",
      { title: "" },
      new go.Binding("title", "text"),
      $(go.Shape, "Triangle", { fill: "pink" }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("StartEnd",
    $(go.Node, "Auto",
      { title: "" },
      new go.Binding("title", "text"),
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

  const paletteData = [
    { category: "Normal", text: "Étape normale" },
    { category: "Emergency", text: "Étape d'urgence" },
    { category: "Decision", text: "Décision" },
    { category: "Alarm", text: "Alarme" },
    { category: "StartEnd", text: "Début/Fin" }
  ];

  palette.model = new go.GraphLinksModel(paletteData);

  document.getElementById("saveBtn").addEventListener("click", () => {
    document.getElementById("jsonText").value = diagram.model.toJson();
  });

  document.getElementById("loadBtn").addEventListener("click", () => {
    const json = document.getElementById("jsonText").value;
    if (json) diagram.model = go.Model.fromJson(json);
  });

  const searchInput = document.getElementById("paletteSearch");
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = paletteData.filter(d =>
      d.text.toLowerCase().includes(term)
    );
    palette.model = new go.GraphLinksModel(filtered);
  });

  const paletteContainer = document.getElementById("paletteContainer");
  const toggleBtn = document.getElementById("togglePaletteBtn");
  toggleBtn.addEventListener("click", () => {
    paletteContainer.classList.toggle("hidden");
    if (paletteContainer.classList.contains("hidden")) {
      toggleBtn.textContent = "Afficher la palette";
    } else {
      toggleBtn.textContent = "Masquer la palette";
    }
  });
}
