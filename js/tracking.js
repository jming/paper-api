
/* static HTML */

var taskSelect = '<select class="form-control form-inline task-select">' +
  '<option value="sum">sum</option>' +
  '<option value="regularity">regularity</option>' +
  '<option value="occurrence">occurrence</option>' +
  '<option value="progress">progress</option>' +
  '<option value="other">other</option>' +
  '</select>';

var timeSelect = '<select class="form-control form-inline select-time">' +
  '<option value="second">second(s)</option>' +
  '<option value="minute">minute(s)</option>' +
  '<option value="hour">hour(s)</option>' +
  '<option value="day">day(s)</option>' +
  '<option value="week">week(s)</option>' +
  '<option value="month">month(s)</option>' +
  '<option value="year">year(s)</option>' +
  '</select>';

var frequencySelect = '<span class="frequency-select">' + timeSelect + '</span>';
var durationSelect = '<span class="duration-select">' + timeSelect + '</span>';

var taskInput = '<input type="text" class="form-control form-inline task-input" style="width:240px;" placeholder="task"/>';
var frequencyInput = '<input type="text" class="form-control form-inline frequency-input" placeholder="number" />';
var durationInput = '<input type="text" class="form-control form-inline duration-input" placeholder="number" />';

function trackingTaskHTML(i) {
  return 'I want to track the ' + taskSelect + ' of ' + taskInput +
  '<table class="tracking-info-table">' +
  '<tr><td> per </td><td>' + frequencyInput + frequencySelect + '</td></tr>'+
  '<tr><td> over </td><td>' + durationInput + durationSelect + '</td>'+
  '<td><button class="btn" onClick="addFollowup('+i+'); $(this).hide();">Continue</button></td></tr>' +
  '</table>';
}
  

function followupQuestions(i, task_select, frequency_text, duration_text) {
  
  $('#task-'+i+' .followup-info').html('');

  var text = '';
  if (task_select == 'progress' || task_select == 'sum') {
    text = '<tr><td>I want the sum</td><td>' + sumOptions(frequency_text, duration_text) + '</td></tr>' +
      '<tr class="input-info-row"><td >Each of my inputs is</td><td>' + inputIntervals(i, task_select) + '</td></tr>';
  }
  else {
    text = '<tr class="input-info-row"><td>Each of my inputs is</td><td>' + inputIntervals(task_select) + '</td></tr>';
  }
  $('#task-'+i+' .followup-info').append('<table class="tracking-info-table">' + text + '</table>');

  // $('#task-'+i+' .input-select').prop("selectedIndex", -1);
}

function sumOptions(frequency_text, duration_text) {
  return '<div class="checkbox"><label><input type="checkbox" value="per"> per '+frequency_text +'</label></div>' +
  '<div class="checkbox"><label><input type="checkbox" value="over"> over '+duration_text+'</label></div>';
}

function inputIntervals(i, task_input) {
  var options = '<option disabled selected></option>';
  if (task_input == 'sum' || task_input == 'progress') {
    options += '<option value="single">a single value</option>';
  }
  else {
    options += '<option value="yn">a yes or no</option>';
  }
  options += '<option value="range">a number between a range</option>' +
    // '<option value="set">from a set of values</option>' +
    '<option value="other">other</option>';
  return '<select class="form-control form-inline input-select" onChange="addInput('+i+')">' + options + '</select>';
}

function addFollowup(i) {

  var task_select = $('#task-'+i+' .task-select').val();
  var task_input = $('#task-'+i+' .task-input').val();

  var frequency_input = $('#task-'+i+' .frequency-input').val();
  var frequency_select = $('#task-'+i+' .frequency-select select').val();

  var duration_input = $('#task-'+i+' .duration-input').val();
  var duration_select = $('#task-'+i+' .duration-select select').val();

  followupQuestions(i, task_select, frequency_input+' '+frequency_select, duration_input+' '+duration_select);
}

function addInput(i) {
  $('#task-'+i+' .input-info').html('');
  var inputOptions = $('#task-'+i+' .input-select').val();
  var text = '';
  if (inputOptions == 'single') {
    text = '<input class="form-inline form-control input-text" />';
  } else if (inputOptions == 'range') {
    text = '<input class="form-inline form-control input-text-low" placeholder="from" />' +
      '<input class="form-inline form-control input-text-high" placeholder="to" />';
  }
  $('#task-'+i+' .input-info-row').append('<td class="input-info">'+text+'</td>');
  $('#task-'+i+' .followup-info').append('<button class="btn" onclick="createTool('+i+'); $(this).hide(); ">Create tools</button>');
}

function createTool(i) {

}

/* Event handlers */

$('#addTrackingTaskButton').click(function() {
  $('#createToolButton').show();

  var num_tasks = $('#trackingFields .task-div').length;

  $('#trackingFields')
    .append($('<div id="task-'+num_tasks+'" class="task-div">')
      .append($('<div class="task-info">')
        .append(trackingTaskHTML(num_tasks))
      )
      .append($('<div class="followup-info">'))
    )
    .append('<hr>');

});




