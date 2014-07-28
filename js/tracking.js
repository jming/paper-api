$('#addTrackingFieldButton').click(function () {
	console.log('here');
	$('#trackingFields').append(
		$('<div>').append(prefixSelect + prefixText)
	);
});

var prefixSelect = '<select class="form-control form-inline">' +
	'<option value="per">per</option>' +
	'<option value="in">in</option>' +
	'<option value="over">over</option>' +
	'</select>';

var prefixText = "<input type='text' class='form-control form-inline' />";

function createBasicTable () {
	
}