// allowing for the input

$('#addTrackingTaskButton').click(function () {

  $('#createToolButton').show();

  var num_tasks = $('#trackingFields .task-div').length;
  $('#trackingFields').append(
    $('<div id="task-'+num_tasks+'" class="task-div">').append(
      $('<div id="task-'+num_tasks+'-info">').append( trackingTaskHTML )
      ).append(
      $('<div id="task-'+num_tasks+'-fields">')
      ).append(
      $('<button class="btn field-btn" onclick="addTrackingFieldTo('+num_tasks+')">').append(
        '<span class="glyphicon glyphicon-plus-sign">').append(' New field')
      )
    );

});

var trackingTaskHTML = '<p>I want to track the '+
  '<select class="form-control form-inline">' +
  '<option value="sum">sum</option>' +
  '<option value="regularity">regularity</option>' +
  '<option value="occurrence">occurrence</option>' +
  '<option value="progress">progress</option>' +
  '</select> of '+
  '<input type="text" class="form-control form-inline" />' +
  '</p>';

var prefixSelect = '<select class="form-control form-inline">' +
 '<option value="per">per</option>' +
 '<option value="in">in</option>' +
 '<option value="over">over</option>' +
 '</select>' +
 "<input type='text' class='form-control form-inline' />";

function addTrackingFieldTo(task_num) {
  var num_fields = $('#task-'+task_num+'-fields div').length;
  $('#task-'+task_num+'-fields').append(
    $('<div id="task-'+task_num+'-field-'+num_fields+'">').append( prefixSelect )
  );
}

// creatig the table

$('#createToolButton').click(function () {

  // get all the information
  var num_tasks = $('#trackingFields .task-div').length;
  var tasks = [];

  // create a basic table for each task
  for (var i=0; i<num_tasks; i++) {

    // get task info
    var task_type = $('#task-'+i+'-info select').val();
    var task_value = $('#task-'+i+'-info input').val();

    var num_fields = $('#task-'+i+'-fields div').length;
    var fields = [];

    for (var j=0; j<num_fields; j++) {
      var field_prefix = $('#task-'+i+'-field-'+j+' select').val();
      var field_value = $('#task-'+i+'-field-'+j+' input').val();

      fields.push([field_prefix, field_value]);
    }

    console.log(i);
    createBasicTable(task_type, task_value, fields);
  }

  // decide how things are going to be condensed

  // create the larger, more encompassing tables

});

function createBasicTable (type, value, fields) {
  // create the basic table
  console.log(type, value, fields);
}
