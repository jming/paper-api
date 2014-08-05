var width = 500,
    height = 500,
    innerRadius = 185,
    outerRadius = 195;

var arc_days = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

var arc_months = d3.svg.arc()
    .outerRadius(outerRadius*1.2)
    .innerRadius(innerRadius);

var arc_select = d3.svg.arc()
    .outerRadius(innerRadius)
    .innerRadius(10);

var pie_days = d3.layout.pie()
    .sort(null)
    .value(function(d) { return 1; });

var pie_months = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.num_days; });

var pie_select = d3.layout.pie()
    .sort(null)
    .value(function(d) { return 1; });

var svg_days = d3.select("#calendar-output1").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var svg_months = d3.select("#calendar-output2").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var svg_inside = d3.select('#calendar-output3').append('svg')
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("days.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = 1;
  });

  var g = svg_days.selectAll(".arc")
      .data(pie_days(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
    .attr("d", arc_days)
    .style("fill", function(d) { return getColor(d, 'days'); });

  g.append("text")
    .attr("transform", function(d) {
      var c = arc_days.centroid(d),
          x = c[0],
          y = c[1],
          h = Math.sqrt(x*x + y*y),
          labelr = 200;
      return "translate(" + (x/h * labelr) + ',' + (y/h * labelr) + ')rotate(' + angle(d) + ')';

    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style('font-size','10px')
    .text(function(d) { return getText(d,'days'); });

});


d3.csv('months.csv', function (error, data) {
  data.forEach(function(d) {
    d.population = +d.num_days;
  });

  var g = svg_months.selectAll(".arc")
      .data(pie_months(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc_months)
      .style("fill", function(d) { return getColor(d, 'months'); });

  g.append("text")
      .attr("transform", function(d) {
        // console.log(d);

        var c = arc_months.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x*x + y*y),
            labelr = 215;
        return "translate(" + (x/h * labelr) + ',' + (y/h * labelr) + ')rotate(' + angle(d) + ')';

      })
      .attr("dy", ".35em")
      .attr('x', 10)
      .style("text-anchor", "middle")
      .text(function(d) { return getText(d,'months'); });

});

function getColor(d, type) {
  var colors_basic = ['#FF66CC', '#FF667F', '#FF9966', '#FFE666', '#CCFF66', '#7FFF66', '#66FF99', '#66FFE6', '#66CCFF', '#667FFF', '#9966FF', '#E666FF'];
  var colors_highlight = ['#CC0088', '#CC0022', '#CC4400', '#CCAA00', '#88CC00', '#22CC00', '#00CC44', '#00CCAA', '#0088CC', '#0022CC', '#4400CC', '#AA00CC'];

  if (type == 'days') {
    // console.log(d);
    var m = parseInt(d.data.date.split('/')[0],10) - 1;
    
    if (parseInt(d.data.date.split('/')[1],10) % 5 === 0) {
      return colors_highlight[m];
    }
    return colors_basic[m];
  }
  else {
    return colors_basic[parseInt(d.data.month,10)-1];
  }

}

function getText(d, type) {
  if (type === 'days') {
    var m = parseInt(d.data.date.split('/')[1],10);
    if (m % 5 === 0) {
      return d.data.date.split('/')[1];
    }
  }
  else {
    return d.data.name;
  }
}

function angle(d) {
  var a = (d.startAngle + d.endAngle) * 90 / Math.PI ;
  return a;
}

