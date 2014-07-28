var svgW=1000,
    svgH =1000,
    rHeight=80,
    rWidth=120;

function tree() {

  var ttree = {x:svgW/2-rWidth/2, y:20, w:rWidth+10, h:rHeight+10};

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
      if(t.v==_){ t.c.push({
        v:ttree.size++,
        l:$('#editLeaf-label').val(),
        p:{},
        c:[],
        t:$('#editLeaf-type').val()
      }); return; }
      t.c.forEach(addLeaf);
    }
    addLeaf(ttree.vis);
    reposition(ttree.vis);
    redraw();
  };

  ttree.editLeaf = function(_) {
    function editLeaf(t){
      if(t.v==_) {
        $('#editLeaf-label').val('');
        $('#editLeaf-type').val('q');
        $('#editLeaf-v').val(t.v);
        $('#editLeaf-modal').modal();
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

    var labels = d3.select("#g_labels")
      .selectAll('text')
      .data(ttree.getVertices());
    
    // deals with labels that were already there previously
    labels.text(function(d){return d.l;})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x+5;})
        .attr('y',function(d){ return d.p.y+10;})
      .call(wrap, rWidth-5);
      
    // deals with new labels
    labels.enter()
      .append('text')
        .attr('x',function(d){ return d.f.p.x+5;})
        .attr('y',function(d){ return d.f.p.y+10;})
        .text(function(d){return d.l;})
        .on('click',function(d){return ttree.editLeaf(d.v);})

      // deals with new labels with new positions
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x+5;})
        .attr('y',function(d){ return d.p.y+10;})
      .call(wrap, rWidth-5);
      
  };
  
  getLeafCount = function(_){
    if(_.c.length === 0) return 1;
    else return _.c.map(getLeafCount).reduce(function(a,b){ return a+b;});
  };
  
  reposition = function(v){
    var lC = getLeafCount(v), left=v.p.x - ttree.w*(lC-1)/2;
    v.c.forEach(function(d){
      var w =ttree.w*getLeafCount(d);
      left+=w;
      d.p = {x:left-(w+ttree.w)/2, y:v.p.y+ttree.h};
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
        .attr('x',function(d){ return d.p.x+5;})
        .attr('y',function(d){ return d.p.y+10;})
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
    if (t == 's') { return '#ff9999';  } // red
    else if (t == 'o') { return '#ffff99'; } // yellow
    else { return '#99ff99'; } // green
  } else if (prop == 'height') {
    return rHeight;
    // if (t == 'q') { return rHeight; }
    // else { return rHeight / 2; }
  }
}

function wrap(text, width) {
  setTimeout(function () {
    text.each(function() {
      var text = d3.select(this),
        words = text.text().substring(0,240).split(/\s+/).reverse(),
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
}

var tree = tree();

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

$('#addFlowchartButton').click(function() {
  
  $('#editLeaf-v').val(-1);
  $('#editLeaf-modal').modal();

  $('#addFlowchartButton').hide();
  $('#createFlowchartButton').show();
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
  S.push(t);

  // while S not empty
  while (S.length > 0) {
    // take off the next vertex
    var v = S.pop();
    addTextToStep(v.l, step_number);

    // if it has not been looked at before
    if (discovered.indexOf(v.v) == -1) {
      discovered.push(v.v);
      if (v.t == 'q') {
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
            S.push(childrens_children[j]);
            S.push(v);
          }
        }
        // remove the extra odd v
        S.pop();
        // add these options as text
        options.reverse();
        addOptionsToStep(options, step_number);
      }
      // else it is of type stop/instruction
      else {
        addStopToStep(step_number);
      }
    }
    // if it has been looked at before
    // just need to add information
    else {
      var c = v.c;
      var o = [];
      for (var k=0; k<c.length; k++) {
        o.push(c[k].l);
      }
      o.reverse();
      addOptionsToStep(o, step_number);
    }
    step_number++;
  }
}

function addTextToStep (text, step_number) {
  console.log('addTextToStep', text, step_number);
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
  $('#col-'+step_number).append(text);
}

function addOptionsToStep (options, step_number) {
  console.log('addOptionsToStep', options, step_number);
  // $('#col-'+step_number).append('<br>'+options.toString());
  $('#col-'+step_number).append(
    $('<table class="options-table">').append(
      $('<tr>')
    )
  );
  for (var i=0; i<options.length; i++) {
    var l = $('#col-'+step_number+' table tr').append($('<td>').append(options[i]));
  }
  
}

function addStopToStep (step_number) {
  console.log('addStopToStep', step_number);
  $('#col-'+step_number).append('<br>STOP');
}

function downloadSVG() {
  // TODO: figure out a better way to download SVG
  console.log(d3.select('#flowchart-canvas').html());
}


