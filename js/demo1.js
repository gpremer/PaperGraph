var horizontal = new Point(1,0);
var vertical = new Point(0,-1);


function Graph(width, height) {
  xOffset = 40;
  yOffset = 40;
  xSpace = xOffset;
  ySpace = yOffset;
  arrowLength = 20;
  arrowWidth = 20;
  gridLineYSpacing = 100;
  xAxisLength = width - xOffset - xSpace;
  yAxisLength = height - yOffset - ySpace;
  origin = new Point(xOffset, height-yOffset);
  xMin = 0;
  xMax = 1;
  valueMin = 0;
  valueMax = 1;
  yMajorTicks = 1;
  yMinorTicks = 1;
  numIndices = 1;
  barWidth = 0.8; // 80%
  
  this.setXRange = function(xMin_, xMax_) {
    xMin = xMin_
    xMax = xMax_
  }
  
  this.setYRange = function(valueMin_, valueMax_) {
    valueMin = valueMin_
    valueMax = valueMax_
  }
  
  this.setYTicks = function(major, minor) {
    yMajorTicks = major
    yMinorTicks = minor
  }
  
  this.draw = function() {
    drawAxes()
    drawGridLines();
    drawYTicks();
    drawValues();
  }

  drawAxes = function() {
    var arrowHead = new Path(0, 0);
    arrowHead.style= { strokeColor: 'white', strokeWidth: 1, strokeCap: 'butt', fillColor: '#ffffff' };
    arrowHead.lineBy(-arrowLength, arrowWidth / 2);
    arrowHead.lineBy(0, -arrowWidth);
    arrowHead.lineBy(arrowLength, arrowWidth / 2);
    
    var xAxis = new Path(origin);
    xAxis.style= { strokeColor: 'white', strokeWidth: 4, strokeCap: 'round' };
    xAxis.lineBy(xAxisLength, 0);
    
    var xAxisArrow = arrowHead.clone();
    xAxisArrow.position = (origin + horizontal * (xAxisLength + arrowLength / 2));

    var yAxis = new Path(origin);
    yAxis.style = { strokeColor: 'white', strokeWidth: 4, strokeCap: 'round' };
    yAxis.lineBy(0, -yAxisLength - 10 );

    var yAxisArrow = arrowHead.clone();
    yAxisArrow.rotate(-90);
    yAxisArrow.position = (origin + vertical * (yAxisLength + 10 + arrowLength / 2));
  }

  dataValueToY = function(value) {
    return value / (valueMax - valueMin ) * yAxisLength;
  }
  
  dataIndexToX = function(index) {
    return (index + 0.5) / numIndices * xAxisLength; 
  }

  drawGridLines = function () {
    for (v= yMajorTicks ; dataValueToY(v) <= yAxisLength ; v += yMajorTicks ) {
      var gridLine = new Path(origin + vertical * dataValueToY(v));
      gridLine.style = { strokeColor: 'white', strokeWidth: 2, strokeCap: 'round' };
      gridLine.dashArray = [10,10]
      gridLine.lineBy(xAxisLength, 0)
    }
  }

  drawYTicks = function() {
    var minorTick = new Path(0,0);
    minorTick.lineBy(-3, 0);
    minorTick.style = { strokeColor: 'white', strokeWidth: 1, strokeCap: 'butt' };
    minorTick = new Symbol(minorTick);
    for (v= yMinorTicks ; dataValueToY(v) <= yAxisLength ; v += yMinorTicks ) {
      minorTick.place(origin - new Point(3,0) + vertical * dataValueToY(v));
    }
    var majorTick = new Path(0,0);
    majorTick.lineBy(-6, 0);
    majorTick.style = { strokeColor: 'white', strokeWidth: 2, strokeCap: 'butt' };
    majorTick = new Symbol(majorTick);
    for (v= yMajorTicks ; dataValueToY(v) <= yAxisLength ; v += yMajorTicks ) {
      majorTick.place(origin - new Point(3,0) + vertical * dataValueToY(v));
      var label = new PointText(new Point(origin - new Point(15,0) + vertical * dataValueToY(v)));
      label.fillColor = "white";
      label.translate(-7*Math.floor(Math.log(v)/Math.log(10)+0.01), 4); // TODO: PointText.bounds does not work in released version. Use it when it is released. 
      label.content = v;
    }
  }

  drawValues = function() {
    values = [1000, 800, 200, 500, 1100, 900, 543, 800, 800, 1000, 1200, 1100, 700];
    numIndices = values.length
    
    for (i= 0; i < numIndices ; ++i) {
      var barWidthInX = barWidth * xAxisLength / numIndices;
      var start = origin + new Point(dataIndexToX(i) - barWidthInX / 2, 0);
      var box = new Path.Rectangle(new Rectangle(start, new Size(barWidthInX, -dataValueToY(values[i]))));
      box.style = { strokeColor: 'white', strokeWidth: 2, strokeCap: 'butt', fillColor: '#ff5522' };
    }
  }
}

var g= new Graph(1200, 600);
g.setXRange(0, 23);
g.setYRange(0, 1200);
g.setYTicks(300, 30);
g.draw();