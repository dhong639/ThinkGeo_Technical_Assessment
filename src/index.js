import "./styles.css";
import * as wkt from "wkt";
import * as measure from "./measure";
import * as utils from "./utils";

// tabs
const distanceBetweenPointsTab = document.getElementById(
  "distanceBetweenPointsTab"
);
const lengthOfLineTab = document.getElementById("lengthOfLineTab");
const perimeterOfPolygonTab = document.getElementById("perimeterOfPolygonTab");
const areaOfPolygonTab = document.getElementById("areaOfPolygonTab");

// input fields
const startPointInput = document.getElementById("startPointInput");
const endPointInput = document.getElementById("endPointInput");
const lineInput = document.getElementById("lineInput");

// buttons
const calculateDistanceButton = document.getElementById(
  "calculateDistanceButton"
);
const calculateLengthButton = document.getElementById("calculateLengthButton");

// result fields
const distanceResult = document.getElementById("distanceResult");
const lengthResult = document.getElementById("lengthResult");

distanceBetweenPointsTab.addEventListener("click", () => {
  utils.switchTab(distanceBetweenPointsTab, "distanceBetweenPointsContent");
});

lengthOfLineTab.addEventListener("click", () => {
  utils.switchTab(lengthOfLineTab, "lengthOfLineContent");
});

perimeterOfPolygonTab.addEventListener("click", () => {
  utils.switchTab(perimeterOfPolygonTab, "areaOfPolygonContent");
});

areaOfPolygonTab.addEventListener("click", () => {
  utils.switchTab(areaOfPolygonTab, "perimeterOfPolygonContent");
});

calculateDistanceButton.addEventListener("click", () => {
  let startPoint = wkt.parse(startPointInput.value);
  let endPoint = wkt.parse(endPointInput.value);
  distanceResult.value = measure.GetDistanceBetweenPoints(
    startPoint.coordinates,
    endPoint.coordinates
  );
});

calculateLengthButton.addEventListener("click", () => {
  let line = wkt.parse(lineInput.value);
  lengthResult.value = measure.GetLineLength(line);
});
