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
    yAxis.lineBy(0, -yAxisLength );

    var yAxisArrow = arrowHead.clone();
    yAxisArrow.rotate(-90);
    yAxisArrow.position = (origin + vertical * (yAxisLength + arrowLength / 2));
  }

  dataValueToY = function(value) {
    return value / (valueMax - valueMin ) * yAxisLength;
  }

  drawGridLines = function () {
    for (v= yMajorTicks ; dataValueToY(v) <= yAxisLength ; v += yMajorTicks ) {
      var gridLine = new Path(origin + vertical * dataValueToY(v));
      gridLine.style = { strokeColor: 'white', strokeWidth: 2, strokeCap: 'round' };
      gridLine.dashArray = [10,10]
      gridLine.lineBy(xAxisLength, 0)
    }
  }

  drawValues = function() {
    values = [1000, 800, 200, 500, 1100, 900, 543, 800, 800, 1000, 1200, 1100, 700];
    
    for (i= 0; i < values.length ; ++i) {
      var box = new Path.Rectangle(origin+new Point(10+i*80,0), origin+new Point(70+ i*80, -values[i]/2));
      box.style = { strokeColor: 'white', strokeWidth: 2, strokeCap: 'butt', fillColor: '#ff5522' };
    }
  }
}

var g= new Graph(1200, 600);
g.setXRange(0, 23);
g.setYRange(0, 1200);
g.setYTicks(300, 30);
g.draw();