function tree(){

  var svgW=1000,
      svgH =460,
      rHeight=60,
      rWidth=80,
      tree = {x:svgW/2-rWidth/2, y:20, w:100, h:80};

  tree.vis={v:0, l:'START', p:{x:tree.x, y:tree.y}, c:[], t:'q'};
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
      if(t.v==_){ t.c.push({v:tree.size++, l:'option', p:{}, c:[], t:'o'}); return; }
      t.c.forEach(addLeaf);
    }
    addLeaf(tree.vis);
    reposition(tree.vis);
    redraw();
  };

  tree.editLeaf = function(_) {
    function editLeaf(t){
      if(t.v==_) {
        $('#editLeaf-label').val(t.l);
        $('#editLeaf-v').val(t.v);
        $('#editLeaf-type').val(t.t);
        $('#editLeaf-modal').modal();
      }
      t.c.forEach(editLeaf);
    }
    editLeaf(tree.vis);
  };

  tree.changeLeaf = function(_) {
    function changeLeaf(t) {
      if (t.v == _) {
        console.log(t);
        t.l = $('#editLeaf-label').val();
        t.t = $('#editLeaf-type').val();
      }
      t.c.forEach(changeLeaf);
    }
    changeLeaf(tree.vis);
    reposition(tree.vis);
    redraw();
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
        .attr('height',rHeight)
        .attr('width',rWidth)
        .style('fill',function(d) {console.log(d);  console.log('here'); return typeColor(d.t); })
      .on('click',function(d){return tree.editLeaf(d.v);})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x;})
        .attr('y',function(d){ return d.p.y;});

    var labels = d3.select("#g_labels")
      .selectAll('text')
      .data(tree.getVertices());
    
    labels.text(function(d){return d.l;})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x+10;})
        .attr('y',function(d){ return d.p.y+20;});
      
    labels.enter()
      .append('text')
        .attr('x',function(d){ return d.f.p.x+10;})
        .attr('y',function(d){ return d.f.p.y+20;})
      .text(function(d){return d.l;})
        .on('click',function(d){return tree.editLeaf(d.v);})
      .transition().duration(500)
        .attr('x',function(d){ return d.p.x+10;})
        .attr('y',function(d){ return d.p.y+20;});
      
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
        .attr('height',rHeight)
        .attr('width',rWidth)
        .style('fill',function(d) {return typeColor(d.t); })
      .on('click',function(d){return tree.editLeaf(d.v);});
      
    d3.select("#treesvg")
      .append('g')
        .attr('id','g_labels')
        .selectAll('text')
        .data(tree.getVertices())
        .enter()
      .append('text')
        .attr('x',function(d){ return d.p.x;})
        .attr('y',function(d){ return d.p.y+5;})
        .text(function(d){return d.l;})
      .on('click',function(d){return tree.editLeaf(d.v);});

    tree.addLeaf(0);
    tree.addLeaf(0);
  };

  initialize();

  return tree;
}

var tree= tree();

function typeColor(t) {
  if (t == 's') { return '#ff9999';  } // green
  else if (t == 'o') { return '#ffff99'; } // yellow
  else { return '#99ff99'; } // red
}

$('#editLeaf-save').click(function () {
  var v = $('#editLeaf-v').val();
  tree.changeLeaf(v);
  $('#editLeaf-modal').modal('hide');
});

$('#editLeaf-add').click(function() {
  var v = $('#editLeaf-v').val();
  tree.addLeaf(v);
  $('#editLeaf-modal').modal('hide');
});
