// global variables

var MARGIN_HOR = 0;
var MARGIN_VER = 0;

var MAX_WIDTH = 210;
var MAX_HEIGHT = 290;

var NUM_GRIDS_HOR = 25;
var NUM_GRIDS_VER = 40;

$('#generate-pdf-button').on('click', function() {

  var doc = new jsPDF();

  // doc.setFontSize(8);

  // // create gridlines for own use
  // // borderGrids(doc);

  // // draw the given number of rectangles
  // // draw (40-1)*25 date strips
  // // rectGrid(doc, 40, 25, 0, 0, true);

  lineGraph(doc);
  // var svg = $('body svg');
  // console.log(svg);
  // svgElementToPdf(svg, doc,{
  //   scale: 72/96,
  //   removeInvalid: true
  // });
  // doc.addHTML(document.body,function() {
  //   doc.output('datauri');
  //   // var string = doc.output('datauristring');
  //   // $('.preview-pane').attr('src', string);
  // });

  // print dates

  // doc.save('Test.pdf');
  // doc.output('datauri');

});

function rectGrid(doc, num_ver, num_hor, margin_ver, margin_hor, dates) {
  var rect_width = MAX_WIDTH / num_hor - 2 * margin_hor;
  var rect_height = MAX_HEIGHT / num_ver - 2 * margin_ver;
  var d = new Date();
  d.setFullYear(2010,0,1);

  for (var h = 0; h < num_hor; h++) {
    for (var v = 0; v < num_ver; v++) {

      var x = margin_hor + h*(2 * margin_hor + rect_width);
      var y = margin_ver + v*(2 * margin_ver + rect_height);

      if (dates && (v !== 0)) {
        doc.text(x+1, y-2, d.getMonth()+1 + '/' + d.getDate());
        d.setDate(d.getDate() + 1);
      }

      doc.rect(x, y, rect_width, rect_height);
    }
  }
}

function borderGrids(doc) {
  for (var i = 0; i < 22; i++) {
    doc.line( i*10, 0, i*10, 10);
    doc.text(i*10, 10, (i*10).toString());
  }

  for (var j = 0; j < 30; j++) {
    doc.line(0, j*10, 10, j*10);
    doc.text(10, j*10, (j*10).toString());
  }
}



function lineGraph(doc) {

  var percents = ['P1', 'P3', 'P15', 'P50', 'P85', 'P97', 'P99'];

  var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var area = d3.svg.area()
      .x0(function(d) { return x(d.x0); })
      .x1(function(d) { return x(d.Weight); })
      .y(function(d) { return y(d.Height); });

  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.Weight); })
      .y(function(d) { return y(d.Height); });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("data/wfh_boys_p_exp.txt", function(error, data) {

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Height"; }));

    var percentiles = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            Height: +d.Height,
            Weight: +d[name],
            x0: (name == 'P1') ? height :+d[percents[percents.indexOf(name) - 1]]
          };
        })
      };
    });

    x.domain([
      d3.min(percentiles, function(c) { return d3.min(c.values, function(v) { return v.Weight; }); }),
      d3.max(percentiles, function(c) { return d3.max(c.values, function(v) { return v.Weight; }); })
    ]);

    y.domain([
      d3.min(percentiles, function(c) { return d3.min(c.values, function(v) { return v.Height; }); }),
      d3.max(percentiles, function(c) { return d3.max(c.values, function(v) { return v.Height; }); })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append('text')
        .attr('x', 6)
        .attr('dx', '.71em')
        .style('text-anchor', 'end')
        .text('Weight');

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Height");

    var percentile = svg.selectAll(".percentile")
        .data(percentiles)
      .enter().append("g")
        .attr("class", "percentile");

    percentile.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.name); });

    percentile.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.Weight) + "," + y(d.value.Height) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });

    percentile.append('path')
        .attr('class', 'area')
        .attr('d', function(d) { return area(d.values); })
        .style("fill", function(d) { return color(d.name); });

  });

}
