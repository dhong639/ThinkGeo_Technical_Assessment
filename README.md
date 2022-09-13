# Measure WKT

Measures the distance between points and length of lines from WellKnownText

## Dependencies

- [Jest Test Suite](https://jestjs.io/)
- [wkt](https://github.com/benrei/wkt)
- [Bulma CSS](https://bulma.io/)

## Issues
"In geometry, a polygon is a plane figure that is described by a finite number of straight line segments connected to form a closed polygonal chain."

This is the geometrical definition of a polygon. With the absolute simplest interpretation, a polygon is an ordered list of straight lines that start and terminate at some point, with all points in the polygon represented as coordinates. Because this shape will obviously not include just regular polygons, the safest option is to use the Shoelace (Gauss' or Surveyor's) Forumla to determine area (basically, half the summation of determinants of consecutive lines). 

However, the lines in some polygons intersect. These are complex polygons, and the edges aren't necessarily clear. One interpretation is to treat a complex polygon as a number of smaller polygons and return area as summation of the composite parts. On the other hand, the instructions only ask for the "area of a polygon", which, under the previous interpretation, means that area is only calculated for a single polygon. 
