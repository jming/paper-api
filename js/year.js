var width = 500,
    height = 500,
    innerRadius = 185,
    outerRadius = 195,
    innerInnerRadius = 175;
    innerestRadius = 50;

var arc_days = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

var arc_months = d3.svg.arc()
    .outerRadius(outerRadius*1.2)
    .innerRadius(innerRadius);

var arc_select = d3.svg.arc()
    .outerRadius(innerRadius)
    .innerRadius(innerInnerRadius);

// var circle_left = d3.svg.circle()

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

var svg_select = d3.select('#calendar-output3').append('svg')
    .attr("width", width*2)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width*1.5 + "," + height / 2 + ")");



function updateHighlights(data) {

  var arc_inside = d3.svg.arc()
    .outerRadius(innerInnerRadius)
    .innerRadius(innerestRadius);

  var pie_inside = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.num_days; });

  var svg_inside = d3.select('#calendar-output4').append('svg')
    .attr("width", width*2)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width*1.5 + "," + height / 2 + ")");
  // d3.csv('days.csv',function(error,data) {
    // console.log(data);

  var g = svg_inside.selectAll(".arc")
      .data(pie_inside(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
    .attr("d", arc_inside)
    .style("fill", function(d) { return getColor(d, 'inside'); })
    .style('stroke', 'black');

  g.append("text")
    .attr("transform", function(d) {
      // console.log(d);

      var c = arc_inside.centroid(d),
          x = c[0],
          y = c[1],
          h = Math.sqrt(x*x + y*y),
          labelr = innerestRadius+50;
      return "translate(" + (x/h * labelr) + ',' + (y/h * labelr) + ')rotate(' + angle(d) + ')';

    })
    .attr("dy", ".35em")
    .attr('x', 10)
    .style("text-anchor", "middle")
    .style('font-size', '18px')
    .text(function(d) { return getText(d,'inside'); });

  g.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)
  // });
}

updateHighlights([
  {'num_days': 90, 'section':1, 'name': 'First Trimester'}, 
  {'num_days': 90, 'section':3, 'name': 'Second Trimester'},
  {'num_days': 90, 'section':4, 'name': 'Third Trimester'},
  {'num_days': 95, 'section':0, 'name': ''}

]);

d3.csv("days.csv", function(error, data) {

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
          labelr = outerRadius+5;
      return "translate(" + (x/h * labelr) + ',' + (y/h * labelr) + ')rotate(' + angle(d) + ')';

    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style('font-size','10px')
    .text(function(d) { return getText(d,'days'); });

  g.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)

  var g2 = svg_select.selectAll('.arc')
      .data(pie_select(data))
    .enter().append('g')
      .attr('class','arc');

  g2.append("path")
    .attr("d", arc_select)
    .style("fill", function(d) { return getColor(d, 'select'); });

  g2.append("text")
    .attr("transform", function(d) {
      var c = arc_select.centroid(d),
          x = c[0],
          y = c[1],
          h = Math.sqrt(x*x + y*y),
          labelr = innerInnerRadius-5;
      return "translate(" + (x/h * labelr) + ',' + (y/h * labelr) + ')rotate(' + angle(d) + ')';

    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style('font-size','10px')
    .text(function(d) { return getText(d,'select'); });

});


d3.csv('months.csv', function (error, data) {
  // data.forEach(function(d) {
  //   d.population = +d.num_days;
  // });

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
            labelr = outerRadius+20;
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
  var colors_inside = ['#fff', '#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'];

  if (type == 'days') {
    // console.log(d);
    var m = parseInt(d.data.date.split('/')[0],10) - 1;
    
    if (parseInt(d.data.date.split('/')[1],10) % 5 === 0) {
      return colors_highlight[m];
    }
    return colors_basic[m];
  }
  else if (type=='months') {
    return colors_basic[parseInt(d.data.month,10)-1];
  }
  else if (type == 'select') {
    var day_no = parseInt(d.data.day_no,10);
    // if (day_no == 1 || day_no == 14 || day_no == 280) {
    //   return 'red';
    // }
    if (day_no % 7 === 0) {
      return 'grey';
    }
    else {
      return '#C0C0C0';
    }
  }
  else if (type == 'inside') {
    // if (dn == 0 || dn == 13 || dn == 279) {
    //   return 'red';
    // }
    return colors_inside[d.data.section];
  }

}

function getText(d, type) {
  if (type === 'days') {
    var m = parseInt(d.data.date.split('/')[1],10);
    if (m % 5 === 0) {
      return d.data.date.split('/')[1];
    }
  }
  else if (type=='months' || type=='inside') {
    return d.data.name;
  }
  else if (type=='select') {
    var day_no = parseInt(d.data.day_no,10);
    if (day_no % 7 === 0) {
      return day_no;
    }
  }
  // else if (type=='inside') {
  //   var day_no = parseInt(d.data.day_no,10);
  //   if (day_no == 1) {
  //     // return day_no;
  //     // return 'Last menses';
  //   }
  //   else if (day_no == 13) {
  //     return 'Conception';
  //   }
  //   else if (day_no == 279) {
  //     return 'Expected delivery';
  //   }
  // }
}

function angle(d) {
  var a = (d.startAngle + d.endAngle) * 90 / Math.PI ;
  return a;
}

function newDate() {

  var name = $('#date-name').val();
  var start = $('#date-start').val();
  var end = $('#date-end').val();

  if (name !== '' && start != '' && end != '') {

    $('#date-name').val('');
    $('#date-start').val('');
    $('#date-end').val('');

    $('#date-table').find('tbody')
      .append($('<tr>')
        .append($('<td>').text(name))
        .append($('<td>').text(start))
        .append($('<td>').text(end))
      );
  }

  
}

function updateTool() {

  newDate();

  var data = [];
  var total_days = 0;

  $('#date-table tbody tr').map(function() {
    var row = $(this);
    var section = new Object();
    section.name = row.find(':nth-child(1)').text();
    section.num_days = parseInt(row.find(':nth-child(3)').text()) - parseInt(row.find(':nth-child(2)').text());
    section.section = data.length+1;
    total_days += section.num_days;
    data.push(section);
  });

  var final_section = {
    'num_days' : 365-total_days,
    'section' : 0,
    'name': ''
  }
  data.push(final_section);

  console.log(data);
  $('#calendar-output4').empty();
  updateHighlights(data);

  // {'num_days': 90, 'section':1, 'name': 'First Trimester'}, 
  // {'num_days': 90, 'section':3, 'name': 'Second Trimester'},
  // {'num_days': 90, 'section':4, 'name': 'Third Trimester'},
  // {'num_days': 95, 'section':0, 'name': ''}

}