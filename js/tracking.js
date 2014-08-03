
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
  var dur3it = new Date($('#task-'+n+' .duration3-input').val());
  var dur6it = new Date($('#task-'+n+' .duration6-input').val());
  var task = {
    what : $('#task-'+n+' .what-input').val(),
    valuetype : $('#task-'+n+' .valuetype-select').val(),
    valuesingle : $('#task-'+n+' .valuesingle-input').val(),
    valueset : $('#task-'+n+' .valueset-input').val().split(','),
    timespace : $('#task-'+n+' .timespace-select').val(),
    freqi : $('#task-'+n+' .frequency-input').val(),
    freqs : $('#task-'+n+' .frequency-select').val(),
    dur1s : $('#task-'+n+' .duration1-select').val(),
    dur2s : $('#task-'+n+' .duration2-select').val(),
    dur2i : $('#task-'+n+' .duration2-input').val(),
    dur3i : dur3it,
    dur4s : $('#task-'+n+' .duration4-select').val(),
    dur5i : $('#task-'+n+' .duration5-input').val(),
    dur5s : $('#task-'+n+' .duration5-select').val(),
    dur6i : dur6it
  };
  console.log(task);
  createTable(step, task, n);
  showNextStep(step, task, n);
}

function createTable(step, task, n) {

  console.log(step, task, n);

  $('.options-collapse').collapse('hide');
  var opt_n = $('.options-collapse').size()+1;

  if (step == STEP.DEFININGWHAT) {
    $('#accordion').append(basicTableHTML(step, opt_n));
    $('#option1 .r1 .c1').append(capitalize(task.what));
    $('#option1 .instructions').append('Basic table for tracking over time.');
  }

  else if (step == STEP.VALUETYPE) {
    if (task.valuetype == 'yn') {
      $('#accordion').append(basicTableHTML(step+'a', opt_n));
      $('#option2a .instructions').append('Circle YES or NO each time the event occurs or does not occur.');
      $('#option2a .r1 .c1').append(capitalize(task.what));
      for (var i=2; i<=6; i++) {
        $('#option2a .r'+i+' .c1').append('YES / NO');
      }

      // $('#accordion').append(basicTableHTML(step+'b', opt_n+1));
      $('#option1 .instructions').append('<br> <b>Alternative instruction:</b> Shade in the row when the event occurs.');
      // $('#option2b .r1 .c1').append(capitalize(task.what));
      // $('#option2b').append('with shading instructions');

      // $('#accordion').append(basicTableHTML(step+'c', opt_n+2));
      $('#option1 .instructions').append('<br> <b>Alternative instruction:</b> Place a sticker in the rows where the event occurs.');
      // $('#option2c .r1 .c1').append(capitalize(task.what));
      // $('#option2c').append('with sticker sheet');

      $('#accordion').append(basicTableHTML(step+'b', opt_n+1));
      $('#option2b .r1 .c1').append('YES');
      $('#option2b .r1 .c2').append('NO');
      $('#option2b .c2').show();
      $('#option2b .instructions').append('Make a tally mark in the YES column when the event occurs and in the NO column when the event does not occur.');
      $('#option1').collapse('show');
    }
  }

  else if (step == STEP.VALUESINGLE) {

    $('#option1').append('<br><b>Alternative instruction:</b> Take stickers with values of the single value or the cumulative and paste it in the row each time the event occurs.');

    $('#accordion').append(basicTableHTML(step+'a', opt_n));
    $('#option3a .instructions').append('Cross off the value in the row each time the event occurs.');
    $('#option3a .r1 .c1').append(capitalize(task.what));

    $('#accordion').append(basicTableHTML(step+'b', opt_n+1));
    $('#option3b .instructions').append('Cross off the value in the row each time the event occurs to get the cumulative sum.');
    $('#option3b .instructions').append('<br><b>Alternative instruction:</b> Rip the paper each time the event occurs so that only the next value remains on the top.');
    $('#option3b .r1 .c1').append('Sum of ' + capitalize(task.what));

    $('#accordion').append(basicTableHTML(step+'c', opt_n+2));
    $('#option3c .instructions').append('Cross off the rows each time the event occurs to get each event as well as the cumulative sum.');
    $('#option3c .c2').show();
    $('#option3c .r1 .c1').append(capitalize(task.what));
    $('#option3c .r1 .c2').append('Sum of ' + capitalize(task.what));

    for (var j=2; j<=6; j++) {
      // console.log(task.valuesingle, task.valuesingle*(j-1));
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

    var ts_text = (task.timespace == 'time') ? 'Date' : 'Location';

    $('#accordion').append(basicTableHTML(step+'a',opt_n));
    $('#option10a .c2').show();
    $('#option10a .r1 .c1').append(ts_text);
    $('#option10a .r1 .c2').append(capitalize(task.what));
    
    if (task.valuetype == 'yn') {

      $('#option1 .instructions').append('<br><b>Alternative instructions:</b> Fill in the days in which the event occurs.');
      $('#option2b .instructions').append('<br><b>Alternative instructions:</b> Write down the times for which the event occurs in the YES column and the times when the even does not occur in the NO column.');
      $('#option2b').collapse('show');
      $('#option1').collapse('show');

      $('#option10a .instructions').append('For each time, write down whether the event occurred or not.');
      $('#option10a .instructions').append('<br><b>Alternative instruction:</b> Shade in the times the event occurs.');
      $('#option10a .instructions').append('<br><b>Alternative instruction:</b> Place a sticker on the times when the event occurs.');

      $('#accordion').append(basicTableHTML(step+'b',opt_n+1));
      $('#option10b .c2').show();
      $('#option10b .r1 .c1').append(ts_text);
      $('#option10b .r1 .c2').append(capitalize(task.what));

      $('#option10b .instructions').append('Write in the times you are tracking the event and circle YES or NO depending on whether the event occurs.');

      for (var i=2; i<=6; i++) {
        $('#option10b .r'+i+' .c2').append('YES / NO');
      }
    }
    else if (task.valuetype == 'single') {

      $('#option10a .instructions').append('Fill in the single value or the cumulative based on the given table of values.');
      $('#option10a .instructions').append('<br><b>Alternative instruction:</b> For each time interval, place the a sticker with either the single value or the cumulative sum if the event occurs.');

      $('#accordion').append(basicTableHTML(step+'b',opt_n+1));
      $('#option10b .c2').show();
      $('#option10b .r1 .c1').append(ts_text);
      $('#option10b .r1 .c2').append(capitalize(task.what));
      $('#option10b .instructions').append('Write the time interval in the first column to indicate when the event with that value has occurred.');

      $('#accordion').append(basicTableHTML(step+'c',opt_n+2));
      $('#option10c .c2').show();
      $('#option10c .r1 .c1').append(ts_text);
      $('#option10c .r1 .c2').append(capitalize('Sum of '+task.what));
      $('#option10c .instructions').append('Write the time interval in the first column to indicate when the cumulative sum is that amount.');

      for (var j=2; j<=6; j++) {
        $('#option10b .r'+j+' .c2').append(task.valuesingle);
        $('#option10c .r'+j+' .c2').append(task.valuesingle*(j-1));
      }

    }

  }

  else if (step == STEP.FREQUENCY) {

    $('#accordion').append(basicTableHTML(step+'a',opt_n));
    $('#option11a .c2').show();
    $('#option11a .r1 .c1').append(capitalize(task.freqs));
    $('#option11a .r1 .c2').append(capitalize(task.what));
    for (var f=0; f<5; f++) {
      $('#option11a .r'+(f+2)+' .c1').append(1+task.freqi*f);
    }

    if (task.valuetype == 'yn') {
      $('#option11a .instructions').append('For each time interval, write down whether the event occurred or not.');
      $('#option11a .instructions').append('<br><b>Alternative instruction:</b> Shade in the times the event occurs.');
      $('#option11a .instructions').append('<br><b>Alternative instruction:</b> Place a sticker on the times when the event occurs.');

      $('#accordion').append(basicTableHTML(step+'b',opt_n+1));
      $('#option11b .c2').show();
      $('#option11b .r1 .c1').append(capitalize(task.freqs));
      $('#option11b .r1 .c2').append(capitalize(task.what));
      for (var f=0; f<5; f++) {
        $('#option11b .r'+(f+2)+' .c1').append(1+task.freqi*f);
      }
      for (var i=2; i<=6; i++) {
        $('#option11b .r'+i+' .c2').append('YES / NO');
      }

      $('#option11b .instructions').append('Cirlce YES or NO depending on whether the event occurs.');

      $('#accordion').append(basicTableHTML(step+'c',opt_n+2));
      $('#option11c .r1 .c1').append(capitalize(task.freqs));
      for (var f=0; f<5; f++) {
        $('#option11c .r'+(f+2)+' .c1').append(1+task.freqi*f);
      }

      $('#option11c .instructions').append('For each time interval, cross out the times where the event occurs.');
      $('#option11c .instructions').append('<br><b>Alternative instruction:</b> Shade in the times the event occurs.');
      $('#option11c .instructions').append('<br><b>Alternative instruction:</b> Place a sticker on the times when the event occurs.');

    }

    if (task.freqs == 'day' || task.freqs == 'week' || task.freqs == 'month' || task.freqs == 'year') {
      $('#accordion').append(basicTableHTML(step+'d',opt_n+3));
      $('#option11d').addClass('output-calendar');
      $('#option11d .c2').show();
      $('#option11d .c3').show();
      $('#option11d .c4').show();
      $('#option11d .c5').show();
      $('#option11d .c6').show();
      $('#option11d .c7').show();
      $('#option11d .r6').hide();
      $('#option11d .instructions').append('Fill out the calendar according to your needs. For each time the event occurs, make a mark on the calendar.');
      $('#option11d .instructions').append('<br><b>Alternative instruction:</b> Shade in the times the event occurs GREEN and the times it does not RED.');
      $('#option11d .instructions').append('<br><b>Alternative instruction:</b> Place a GREEN in the times the event occurs and a RED times that the event does not occur.');
    }

    else {
      $('#accordion').append(clockHTML(step+'d',opt_n+3));
      $('#option11d .instructions').append('Make a mark on the clock at the times the event occurs.');
      $('#option11d .instructions').append('<br><b>Alternative instruction:</b> Draw a line that is GREEN in the times the event occurs and a RED line in the times the event does not occur.');
    }
  }

  else if (step == STEP.DURATION) {

    // console.log(task.dur3i);

    if (task.dur1s == 'from') {

      var td = (task.freqs == 'hour' || task.freqs == 'minute') ? 'Time' : 'Date';

      $('#accordion').append(basicTableHTML(step+'a',opt_n));
      $('#option12a .c2').show();
      $('#option12a .r1 .c1').append(td);
      $('#option12a .r1 .c2').append(capitalize(task.what));
      $('#option12a .instructions').append('Fill in the tracking information in the second column based on the date in the first column.');

      for (var d=0; d<5; d++) {
        // need to calculate the intervals
        $('#option12a .r'+(d+2)+' .c1').append(calculateNextTime(d,task.dur3i,task.freqi,task.freqs));
      }

      if (task.valuetype == 'yn') {

        $('#option12a .instructions').append('<br><b>Alternative instruction:</b> Write a YES for the times the event occurs.');

        $('#accordion').append(basicTableHTML(step+'b',opt_n+1));
        $('#option12b .c2').show();
        $('#option12b .r1 .c1').append(td);
        $('#option12b .r1 .c2').append(capitalize(task.what));
        $('#option12b .instructions').append('Mark YES or NO depending on whether the event occurs.');

        $('#accordion').append(basicTableHTML(step+'c',opt_n+1));
        $('#option12c .r1 .c1').append(capitalize(task.what));
        $('#option12c .instructions').append('Cross off the dates where the event does not occur.');
        $('#option12c .instructions').append('<br><b>Alternative instruction:</b> Cross off the times where the event does occur.');
        $('#option12c .instructions').append('<br><b>Alternative instruction:</b> Shade the times where the event occurs GREEN and the ones where the event does not occur RED to help get a clearer sense of regularity.');
        $('#option12c .instructions').append('<br><b>Alternative instruction:</b> Cut at the time at the point the event stops occurring to get a sense of how many consecutive times the event occurs.');

        for (var d2=0; d2<5; d2++) {
          // need to calculate the intervals
          $('#option12b .r'+(d2+2)+' .c1').append(calculateNextTime(d,task.dur3i,task.freqi,task.freqs));
          $('#option12b .r'+(d2+2)+' .c2').append('YES / NO');

          $('#option12c .r'+(d2+2)+' .c1').append(calculateNextTime(d,task.dur3i,task.freqi,task.freqs));
        }
      }

      else if (task.valuetype == 'single') {
        $('#option12a .instructions').append('<br><b>Alternative instruction:</b> Write the cumulative sum at the given time by crossing numbers off of a running total.');
      }

    }
    
  }

}

function printTime(type, time) {
  if (type == 'hhmm') {
    return ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2);
  }
  else if (type == 'mmddyyyy') {
    // return ('0' + time.getMonth()).slice(-2) + '/' + ('0' + time.getDay()).slice(-2) + '/' + time.getYear();
    var m = (time.getMonth()+1).toString();
    var y = time.getYear().toString();
    return ('0' + m).slice(-2) + '/' + ('0' + time.getDate()).slice(-2) + '/' + y.slice(-2);
  }
}

function calculateNextTime(line, start_date, freqi, freqs) {

  // console.log(line, start_date, freqi, freqs);
  var next = new Date(start_date);
  console.log(next);

  if (freqs == 'hour') {
    console.log(next.getHours, line, freqs, next.getHours() + line * freqi);
    next.setHours(next.getHours() + line * freqi);
    return printTime('hhmm', next);
  }
  else if (freqs == 'minute') {
    next.setMinutes(next.getMinutes() + line * freqi);
    return printTime('hhmm', next);
  }
  else if (freqs == 'day') {
    next.setDate(next.getDate() + line * freqi);
    return printTime('mmddyyyy', next);
  }
  else if (freqs == 'month') {
    next.setMonth(next.getMonth() + line * freqi);
    return printTime('mmddyyyy', next);
  }
  else if (freqs == 'year') {
    next.setYear(next.getYear() + freqi * line);
    return printTime('mmddyyyy', next);
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