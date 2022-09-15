//https://clydedacruz.github.io/openstreetmap-wkt-playground/

import "./styles.css";
import * as wkt from "wkt";
import * as measure from "./measure";
import * as utils from "./utils";
//import * as ol from "ol";
import * as visualization from "./visualization";

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
const perimeterInput = document.getElementById("perimeterInput");
const areaInput = document.getElementById("areaInput");

// check that input strings are correct
const is_point = /POINT\(-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?\)/;
const is_line = /LINESTRING\((?:-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?,)*-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?\)/;
const is_polygon = /POLYGON\(\((?:-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?,)*-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?\)\)/;

// buttons
const calculateDistanceButton = document.getElementById(
  "calculateDistanceButton"
);
const calculateLengthButton = document.getElementById("calculateLengthButton");
const calculatePerimeter = document.getElementById("calculatePerimeter");
const calculateArea = document.getElementById("calculateArea");

const clearPoint = document.getElementById("clearPoint");
const clearLine = document.getElementById("clearLine");
const clearPerimeter = document.getElementById("clearPerimeter");
const clearArea = document.getElementById("clearArea");

// result fields
const distanceResult = document.getElementById("distanceResult");
const lengthResult = document.getElementById("lengthResult");
const perimeterResult = document.getElementById("perimeterResult");
const areaResult = document.getElementById("areaResult");

/**
 * initialize size for graphs
 * might(?) be bugged
 */
function resize_maps() {
  var map_height = window.innerHeight / 4;

  var width_mapPoint = lineInput.style.width;
  var element_mapPoint = document.getElementById("mapPoint");
  element_mapPoint.style.height = map_height + "px";
  element_mapPoint.style.width = width_mapPoint + "px";

  var width_mapLine = lineInput.style.width;
  var element_mapLine = document.getElementById("mapLine");
  element_mapLine.style.height = map_height + "px";
  element_mapLine.style.width = width_mapLine + "px";

  var width_mapPerimeter = perimeterInput.style.width;
  var element_mapPerimeter = document.getElementById("mapPerimeter");
  element_mapPerimeter.style.height = map_height + "px";
  element_mapPerimeter.style.width = width_mapPerimeter + "px";

  var width_mapArea = perimeterInput.style.width;
  var element_mapArea = document.getElementById("mapArea");
  element_mapArea.style.height = map_height + "px";
  element_mapArea.style.width = width_mapArea + "px";
}
window.onresize = resize_maps;
resize_maps();

// initialize graphs for line, perimeter, and area
const mapPoint = visualization.create_graph("mapPoint");
const mapLine = visualization.create_graph("mapLine");
const mapPerimeter = visualization.create_graph("mapPerimeter");
const mapArea = visualization.create_graph("mapArea");

distanceBetweenPointsTab.addEventListener("click", () => {
  utils.switchTab(distanceBetweenPointsTab, "distanceBetweenPointsContent");
});

lengthOfLineTab.addEventListener("click", () => {
  utils.switchTab(lengthOfLineTab, "lengthOfLineContent");
});

perimeterOfPolygonTab.addEventListener("click", () => {
  utils.switchTab(perimeterOfPolygonTab, "perimeterOfPolygonContent");
});

areaOfPolygonTab.addEventListener("click", () => {
  utils.switchTab(areaOfPolygonTab, "areaOfPolygonContent");
});

calculateDistanceButton.addEventListener("click", () => {
  var match_startPoint = is_point.test(startPointInput.value);
  var match_endPoint = is_point.test(endPointInput.value);
  if (match_startPoint && match_endPoint) {
    let startPoint = wkt.parse(startPointInput.value);
    let endPoint = wkt.parse(endPointInput.value);
    /**
     * not optimal
     * needs to plot points
     */
    var wkt_string =
      "LINESTRING(" +
      startPoint.coordinates.join(" ") +
      "," +
      endPoint.coordinates.join(" ") +
      ")";
    visualization.plot_wkt(wkt_string, mapPoint);
    distanceResult.value = measure.GetDistanceBetweenPoints(
      startPoint.coordinates,
      endPoint.coordinates
    );
  } else {
    distanceResult.value = "ERROR: at least one point is invalid";
  }
});

calculateLengthButton.addEventListener("click", () => {
  var match_line = is_line.test(lineInput.value);
  if (match_line) {
    visualization.plot_wkt(lineInput.value, mapLine);
    let line = wkt.parse(lineInput.value);
    lengthResult.value = measure.GetLineLength(line);
  } else {
    lengthResult.value = "ERROR: line is invalid";
  }
});

calculatePerimeter.addEventListener("click", () => {
  var match_polygon = is_polygon.test(perimeterInput.value);
  if (match_polygon) {
    visualization.plot_wkt(perimeterInput.value, mapPerimeter);
    let polygon = wkt.parse(perimeterInput.value);
    perimeterResult.value = measure.GetPerimeter(polygon);
  } else {
    perimeterResult.value = "ERROR: polygon is invalid";
  }
});

calculateArea.addEventListener("click", () => {
  var match_polygon = is_polygon.test(areaInput.value);
  if (match_polygon) {
    visualization.plot_wkt(areaInput.value, mapArea);
    let polygon = wkt.parse(areaInput.value);
    areaResult.value = measure.GetArea(polygon);
  } else {
    areaResult.value = "ERROR: polygon is invalid";
  }
});

clearPoint.addEventListener("click", () => {
  visualization.clearMap(mapPoint);
});

clearLine.addEventListener("click", () => {
  visualization.clearMap(mapLine);
});

clearPerimeter.addEventListener("click", () => {
  visualization.clearMap(mapPerimeter);
});

clearArea.addEventListener("click", () => {
  visualization.clearMap(mapArea);
});
