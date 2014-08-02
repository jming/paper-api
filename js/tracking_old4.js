


function capitalize(word) {
  return word.charAt(0).toUpperCase()+word.slice(1);
}

$('#taskFields').append($('<div id="task-0">').append(definingWhatHTML));

function continueFrom(btn, step, n) {
  $(btn).hide();
  var task = {
    what : $('#task-'+n+' .what-input').val(),
    valuetype : $('#task-'+n+' .valuetype-select').val()
  };
  console.log(task);
  generateTable(step, task, n);
  addNextStep(step, task, n);
}

function generateTable(step, task, n) {
  var table = $('<table class="table output-table table-'+step+'">');
  if (step == 1) {
    table
      .append($('<tr>')
        .append($('<th>')
          .append(capitalize(task.what))
        )
      ).append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
      ;
  }

  else if (step == 2) {
    if (task.valuetype == 'yn') {
      table = 'yn tables';
    }
  }

  $('#toolsOutput').append(table);
}

function addNextStep(step, task, n) {
  if (step == 1) {
    $('#task-'+n).append(valueTypeHTML(task.what));
    $('#task-'+n).append(continueButton(2,n));
  }
  else if (step == 2) {
    if (task.valuetype == 'yn' || task.valuetype == 'other') {
      $('#task-'+n).append(timeSpaceHTML(task.what));
      $('#task-'+n).append(continueButton(10,n));
    }
    else if (task.valuetype == 'single') {
      $('#task-'+n).append(singleValueHTML(task.what));
      $('#task-'+n).append(continueButton(3,n));
    }
    else if (task.valuetype == 'set') {
      $('#task-'+n).append(setValueHTML(task.what));
      $('#task-'+n).append(continueButton(4,n));
    }
  }

}