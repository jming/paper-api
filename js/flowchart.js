var svgW=800,
    svgH =1200,
    rHeight=80,
    rWidth=120;

function tree() {

  var ttree = {x:svgW/2-rWidth/2, y:20, w:rWidth+10, h:rHeight+15};

  ttree.vis={
    v:0,
    l:'START',
    p: {x:ttree.x, y:ttree.y},
    c:[],
    t:'q'
  };
  ttree.size=1;
  
  ttree.getVertices =  function(){
    var v =[];
    function getVertices(t,f){
      v.push({v:t.v, l:t.l, p:t.p, f:f, t:t.t});
      t.c.forEach(function(d){ return getVertices(d,{v:t.v, p:t.p}); });
    }
    getVertices(ttree.vis,{});
    return v.sort(function(a,b){ return a.v - b.v;});
  };
  
  ttree.getEdges =  function(){
    var e =[];
    function getEdges(_){
      _.c.forEach(function(d){ e.push({v1:_.v, l1:_.l, p1:_.p, v2:d.v, l2:d.l, p2:d.p});});
      _.c.forEach(getEdges);
    }
    getEdges(ttree.vis);
    return e.sort(function(a,b){ return a.v2 - b.v2;});
  };
  
  ttree.addLeaf = function(_){

    function addLeaf(t){
      if(t.v==_){
        t.c.push({
          v:ttree.size++,
          l:$('#editLeaf-answer').val(),
          p:{},
          c:[],
          t:'o'
        });
        t.c[t.c.length - 1].c.push({
        // t.c.push({
          v:ttree.size++,
          l:$('#editLeaf-label').val(),
          p:{},
          c:[],
          t:$('#editLeaf-type').val()
        });
        return;
      }
      t.c.forEach(addLeaf);
    }
    addLeaf(ttree.vis);
    reposition(ttree.vis);
    redraw();
  };

  ttree.editLeaf = function(_) {
    function editLeaf(t){
      if(t.v==_) {
        if (t.t != 'o') {
          $('#editLeaf-answer').val('');
          $('#editLeaf-label').val('');
          $('#editLeaf-type').val('q');
          $('#editLeaf-v').val(t.v);
          $('#editLeaf-answer-group').show();
          $('#editLeaf-modal').modal();
        }
      }
      t.c.forEach(editLeaf);
    }
    editLeaf(ttree.vis);
  };
  
  redraw = function(){

    var edges = d3.select("#g_lines")
      .selectAll('line')
      .data(ttree.getEdges());
    
    edges.transition().duration(500)
      .attr('x1',function(d){ return d.p1.x+rWidth/2;})
      .attr('y1',function(d){ return d.p1.y+rHeight;})
      .attr('x2',function(d){ return d.p2.x+rWidth/2;})
      .attr('y2',function(d){ return d.p2.y;});
  
    edges.enter()
      .append('line')
        .attr('x1',function(d){ return d.p1.x+rWidth/2;})
        .attr('y1',function(d){ return d.p1.y+rHeight;})
        .attr('x2',function(d){ return d.p1.x+rWidth/2;})
        .attr('y2',function(d){ return d.p1.y+rHeight;})
      .transition().duration(500)
        .attr('x2',function(d){ return d.p2.x+rWidth/2;})
        .attr('y2',function(d){ return d.p2.y;});
      
    var rects = d3.select("#g_rects")
      .selectAll('rect')
      .data(ttree.getVertices());

    rects.transition().duration(500)
      .attr('x',function(d){ return d.p.x;})
      .attr('y',function(d){ return d.p.y;});
    
    rects.enter()
      .append('rect')
        .attr('x',function(d){ return d.f.p.x;})
        .attr('y',function(d){ return d.f.p.y;})
        .attr('height',function(d) { return typeProperties(d.t, 'height'); })
        .attr('width',rWidth)
        .style('fill',function(d) {return typeProperties(d.t, 'color'); })
      .on('click',function(d){return ttree.editLeaf(d.v);})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x;})
        .attr('y',function(d){ return d.p.y;});
      // .call(fixrects);

    var labels = d3.select("#g_labels")
      .selectAll('text')
      .data(ttree.getVertices());
    
    // deals with labels that were already there previously
    labels.text(function(d){return d.l;})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x+10;})
        .attr('y',function(d){ return d.p.y+15;})
      .call(wrap, rWidth-5);
      
    // deals with new labels
    labels.enter()
      .append('text')
        .attr('x',function(d){ return d.f.p.x+10;})
        .attr('y',function(d){ return d.f.p.y+15;})
        .text(function(d){return d.l;})
        .on('click',function(d){return ttree.editLeaf(d.v);})

      // deals with new labels with new positions
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x+10;})
        .attr('y',function(d){ return d.p.y+15;})
      .call(wrap, rWidth-5);
      
  };
  
  getLeafCount = function(_){
    if(_.c.length === 0) return 1;
    else return _.c.map(getLeafCount).reduce(function(a,b){ return a+b;});
  };
  
  reposition = function(v){
    // var vw = (v.t == 'o') ? ttree.w / 2 : ttree.w / 2;
    var vw = ttree.w;
    var vh = (v.t == 'o') ? rHeight / 2 : ttree.h;
    var lC = getLeafCount(v), left=v.p.x - vw*(lC-1)/2;
    v.c.forEach(function(d){
      var w =vw*getLeafCount(d);
      left+=w;
      d.p = {x:left-(w+vw)/2, y:v.p.y+vh};
      reposition(d);
    });
  };
  
  ttree.initialize = function(label) {

    ttree.vis.l = $('#editLeaf-label').val();
    ttree.vis.t = $('#editLeaf-type').val();
            
    d3.select("#flowchart-canvas")
      .append("svg")
        .attr("width", svgW)
        .attr("height", svgH)
        .attr('id','treesvg');

    d3.select("#treesvg")
      .append('g')
        .attr('id','g_lines')
        .selectAll('line')
        .data(ttree.getEdges())
        .enter()
      .append('line')
        .attr('x1',function(d){ return d.p1.x;})
        .attr('y1',function(d){ return d.p1.y;})
        .attr('x2',function(d){ return d.p2.x;})
        .attr('y2',function(d){ return d.p2.y;});

    d3.select("#treesvg")
      .append('g')
        .attr('id','g_rects')
        .selectAll('rect')
        .data(ttree.getVertices())
        .enter()
      .append('rect')
        .attr('x',function(d){ return d.p.x;})
        .attr('y',function(d){ return d.p.y;})
        .attr('height',function(d) { return typeProperties(d.t, 'height'); })
        .attr('width',rWidth)
        .style('fill',function(d) {return typeProperties(d.t, 'color'); })
      .on('click',function(d){return ttree.editLeaf(d.v);});
      
    d3.select("#treesvg")
      .append('g')
        .attr('id','g_labels')
        .selectAll('text')
        // .data(tree.getVertices())
        // .enter()
        // .call(wrap, rWidth-10);
        .data(ttree.getVertices())
        .enter()
      .append('text')
        .attr('x',function(d){ return d.p.x+10;})
        .attr('y',function(d){ return d.p.y+15;})
        .text(function(d){return d.l;})
      // .call(wrap, rWidth)
      .on('click',function(d){return ttree.editLeaf(d.v);});
      // .call(wrap, rWidth);
  };

  // initialize();

  return ttree;
}

// var tree = tree();

function typeProperties(t, prop) {
  if (prop == 'color') {
    // if (t == 's') { return '#ff9999';  } // red
    if (t == 'o') { return '#ffff99'; } // yellow
    else { return '#99ff99'; } // green
  } else if (prop == 'height') {
    // return rHeight;
    if (t == 'o') { return rHeight / 2; }
    else { return rHeight; }
  }
}

function wrap(text, width) {
  setTimeout(function () {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().substring(0,140).split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          x = text.attr('x'),
          dy = 0.0,
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }, 500);

  // function fixrects(rect) {
  //   // var rects = d3.select("#g_rects")
  //   //   .selectAll('rect')
  //   //   .data(ttree.getVertices());

  //   // rects.transition().duration(500)
  //   //   .attr('x',function(d){ return d.p.x;})
  //   //   .attr('y',function(d){ return d.p.y;});
    
  //   // rects.enter()
  //   //   .append('rect')
  //   //     .attr('x',function(d){ return d.f.p.x;})
  //   //     .attr('y',function(d){ return d.f.p.y;})
  //   //     .attr('height',function(d) { return typeProperties(d.t, 'height'); })
  //   //     .attr('width',rWidth)
  //   //     .style('fill',function(d) {return typeProperties(d.t, 'color'); })
  //   //   .on('click',function(d){return ttree.editLeaf(d.v);})
  //   //   .transition().duration(500)
  //   //     .attr('x',function(d){ return d.p.x;})
  //   //     .attr('y',function(d){ return d.p.y;})
  //   //   .call(fixrects);
  //   setTimeout(function() {
  //     rect.each(function() {
  //       var rect = d3.select(this),
  //           color = rect.style('fill');
  //     })
  //   }, 500);
  // }
}

var tree = tree();

$('#addFlowchartButton').click(function() {
  
  $('#editLeaf-v').val(-1);
  $('#editLeaf-modal').modal();

  $('#addFlowchartButton').hide();
  $('#editLeaf-answer-group').hide();
  $('#createFlowchartButton').show();
});

$('#editLeaf-save').click(function () {
  var v = $('#editLeaf-v').val();
  if (v == -1) {
    tree.initialize();
  }
  else {
    tree.addLeaf(v);
  }
  $('#editLeaf-modal').modal('hide');
});

$('#createFlowchartButton').click(function () {
  
  // initializeBooklet();
  fillInfoLabels(tree.vis);
  // downloadSVG();

});

function initializeBooklet() {

  // $('#booklet-canvas').append($('<table>'));

}

function fillInfoLabels (t) {

  // stack to track vertices
  var S = [];
  // array to check which vertices are discovered
  var discovered = [];
  // step_number to determine where to write in booklet
  var step_number = 0;

  // push root onto stack
  S.push([t,0]);

  // while S not empty
  while (S.length > 0) {
    // take off the next vertex
    var p = S.pop();
    console.log(p);
    var v = p[0];
    var d = p[1];
    console.log(v.l, step_number, d);
    

    // if it has not been looked at before
    if (discovered.indexOf(v.v) == -1) {
      discovered.push(v.v);
      // if (v.t == 'q') {
      if (v.c.length > 0) {
        addTextToStep(v.l, step_number, d);
        var children = v.c;
        children.reverse();
        var options = [];
        // add children's labels as options
        for (var i=0; i<children.length; i++) {
          options.push(children[i].l);
          discovered.push(children[i].v);
          // push children's children onto stack
          var childrens_children = children[i].c;
          childrens_children.reverse();
          for (var j=0; j<childrens_children.length; j++) {
            S.push([childrens_children[j], d+1]);
            S.push([v, d]);
          }
        }
        // remove the extra odd v
        S.pop();
        // add these options as text
        options.reverse();
        addOptionsToStep(options, step_number, d);
      }
      // else it is of type stop/instruction
      else {
        addTextToStep(v.l, step_number, d-1);
        addStopToStep(step_number);
      }
    }
    // if it has been looked at before
    // just need to add information
    else {
      if (v.c.length > 0) {
        var c = v.c;
        var o = [];
        for (var k=0; k<c.length; k++) {
          o.push(c[k].l);
        }
        o.reverse();
        if (o.length > 0) {

        }
        addTextToStep(v.l, step_number, d);
        addOptionsToStep(o, step_number);
      } else {
        addTextToStep(v.l, step_number, d - 1);
      }
    }
    step_number++;
  }
}

function addTextToStep (text, step_number, depth) {
  console.log('addTextToStep', text, step_number, depth);
  if (step_number % 4 === 0) {
    $('#booklet-canvas')
      .append('<table class="booklet-page" id="table-'+Math.floor((step_number/4)).toString()+'">');
  }
  if (step_number % 2 === 0) {
    $('#table-'+Math.floor(step_number/4))
      .append('<tr class="booklet-page" id="row-'+Math.floor((step_number/2)).toString()+'">');
  }
  $('#row-'+Math.floor(step_number/2)).append('<td class="booklet-page" id="col-'+step_number+'">');
  // $('#col-'+step_number).append(step_number.toString() + '.<br>');
  $('#col-'+step_number).append(
    $('<table style="width:200px; height:'+getHeight('t',depth)+'">').append(
      $('<div>').append(text)
    )
  );
}

function getHeight(type, depth) {
  if (type == 't') {
    return (300 - 40 * (parseInt(depth) + 1)).toString() + 'px';
  }
  else if (type == 'o') {
    return (40 * (parseInt(depth) +1)).toString() + 'px';
  }
}

function addOptionsToStep (options, step_number, depth) {
  console.log('addOptionsToStep', options, step_number);
  // $('#col-'+step_number).append('<br>'+options.toString());
  $('#col-'+step_number).append(
    $('<div>').append(
      $('<table class="options-table">').append(
        // $('<tr style="height:'+getHeight('o', depth)+'">')
        $('<tr>')
      )
    )
  );
  for (var i=0; i<options.length; i++) {
    var l = $('#col-'+step_number+' table tr').append($('<td>').append(options[i]));
  }
  
}

function addStopToStep (step_number) {
  console.log('addStopToStep', step_number);
  $('#col-'+step_number+' table div').append('<br>STOP');
}

function downloadSVG() {
  // TODO: figure out a better way to download SVG
  console.log(d3.select('#flowchart-canvas').html());
}


