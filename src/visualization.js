//import * as ol from "ol";
import Map from "ol/Map";
import View from "ol/View";
import WKT from "ol/format/WKT";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Collection from "ol/Collection";

const format = new WKT();
const features = new Collection();

export function create_graph(element_id) {
  //var vector = new VectorLayer();
  var map = (window.map = new Map({
    target: element_id,
    layers: [],
    view: new View({
      center: [-11000000, 4600000],
      zoom: 4
    })
  }));
  return map;
}

export function plot_wkt(wkt_string, map) {
  features.clear();
  var new_feature;
  try {
    new_feature = format.readFeature(wkt_string);
  } catch (err) {
    console.log(err);
  }

  if (new_feature) {
    features.push(new_feature);
    var vector = new VectorLayer({
      source: new VectorSource({ features: features })
    });
    map.addLayer(vector);
    var derived_feature = features.getArray()[0];
    var extent = derived_feature.getGeometry().getExtent();
    map.getView().fit(extent, map.getSize());
  }
}

export function clearMap(map) {
  map.removeLayer();
  features.clear();
}
