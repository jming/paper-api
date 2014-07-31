
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
  

function followupQuestions(task) {
  
  $('#task-'+task.i+' .followup-info').html('');

  var text = '';
  if (task.tasks == 'progress' || task.tasks == 'sum') {
    text = '<tr><td>I want the sum</td><td>' + sumOptions(task) + '</td></tr>' +
      '<tr class="input-info-row"><td >Each of my inputs is</td><td>' + inputIntervals(task) + '</td></tr>';
  }
  else {
    text = '<tr class="input-info-row"><td>Each of my inputs is</td><td>' + inputIntervals(task) + '</td></tr>';
  }
  $('#task-'+task.i+' .followup-info').append('<table class="tracking-info-table">' + text + '</table>');

  // $('#task-'+i+' .input-select').prop("selectedIndex", -1);
}

function sumOptions(task) {
  return '<div class="checkbox"><label><input type="checkbox" value="per" class="sum-check-per"> per '+task.freqi+' '+task.freqs+'</label></div>' +
  '<div class="checkbox"><label><input type="checkbox" value="over" class="sum-check-over"> over '+task.durai+' '+task.duras+'</label></div>';
}

function inputIntervals(task) {
  var options = '<option disabled selected></option>';
  if (task.tasks == 'sum' || task.tasks == 'progress') {
    options += '<option value="single">a single value</option>';
  }
  else {
    options += '<option value="yn">a yes or no</option>';
  }
  options += '<option value="range">a number between a range</option>' +
    // '<option value="set">from a set of values</option>' +
    '<option value="other">other</option>';
  return '<select class="form-control form-inline input-select" onChange="addInput('+task.i+')">' + options + '</select>';
}

function addFollowup(i) {

  var task = {
    i : i,
    tasks : $('#task-'+i+' .task-select').val(),
    taski : $('#task-'+i+' .task-input').val(),
    freqs : $('#task-'+i+' .frequency-select select').val(),
    freqi : $('#task-'+i+' .frequency-input').val(),
    duras : $('#task-'+i+' .duration-select select').val(),
    durai : $('#task-'+i+' .duration-input').val()
  };

  followupQuestions(task);
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
  var task = {
    i : i,
    tasks : $('#task-'+i+' .task-select').val(),
    taski : $('#task-'+i+' .task-input').val(),
    freqs : $('#task-'+i+' .frequency-select select').val(),
    freqi : $('#task-'+i+' .frequency-input').val(),
    duras : $('#task-'+i+' .duration-select select').val(),
    durai : $('#task-'+i+' .duration-input').val(),
    sum : [],
    inpts : $('#task-'+i+' .input-select').val(),
  };
  if (!(task.inpts=='other' || task.inpts=='yn' )) {
    task.inpti = (task.inpts == 'single') ? $('#task-'+i+' .input-text').val() : [$('#task-'+i+' .input-text-low').val(),$('#task-'+i+' .input-text-high').val()];
  }
  $('#task-'+i+' .checkbox :checked').each(function() { task.sum.push($(this).val()); });
  
  console.log(task);

  createBasicTable(task);
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

function createBasicTable(task) {

  // var intervals = getInterval(task);
  var intervals = 10;

  $('#toolsOutput')
    .append($('<div id="task-'+task.i+'-tool">')
      .append($('<table class="table tool-table">')
        .append($('<tr>')
          .append($('<th>')
            .append('Date')
          )
          .append($('<th>')
            .append(task.taski)
          )
        )
      )
    );

  for (var i=0; i<intervals; i++) {
    $('#task-'+task.i+'-tool .tool-table').append($('<tr>').append('<td>').append('<td>'));
  }
}

function getInterval(task) {
  
}


