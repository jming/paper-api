var svgW=1000,
    svgH =1000,
    rHeight=80,
    rWidth=120;

function tree() {

  var tree = {x:svgW/2-rWidth/2, y:20, w:rWidth+10, h:rHeight+10};

  tree.vis={
    v:0,
    l:'START',
    p: {x:tree.x, y:tree.y},
    c:[],
    t:'q'
  };
  tree.size=1;
  
  tree.getVertices =  function(){
    var v =[];
    function getVertices(t,f){
      v.push({v:t.v, l:t.l, p:t.p, f:f, t:t.t});
      t.c.forEach(function(d){ return getVertices(d,{v:t.v, p:t.p}); });
    }
    getVertices(tree.vis,{});
    return v.sort(function(a,b){ return a.v - b.v;});
  };
  
  tree.getEdges =  function(){
    var e =[];
    function getEdges(_){
      _.c.forEach(function(d){ e.push({v1:_.v, l1:_.l, p1:_.p, v2:d.v, l2:d.l, p2:d.p});});
      _.c.forEach(getEdges);
    }
    getEdges(tree.vis);
    return e.sort(function(a,b){ return a.v2 - b.v2;});
  };
  
  tree.addLeaf = function(_){
    function addLeaf(t){
      if(t.v==_){ t.c.push({
        v:tree.size++,
        l:$('#editLeaf-label').val(),
        p:{},
        c:[],
        t:$('#editLeaf-type').val()
      }); return; }
      t.c.forEach(addLeaf);
    }
    addLeaf(tree.vis);
    reposition(tree.vis);
    redraw();
  };

  tree.editLeaf = function(_) {
    function editLeaf(t){
      if(t.v==_) {
        $('#editLeaf-label').val('');
        $('#editLeaf-type').val('q');
        $('#editLeaf-v').val(t.v);
        $('#editLeaf-modal').modal();
      }
      t.c.forEach(editLeaf);
    }
    editLeaf(tree.vis);
  };
  
  redraw = function(){

    var edges = d3.select("#g_lines")
      .selectAll('line')
      .data(tree.getEdges());
    
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
      .data(tree.getVertices());

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
      .on('click',function(d){return tree.editLeaf(d.v);})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x;})
        .attr('y',function(d){ return d.p.y;});

    var labels = d3.select("#g_labels")
      .selectAll('text')
      .data(tree.getVertices());
    
    // deals with labels that were already there previously
    labels.text(function(d){return d.l;})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x+5;})
        .attr('y',function(d){ return d.p.y+10;})
        // .call(test);
      .call(wrap, rWidth-5);
      
    // deals with new labels
    labels.enter()
      .append('text')
        .attr('x',function(d){ return d.f.p.x+5;})
        .attr('y',function(d){ return d.f.p.y+10;})
        .text(function(d){return d.l;})
        // .call(test)
        // .call(wrap, rWidth-5)
        .on('click',function(d){return tree.editLeaf(d.v);})

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
    var lC = getLeafCount(v), left=v.p.x - tree.w*(lC-1)/2;
    v.c.forEach(function(d){
      var w =tree.w*getLeafCount(d);
      left+=w;
      d.p = {x:left-(w+tree.w)/2, y:v.p.y+tree.h};
      reposition(d);
    });
  };
  
  initialize = function() {
            
    d3.select("#flowchart-canvas")
      .append("svg")
        .attr("width", svgW)
        .attr("height", svgH)
        .attr('id','treesvg');

    d3.select("#treesvg")
      .append('g')
        .attr('id','g_lines')
        .selectAll('line')
        .data(tree.getEdges())
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
        .data(tree.getVertices())
        .enter()
      .append('rect')
        .attr('x',function(d){ return d.p.x;})
        .attr('y',function(d){ return d.p.y;})
        .attr('height',function(d) { return typeProperties(d.t, 'height'); })
        .attr('width',rWidth)
        .style('fill',function(d) {return typeProperties(d.t, 'color'); })
      .on('click',function(d){return tree.editLeaf(d.v);});
      
    d3.select("#treesvg")
      .append('g')
        .attr('id','g_labels')
        .selectAll('text')
        // .data(tree.getVertices())
        // .enter()
        // .call(wrap, rWidth-10);
        .data(tree.getVertices())
        .enter()
      .append('text')
        .attr('x',function(d){ return d.p.x+5;})
        .attr('y',function(d){ return d.p.y+10;})
        .text(function(d){return d.l;})
      // .call(wrap, rWidth)
      .on('click',function(d){return tree.editLeaf(d.v);});
      // .call(wrap, rWidth);
  };

  initialize();

  return tree;
}

var tree = tree();

function typeProperties(t, prop) {
  if (prop == 'color') {
    if (t == 's') { return '#ff9999';  } // green
    else if (t == 'o') { return '#ffff99'; } // yellow
    else { return '#99ff99'; } // red
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

function test (derp) {
  console.log(derp);
}


$('#editLeaf-save').click(function () {
  var v = $('#editLeaf-v').val();
  tree.addLeaf(v);
  $('#editLeaf-modal').modal('hide');
});
