
$('#taskFields').append($('<div id="task-0">').append(trackingHTML));
$('#taskOutput').append($('<div id="task-0-output">').append(outputHTML));

function continueButton(step,n) {
  $('#task-'+n+' .continuebutton-div').html('');
  $('#task-'+n+' .continuebutton-div').append('<button class="btn continue-'+step+'" onclick="continueFrom('+step+','+n+')">Continue</button>');
}

function capitalize(word) {
  return word.charAt(0).toUpperCase()+word.slice(1);
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
    valuetype : $('#task-'+n+' .valuetype-select').val(),
    valuesingle : $('#task-'+n+' .valuesingle-input').val(),
    valueset : $('#task-'+n+' .valueset-input').val().split(',')
  };
  createTable(step, task, n);
  showNextStep(step, task, n);
}

function createTable(step, task, n) {

  $('.options-collapse').collapse();
  var opt_n = $('.options-collapse').size()+1;

  if (step == STEP.DEFININGWHAT) {
    $('#accordion').append(basicTableHTML(step, opt_n));
    $('#option1 .r1 .c1').append(capitalize(task.what));
  }

  else if (step == STEP.VALUETYPE) {
    if (task.valuetype == 'yn') {
      $('#accordion').append(basicTableHTML(step+'a', opt_n));
      $('#option2a .r1 .c1').append(task.what);
      for (var i=2; i<=6; i++) {
        $('#option2a .r'+i+' .c1').append('YES / NO');
      }

      $('#accordion').append(basicTableHTML(step+'b', opt_n+1));
      $('#option2b .r1 .c1').append(capitalize(task.what));
      $('#option2b').append('with shading instructions');

      $('#accordion').append(basicTableHTML(step+'c', opt_n+2));
      $('#option2c .r1 .c1').append(capitalize(task.what));
      $('#option2c').append('with sticker sheet');
    }
  }

  else if (step == STEP.VALUESINGLE) {
    $('#accordion').append(basicTableHTML(step+'a', opt_n));
    $('#option3a .r1 .c1').append(capitalize(task.what));

    $('#accordion').append(basicTableHTML(step+'b', opt_n+1));
    $('#option3b .r1 .c1').append('Sum of' + capitalize(task.what));

    $('#accordion').append(basicTableHTML(step+'c', opt_n+2));
    $('#option3c .c2').show();
    $('#option3c .r1 .c1').append(capitalize(task.what));
    $('#option3c .r1 .c2').append('Sum of ' + capitalize(task.what));

    for (var j=2; j<=6; j++) {
      console.log(task.valuesingle, task.valuesingle*(j-1));
      $('#option3a .r'+j+' .c1').append(task.valuesingle);
      $('#option3b .r'+j+' .c1').append(task.valuesingle*(j-1));
      $('#option3c .r'+j+' .c1').append(task.valuesingle);
      $('#option3c .r'+j+' .c2').append(task.valuesingle*(j-1));
    }
  }

  else if (step == STEP.VALUESET) {

    var num_opt = task.valueset.length;
    console.log(task);
    $('#accordion').append(basicTableHTML(step+'a', opt_n));
    for (var no=1; no<=num_opt; no++) {
      $('#option4a .c'+no).show();
      $('#option4a .r1 .c'+no).append(task.valueset[no-1]);
    }

    $('#accordion').append(basicTableHTML(step+'b', opt_n+1));
    $('#option4b .r1 .c1').append(capitalize(task.what));
    $('#option4b').append('with shading instructions');

    $('#accordion').append(basicTableHTML(step+'c', opt_n+2));
    $('#option4c .r1 .c1').append(capitalize(task.what));
    $('#option4c').append('with sticker sheet');

  }

  else if (step == STEP.TIMESPACE) {
    
  }

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