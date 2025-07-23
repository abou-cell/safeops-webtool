function init() {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, "diagramDiv", {
    "undoManager.isEnabled": true
  });

  diagram.nodeTemplateMap.add("Normal",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle",
        {
          fill: "lightblue",
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          cursor: "pointer"
        }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Emergency",
    $(go.Node, "Auto",
      $(go.Shape, "RoundedRectangle",
        {
          fill: "orangered",
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          cursor: "pointer"
        }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Decision",
    $(go.Node, "Auto",
      $(go.Shape, "Diamond",
        {
          fill: "lightyellow",
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          cursor: "pointer"
        }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("Alarm",
    $(go.Node, "Auto",
      $(go.Shape, "Triangle",
        {
          fill: "pink",
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          cursor: "pointer"
        }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.nodeTemplateMap.add("StartEnd",
    $(go.Node, "Auto",
      $(go.Shape, "Ellipse",
        {
          fill: "palegreen",
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          cursor: "pointer"
        }),
      $(go.TextBlock, { margin: 6 }, new go.Binding("text", "text"))
    ));

  diagram.linkTemplate =
    $(go.Link,
      { routing: go.Link.AvoidsNodes, corner: 5 },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" }),
      $(go.TextBlock,
        { segmentOffset: new go.Point(0, -10), editable: true },
        new go.Binding("text", "label").makeTwoWay())
    );

  diagram.linkTemplateMap.add("Dashed",
    $(go.Link,
      { routing: go.Link.AvoidsNodes, corner: 5 },
      $(go.Shape, { strokeDashArray: [6, 3] }),
      $(go.Shape, { toArrow: "Standard" }),
      $(go.TextBlock,
        { segmentOffset: new go.Point(0, -10), editable: true },
        new go.Binding("text", "label").makeTwoWay())
    ));

  diagram.linkTemplateMap.add("DoubleArrow",
    $(go.Link,
      { routing: go.Link.AvoidsNodes, corner: 5 },
      $(go.Shape),
      $(go.Shape, { fromArrow: "Standard", toArrow: "Standard" }),
      $(go.TextBlock,
        { segmentOffset: new go.Point(0, -10), editable: true },
        new go.Binding("text", "label").makeTwoWay())
    ));

  diagram.linkTemplateMap.add("Curved",
    $(go.Link,
      { curve: go.Link.Bezier },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" }),
      $(go.TextBlock,
        { segmentOffset: new go.Point(0, -10), editable: true },
        new go.Binding("text", "label").makeTwoWay())
    ));

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
}
