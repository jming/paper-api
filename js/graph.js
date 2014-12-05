var global_c = new Object();
var graph_url = "";
var factor = 0.0;
// var img_height = 0.0;

var page_width = 225;
var page_height = 375;

function loadGraph() {

	$(this).hide();
	$('#graph-axis-div').show();

	graph_url = $('#graph-url').val();
	// console.log(graph_url);

	$('#graph-img-div')
		.append($('<img src='+graph_url+' id="graph-img"> '));
		// .append($('<img src='+graph_url+' class="graph-img-class" id="graph-img"> '));

	$('#graph-img')[0].style.width = '400px';
	// img_height = parseFloat($('#graph-img')[0].style.height.slice(0,-2));
	// console.log(img_height);
	// console.log($('#graph-img')[0].style.height.slice(0,-2));

	// $('#graph-img')[0].style.width = '225x';
	// $('#graph-img')[0].style.height = '330px';

	setTimeout(function(){
	  $('#graph-img').Jcrop({
	  	onSelect : loadCoords,
	  	onChange : loadCoords
	  });
	}, 500);

}

function loadCoords(c) {
	global_c = c;
	// console.log(c.x, c.y, c.x2, c.y2, c.w, c.h);
	// console.log(global_c.x, global_c.y, global_c.w, global_c.h);
}

function selectAxis(axis) {

	// console.log(axis);

	// if (img_height == 0) {
		// img_height = parseFloat($('#graph-img')[0].style.height.slice(0,-2));
	// }

	// $('#graph-svg1-top').append('<image xlink:href='+graph_url+' height="50px" width="50px"/>');

	// $('#graph-svg1-top-div').append('<image x="20" y="20" width="300" height="80" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://i.imgur.com/XiSVdaW.png"></image>');


	var label = $('#'+axis+'axis-label').val();
	$('#'+axis+'axis-label-text').text(label);


	if (axis == 'c') {
		factor = 150 / global_c.w;
	}

	console.log(factor);
	// console.log(img_height*)
	console.log(global_c);

	$('#graph-'+axis+'axis-div').empty();
	$('#graph-'+axis+'axis-div')
		.append($('<img src='+graph_url+' class="graph-axis-class" id="graph-'+axis+'axis-img">'));
		// .append($('<img src='+graph_url+' id="graph-'+axis+'axis-img">'));
	$('#graph-'+axis+'axis-img')[0].style.width = 400*factor+"px";
	// $('#graph-'+axis+'axis-img')[0].style.height = img_height*factor+"px";
	$('#graph-'+axis+'axis-img')[0].style.clip="rect("+global_c.y*factor+"px, "+global_c.x2*factor+"px, "+global_c.y2*factor+"px, "+global_c.x*factor+"px)";
	// h: 56 w: 424 x: 1 x2: 425 y: 315 y2: 371

	var leftm = 0;
	var topm = 0;

	if (axis == 'c') {
		// leftm = page_width+(page_width-30-global_c.w*factor)/2;
		leftm = 275-global_c.x*factor;
		topm = (page_height-global_c.h*factor)/2-global_c.y*factor;
		// $('#graph-'+axis+'axis-img')[0].style.margin-left = page_width+page_width-30+'px';
		
		// top right bottom left
	}
	if (axis == 'y') {
		leftm = page_width + 15 - global_c.x*factor;
		topm = (page_height-global_c.h*factor)/2-global_c.y*factor;

	}
	else if (axis == 'x') {
		topm = page_height + 70 - global_c.y*factor;
		// topm = 245-global_c.y*factor;
		// leftm = (page_width*2-global_c.w*factor)/2-global_c.w*factor/2;
		leftm = page_width - (global_c.w*factor/2) - global_c.x*factor;
	}
	console.log(leftm, topm); 
	console.log(topm + "px 0px 0px" + leftm + "px");
	$('#graph-'+axis+'axis-img')[0].style.margin = topm + "px 0px 0px " + leftm + "px";
}