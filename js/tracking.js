
$('#addTrackingTaskButton').click(function () {
  var num_tasks = $('#trackingFields div').length;
  $('#trackingFields').append(
    $('<div id="task-'+num_tasks+'">').append(
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
  $('#task-'+task_num+'-fields').append( $('<div>').append( prefixSelect ) );
}

function createBasicTable () {
  
}