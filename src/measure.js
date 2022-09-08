export function GetDistanceBetweenPoints(startPoint, endPoint) {
  let xDistance = startPoint[0] - endPoint[0];
  let yDistance = startPoint[1] - endPoint[1];
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

export function GetLineLength(line) {
  var length = line.coordinates.length;
  if (length > 1) {
    console.log(line);
    //var length = line.coordinates.length
    var output = 0;
    for (var i = 0; i < length - 1; i++) {
      var point_a = line.coordinates[i];
      var point_b = line.coordinates[i + 1];
      output += GetDistanceBetweenPoints(point_a, point_b);
    }
    return output;
  } else {
    return null;
  }
  /*console.log(line)
  var length = line.coordinates.length
  var output = 0
  for(var i = 0; i < length - 1; i++) {
    var point_a = line.coordinates[i]
    var point_b = line.coordinates[i + 1]
    output += GetDistanceBetweenPoints(point_a, point_b)
  }*/
  /* var point_a = line.coordinates[0]
  var point_b = line.coordinates[1]
  output += GetDistanceBetweenPoints(point_a, point_b)
  point_a = line.coordinates[2]
  point_b = line.coordinates[3]
  output += GetDistanceBetweenPoints(point_a, point_b)
  point_a = line.coordinates[3]
  point_b = line.coordinates[4]
  output += GetDistanceBetweenPoints(point_a, point_b)*/
  /*return GetDistanceBetweenPoints(
    //LINESTRING(-96.85 32.75, -95.35 32.75)
    line.coordinates[0],
    line.coordinates[line.coordinates.length - 1]
  );*/
  //return output
}

export function GetPerimeter() {
  throw new Error("Not Implemented");
}
