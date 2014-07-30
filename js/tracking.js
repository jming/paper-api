// allowing for the input

$('#addTrackingTaskButton').click(function () {

  $('#createToolButton').show();

  var num_tasks = $('#trackingFields .task-div').length;
  $('#trackingFields').append(
    $('<div id="task-'+num_tasks+'" class="task-div">').append(
      // $('<div class="task-info">').append( trackingTaskHTML )
      $('<div>').append(trackingTaskHTML)
      )
      // .append(
      // $('<div id="task-'+num_tasks+'-fields">')
      // )
    )
  .append('<hr>');

});

var timeSelect = '<select class="form-control form-inline select-time">' +
  '<option value="second">second(s)</option>' +
  '<option value="minute">minute(s)</option>' +
  '<option value="hour">hour(s)</option>' +
  '<option value="day">day(s)</option>' +
  '<option value="week">week(s)</option>' +
  '<option value="month">month(s)</option>' +
  '<option value="year">year(s)</option>' +
  '</select>';

var trackingTaskHTML = '<p>I want to track the '+
  '<select class="form-control form-inline select-tasktype">' +
  '<option value="sum">sum</option>' +
  '<option value="regularity">regularity</option>' +
  '<option value="occurrence">occurrence</option>' +
  '<option value="progress">progress</option>' +
  '</select> of '+
  '<input type="text" class="form-control form-inline input-taskvalue" />' +
  '</p> <p>' +
  ' per ' +
  '<input type="text" class="form-control form-inline input-frequency" />' +
  '<span class="select-frequency">' + timeSelect + '</span></p>' +
  '<p>'+
  ' over ' +
  '<input type="text" class="form-control form-inline input-duration" />' +
  '<span class="select-duration">' + timeSelect + '</span>' +
  // '<select class="form-control form-inline select-durationprefix">' +
  // '<option value="over">over</option>' +
  // '<option value="from">from</option>' +
  // '</select>'+
  '</p>';

function followupQuestions(per_value, over_value) {
  return '<p>I want the sum:' +
  '<div class="checkbox"><label><input type="checkbox" value="per"> per '+per_value+'</label></div>' +
  '<div class="checkbox"><label><input type="checkbox" value="over"> over '+over_value+'</label></div>' +
  '<div class="form-group">'+
  '<label for="input-unit">What is the unit of your input?</label>' +
  '<input type="text" class="form-control" id="input-unit">' +
  '</div>' +
  '<div class="form-group">'+
  '<label for="input-unit">What are the possible option(s) for input intervals?</label>' +
  '<input type="text" class="form-control" id="input-intervals">' +
  '</div>' +
  '</p>';
}

// $('.select-durationprefix').change(function () {
//   var duration_type = $(this).val();
//   $(this).parent().append(durationTypeText(duration_type));
// });

// function durationTypeText(type) {
//   if (type=='from') {
//     return '<'
//   }
// }

// var prefixSelect = '<select class="form-control form-inline">' +
//  '<option value="per">per</option>' +
//  '<option value="in">in</option>' +
//  '<option value="over">over</option>' +
//  '</select>' +
//  "<input type='text' class='form-control form-inline' />";

// function addTrackingFieldTo(task_num) {
//   var num_fields = $('#task-'+task_num+'-fields div').length;
//   $('#task-'+task_num+'-fields').append(
//     $('<div id="task-'+task_num+'-field-'+num_fields+'">').append( prefixSelect )
//   );
// }

// creatig the table

$('#createToolButton').click(function () {

  // get all the information
  var num_tasks = $('#trackingFields .task-div').length;
  var tasks = [];

  // create a basic table for each task
  for (var i=0; i<num_tasks; i++) {

    // get task info
    var task_type = $('#task-'+i+' .select-tasktype').val();
    var task_value = $('#task-'+i+' .input-taskvalue').val();

    var frequency_input = $('#task-'+i+' .input-frequency').val();
    var frequency_select = $('#task-'+i+' .select-frequency select').val();

    var duration_input = $('#task-'+i+' .input-duration').val();
    var duration_select = $('#task-'+i+' .select-duration select').val();

    // var num_fields = $('#task-'+i+'-fields div').length;
    // var fields = [];

    // for (var j=0; j<num_fields; j++) {
    //   var field_prefix = $('#task-'+i+'-field-'+j+' select').val();
    //   var field_value = $('#task-'+i+'-field-'+j+' input').val();

    //   fields.push([field_prefix, field_value]);
    // }

    console.log(task_type, task_value, frequency_input, frequency_select, duration_input, duration_select);
    // createBasicTable(task_type, task_value, frequency_input, frequency_select);

    // followup questions
    if (task_type == 'sum' || task_type == 'progress') {
      $('#task-'+i).append($('<div>').append(followupQuestions(frequency_select, duration_select)));
    }
  }

  // decide how things are going to be condensed

  // create the larger, more encompassing tables

});

function createBasicTable (type, value, fields) {
  // create the basic table
  console.log(type, value, fields);
}
