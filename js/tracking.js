
$('#taskFields').append($('<div id="task-0">').append(trackingHTML));
$('#taskOutput').append($('<div id="task-0-output">').append(outputHTML));

function continueButton(step,n) {
  $('#task-'+n+' .continuebutton-div').html('');
  $('#task-'+n+' .continuebutton-div').append('<button class="btn continue-'+step+'" onclick="continueFrom('+step+','+n+')">Continue</button>');
}

function showDiv(n,div,what) {
  $('#task-'+n+' '+div).show();
  $('#task-'+n+' '+div+' .what-span').append(what);
}

function showDiv2(div,what) {
  showDiv(0,div,what);
}

function continueFrom(step, n) {
  $('#task-'+n+' .continuebutton-div').html('');
  var task = {
    what : $('#task-'+n+' .what-input').val(),
    valuetype : $('#task-'+n+' .valuetype-select').val()
  };
  updateTable(step, task, n);
  showNextStep(step, task, n);
}

function updateTable(step, task, n) {

}

function showNextStep(step, task, n) {

  if (step == STEP.DEFININGWHAT) {
    showDiv(n, '.valuetype-div', task.what);
    continueButton(STEP.VALUETYPE,n);
  }
  else if (step == STEP.VALUETYPE) {
    if (task.valuetype == 'yn' || task.valuetype == 'other') {
      showDiv(n,'.timespace-div',task.what);
      continueButton(STEP.TIMESPACE,n);
    }
    else if (task.valuetype == 'single') {
      showDiv(n, '.valuesingle-div', task.what);
      continueButton(STEP.VALUESINGLE,n);
    }
    else if (task.valuetype == 'set') {
      showDiv(n, '.valueset-div', task.what);
      continueButton(STEP.VALUESET,n);
    }
  }
  else if (step == STEP.VALUESINGLE || step == STEP.VALUESET) {
    showDiv(n,'.timespace-div',task.what);
    continueButton(STEP.TIMESPACE,n);
  }
  else if (step == STEP.TIMESPACE) {
    showDiv(n, '.frequency-div', task.what);
    continueButton(STEP.FREQUENCY,n);
  }
  else if (step == STEP.FREQUENCY) {
    showDiv(n, '.duration-div', task.what);
    // continueButton()
  }
}