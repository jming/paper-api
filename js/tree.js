function tree(){

  var svgW=958, svgH =460, vRad=12, tree={cx:300, cy:30, w:40, h:70};
  tree.vis={v:0, l:'?', p:{x:tree.cx, y:tree.cy},c:[]}; 
  tree.size=1;
  tree.glabels =[];
  
  tree.getVertices =  function(){
    var v =[];
    function getVertices(t,f){  
      v.push({v:t.v, l:t.l, p:t.p, f:f}); 
      t.c.forEach(function(d){ return getVertices(d,{v:t.v, p:t.p}); });
    }
    getVertices(tree.vis,{});
    return v.sort(function(a,b){ return a.v - b.v;});
  }
  
  tree.getEdges =  function(){
    var e =[];
    function getEdges(_){
      _.c.forEach(function(d){ e.push({v1:_.v, l1:_.l, p1:_.p, v2:d.v, l2:d.l, p2:d.p});});
      _.c.forEach(getEdges);
    }
    getEdges(tree.vis);
    return e.sort(function(a,b){ return a.v2 - b.v2;}); 
  }
  
  tree.addLeaf = function(_){
    function addLeaf(t){
      if(t.v==_){ t.c.push({v:tree.size++, l:'?', p:{},c:[]}); return; }
      t.c.forEach(addLeaf);
    }
    addLeaf(tree.vis);
    reposition(tree.vis);
    if(tree.glabels.length != 0){
      tree.glabels =[]
      relabel(
        {
          lbl:d3.range(0, tree.size).map(function(d){ return 'Label';}), 
        });
      d3.select("#labelnav").style('visibility','hidden');
    }
    redraw();
  }
  
  redraw = function(){
    var edges = d3.select("#g_lines").selectAll('line').data(tree.getEdges());
    
    edges.transition().duration(500)
      .attr('x1',function(d){ return d.p1.x;}).attr('y1',function(d){ return d.p1.y;})
      .attr('x2',function(d){ return d.p2.x;}).attr('y2',function(d){ return d.p2.y;})
  
    edges.enter().append('line')
      .attr('x1',function(d){ return d.p1.x;}).attr('y1',function(d){ return d.p1.y;})
      .attr('x2',function(d){ return d.p1.x;}).attr('y2',function(d){ return d.p1.y;})
      .transition().duration(500)
      .attr('x2',function(d){ return d.p2.x;}).attr('y2',function(d){ return d.p2.y;});
      
    var circles = d3.select("#g_circles").selectAll('circle').data(tree.getVertices());

    circles.transition().duration(500).attr('cx',function(d){ return d.p.x;}).attr('cy',function(d){ return d.p.y;});
    
    circles.enter().append('circle').attr('cx',function(d){ return d.f.p.x;}).attr('cy',function(d){ return d.f.p.y;}).attr('r',vRad)
      .on('click',function(d){return tree.addLeaf(d.v);})
      .transition().duration(500).attr('cx',function(d){ return d.p.x;}).attr('cy',function(d){ return d.p.y;});
  }
  
  getLeafCount = function(_){
    if(_.c.length ==0) return 1;
    else return _.c.map(getLeafCount).reduce(function(a,b){ return a+b;});
  }
  
  reposition = function(v){
    var lC = getLeafCount(v), left=v.p.x - tree.w*(lC-1)/2;
    v.c.forEach(function(d){
      var w =tree.w*getLeafCount(d); 
      left+=w; 
      d.p = {x:left-(w+tree.w)/2, y:v.p.y+tree.h};
      reposition(d);
    });   
  } 
  
  initialize = function() {
            
    d3.select("#flowchart-canvas").append("svg").attr("width", svgW).attr("height", svgH).attr('id','treesvg');

    d3.select("#treesvg").append('g').attr('id','g_lines').selectAll('line').data(tree.getEdges()).enter().append('line')
      .attr('x1',function(d){ return d.p1.x;}).attr('y1',function(d){ return d.p1.y;})
      .attr('x2',function(d){ return d.p2.x;}).attr('y2',function(d){ return d.p2.y;});

    d3.select("#treesvg").append('g').attr('id','g_circles').selectAll('circle').data(tree.getVertices()).enter()
      .append('circle').attr('cx',function(d){ return d.p.x;}).attr('cy',function(d){ return d.p.y;}).attr('r',vRad)
      .on('click',function(d){return tree.addLeaf(d.v);});
      
    d3.select("#treesvg").append('g').attr('id','g_labels').selectAll('text').data(tree.getVertices()).enter().append('text')
      .attr('x',function(d){ return d.p.x;}).attr('y',function(d){ return d.p.y+5;}).text(function(d){return d.l;})
      .on('click',function(d){return tree.addLeaf(d.v);});  
      
    d3.select("#treesvg").append('g').attr('id','g_elabels').selectAll('text').data(tree.getEdges()).enter().append('text')
      .attr('x',function(d){ return (d.p1.x+d.p2.x)/2+(d.p1.x < d.p2.x? 8: -8);}).attr('y',function(d){ return (d.p1.y+d.p2.y)/2;})
      .text(function(d){return tree.glabels.length==0? '': Math.abs(d.l1 -d.l2);}); 

    tree.addLeaf(0);
    tree.addLeaf(0);
  }
  initialize();

  return tree;
}
var tree= tree();