var global_c = new Object();
var graph_url = "";

function loadGraph() {

	$(this).hide();
	$('#graph-axis-div').show();

	graph_url = $('#graph-url').val();
	// console.log(graph_url);

	$('#graph-img-div')
		.append($('<img src='+graph_url+' class="graph-img-class" id="graph-img"> '));

	$('#graph-img').Jcrop({
		onSelect: loadCoords,
		onChange: loadCoords
	});

}

function loadCoords(c) {
	global_c = c;
	// console.log(c.x, c.y, c.x2, c.y2, c.w, c.h);
	// console.log(global_c.x, global_c.y, global_c.w, global_c.h);
}

function selectAxis(axis) {
	$('#graph-'+axis+'axis-div').empty();
	$('#graph-'+axis+'axis-div')
		.append($('<img src='+graph_url+' class="graph-axis-class" id="graph-'+axis+'axis-img">'));
	$('#graph-'+axis+'axis-img')[0].style.clip="rect("+global_c.y+"px, "+global_c.x2+"px, "+global_c.y2+"px, "+global_c.x+"px)";
	// h: 56 w: 424 x: 1 x2: 425 y: 315 y2: 371
}