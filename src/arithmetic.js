function print_intersection(coordinates) {
	var lines = []
	for(var i = 0; i<coordinates.length - 1; i++) {
		var point_a = coordinates[i]
		var point_b = coordinates[i + 1]
		var slope = (point_b[1] - point_a[1])/(point_b[0] - point_a[0])
		var intercept_y = point_b[1] - slope * point_b[0]
		lines.push({
			start: point_a,
			end: point_b,
			slope: slope,
			intercept_y: intercept_y
		})
	}
	var traversed = []
	var points_visited = {}
	for(var i = 0; i<lines.length; i++) {
		var line_a = lines[i]
		for(var j = 0; j<traversed.length; j++) {
			var index_b = traversed[j]
			var line_b = lines[index_b]
			var intersection = get_intersection(line_a, line_b)
			if(intersection != null) {
				var is_startA = compare_points(intersection, line_a.start)
				var is_endA = compare_points(intersection, line_a.end)
				var is_startB = compare_points(intersection, line_b.start)
				var is_endB = compare_points(intersection, line_b.end)
				if(!is_startA && !is_endA && !is_startB && !is_endB) {
					var is_onA = is_point_onLine(intersection, line_a)
					var is_onB = is_point_onLine(intersection, line_b)
					if(is_onA && is_onB) {
						console.log('found intersection: ')
						console.log(intersection)
					}
				}
			}
		}
		traversed.push(i)
		var x = line_a.end[0]
		var y = line_a.end[1]
		if(x in points_visited == false) {
			points_visited[x] = new Set()
			points_visited[x].add(y)
		}
		else {
			if(points_visited[x].has(y) == false) {
				points_visited[x].add(y)
			}
			else {
				console.log('found repeated point')
				console.log(line_a.end)
			}
		}
	}
	console.log(points_visited)
}

function compare_points(point_a, point_b) {
	return point_a[0] == point_b[0] && point_a[1] == point_b[1]
}

function compare_line(line_a, line_b) {
	var same_point = compare_points(line_a.end, line_b.start) 
	return same_point && line_a.slope == line_b.slope && line_a.intercept_y == line_b.intercept_y
}

function get_intersection(line_a, line_b) {
	if(line_b.slope - line_a.slope == 0) {
		return null
	}
	else {
		if(!isFinite(line_a.slope) && !isFinite(line_b.slope)) {
			return null
		}
		else if(!isFinite(line_a.slope)) {
			var x = line_a.start[0]
			return [x, line_b.slope * x + line_b.intercept_y]
		}
		else if(!isFinite(line_b.slope)) {
			var x = line_b.start[0]
			return [x, line_a.slope * x + line_a.intercept_y]
		}
		else {
			var x = (line_a.intercept_y - line_b.intercept_y) / (line_b.slope - line_a.slope)
			return [x, line_a.slope * x + line_a.intercept_y]
		}
	}
}

function is_point_onLine(point, line) {
	var x = point[0]
	var y = point[1]
	//if(line.slope * x + line.intercept_y == y) {
		var min_x = Math.min(line.start[0], line.end[0])
		var max_x = Math.max(line.start[0], line.end[0])
		var min_y = Math.min(line.start[1], line.end[1])
		var max_y = Math.max(line.start[1], line.end[1])
		return x >= min_x && x <= max_x && y >= min_y && y <= max_y
	//}
	//else {
		//return false
	//}
}

//var coordinates = [[0, 0], [4, 0], [0, 4], [4, 4], [0, 0]]
//var coordinates = [[0, 0], [4, 0], [2, 2], [0, 4], [4, 4], [2, 2], [0, 0]]
//var coordinates = [[0, 0], [4, 0], [0, 2], [4, 2], [0, 4], [4, 4], [2, 5], [0, 0]]
//var coordinates = [[2, 0], [4, 0], [0, 2], [4, 2], [0, 4], [4, 4], [2, 5], [2, 0]]
//var coordinates = [[0, 0], [1, -4], [1, 0], [4, 0], [1, 4], [1, 0], [0, 0]]
var coordinates = [[0, 2], [0, -4], [4, -4], [4, 0], [-2, 0], [-2, 2], [0, 2]]
print_intersection(coordinates)
