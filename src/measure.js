export function GetDistanceBetweenPoints(startPoint, endPoint) {
  let xDistance = startPoint[0] - endPoint[0];
  let yDistance = startPoint[1] - endPoint[1];
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

export function GetLineLength(line) {
  var length = line.coordinates.length;
  if (length > 1) {
    var output = 0;
    for (var i = 0; i < length - 1; i++) {
      var point_a = line.coordinates[i];
      var point_b = line.coordinates[i + 1];
      output += GetDistanceBetweenPoints(point_a, point_b);
    }
    return output;
  } else {
    return "WARNING: length 0, check input";
  }
}

export function GetPerimeter(polygon) {
  console.log(polygon);
  var coordinates = polygon.coordinates[0];
  var length = coordinates.length;
  if (length >= 4) {
    if (IsPolygon(polygon)) {
      var output = 0;
      for (var i = 0; i < length - 1; i++) {
        var point_a = coordinates[i];
        var point_b = coordinates[i + 1];
        output += GetDistanceBetweenPoints(point_a, point_b);
      }
      return output;
    } else {
      return "WARNING: different start and end, check input";
    }
  } else {
    return "WARNING: polygon has insufficient lines";
  }
}

export function GetArea(polygon) {
  var coordinates = polygon.coordinates[0];
  var length = coordinates.length;
  if (length >= 4) {
    if (IsPolygon) {
      if (has_intersection(coordinates) === false) {
        /**
         * this is the shoelace formula for area
         * will not work for complex polygons
         * will likely have issues if lines overlap
         */
        var area = 0;
        for (var i = 0; i < coordinates.length - 1; i++) {
          var point_a = coordinates[i];
          var point_b = coordinates[i + 1];
          area += point_a[0] * point_b[1] - point_a[1] * point_b[0];
        }
        return area / 2;
      } else {
        return "WARNING: does not support complex polygon";
      }
    } else {
      return "WARNING: different start and end, check input";
    }
  } else {
    return "WARNING: polygon has insufficient lines";
  }
}

/**
 * this function has a bad name
 * it should really be named "IsSame_StartEnd"
 */
function IsPolygon(polygon) {
  /**
   * check that start and end coordinate of polygon are same
   * may be better to append first coordinate to end instead
   */
  var start = polygon.coordinates[0];
  var end = polygon.coordinates[polygon.coordinates.length - 1];
  return compare_points(start, end);
}

function compare_points(point_a, point_b) {
  return point_a[0] === point_b[0] && point_a[1] === point_b[1];
}

function has_intersection(coordinates) {
  var output = false;
  var lines = [];
  /**
   * convert each consecutive pair of points into a line
   * a line consists of:
   *  start point
   *  end point
   *  slope (y/x)
   *  y intercept (add y to slope * x)
   */
  for (var i = 0; i < coordinates.length - 1; i++) {
    var point_a = coordinates[i];
    var point_b = coordinates[i + 1];
    var slope = (point_b[1] - point_a[1]) / (point_b[0] - point_a[0]);
    var intercept_y = point_b[1] - slope * point_b[0];
    lines.push({
      start: point_a,
      end: point_b,
      slope: slope,
      intercept_y: intercept_y
    });
  }
  //  traversed is indices of all traveled lines
  var traversed = [];
  /**
   * points_visited is a dictionary
   * keys are x coordinates
   * values are y coordinates
   */
  var points_visited = {};
  for (var i = 0; i < lines.length; i++) {
    var line_a = lines[i];
    for (var j = 0; j < traversed.length; j++) {
      /**
       * determine if two lines intersect
       */
      var index_b = traversed[j];
      var line_b = lines[index_b];
      var intersection = get_intersection(line_a, line_b);
      if (intersection != null) {
        var is_startA = compare_points(intersection, line_a.start);
        var is_endA = compare_points(intersection, line_a.end);
        var is_startB = compare_points(intersection, line_b.start);
        var is_endB = compare_points(intersection, line_b.end);
        if (!is_startA && !is_endA && !is_startB && !is_endB) {
          /**
           * determine if intersection is on either of the lines
           */
          var is_onA = is_point_onLine(intersection, line_a);
          var is_onB = is_point_onLine(intersection, line_b);
          if (is_onA && is_onB) {
            console.log("found intersection: ");
            console.log(intersection);
            output = true;
          }
        }
      }
    }
    traversed.push(i);
    /**
     * cannot visit a point that was already visited
     * this counts as an intersection
     */
    var x = line_a.end[0];
    var y = line_a.end[1];
    if (x in points_visited === false) {
      points_visited[x] = new Set();
      points_visited[x].add(y);
    } else {
      if (points_visited[x].has(y) === false) {
        points_visited[x].add(y);
      } else {
        console.log("found repeated point");
        console.log(line_a.end);
        output = true;
      }
    }
  }
  //console.log(points_visited)
  return output;
}

function get_intersection(line_a, line_b) {
  if (line_b.slope - line_a.slope === 0) {
    return null;
  } else {
    var x;
    if (!isFinite(line_a.slope) && !isFinite(line_b.slope)) {
      return null;
    } else if (!isFinite(line_a.slope)) {
      x = line_a.start[0];
      return [x, line_b.slope * x + line_b.intercept_y];
    } else if (!isFinite(line_b.slope)) {
      x = line_b.start[0];
      return [x, line_a.slope * x + line_a.intercept_y];
    } else {
      x =
        (line_a.intercept_y - line_b.intercept_y) /
        (line_b.slope - line_a.slope);
      return [x, line_a.slope * x + line_a.intercept_y];
    }
  }
}

function is_point_onLine(point, line) {
  /**
   * portions of function unavailable due to decimal rounding errors
   */
  var x = point[0];
  var y = point[1];
  //if(line.slope * x + line.intercept_y == y) {
  var min_x = Math.min(line.start[0], line.end[0]);
  var max_x = Math.max(line.start[0], line.end[0]);
  var min_y = Math.min(line.start[1], line.end[1]);
  var max_y = Math.max(line.start[1], line.end[1]);
  return x >= min_x && x <= max_x && y >= min_y && y <= max_y;
  //}
  //else {
  //return false
  //}
}
