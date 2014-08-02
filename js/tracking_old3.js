var timeSelectHTML = '<select class="form-control form-inline form-inline-small select-time">' +
    // '<option value="second">second(s)</option>' +
    '<option value="minute">minute(s)</option>' +
    '<option value="hour">hour(s)</option>' +
    '<option value="day">day(s)</option>' +
    '<option value="week">week(s)</option>' +
    '<option value="month">month(s)</option>' +
    '<option value="year">year(s)</option>' +
  '</select>';

// TODO: figure out time selector
// var timeInputHTML =
//   '<div class="input-append date time-input">' +
//     '<input data-format="dd/MM/yyyy hh:mm:ss" type="text" />' +
//     '<span class="add-on">' +
//       '<i data-time-icon="icon-time" data-date-icon="icon-calendar"></i>' +
//   '</span></div>';
var timeInputHTML = "<div class='input-group date timeInput' id='datetimepicker1'>" +
  "<input type='text' class='form-control' />" +
  "<span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span>" +
  "</span></div>";
// '<input type="datetime" class="form-control form-inline" />';

var definingWhatHTML = '<div class="form-group">' +
  '<h4>What are you tracking?</h4>' +
  '<p>I am tracking' +
    '<input type="text" id="what-input" class="form-control form-inline"/>' +
  '</p>' +
  '<button class="btn" onclick="continueFrom(this,1)">Continue</button>' +
  '</div>';

function timeSpaceHTML(what) {
  return '<div class="form-group">' +
  '<h4>Are you tracking '+ what +' over time or space?</h4>' +
  '<p>I am tracking '+ what +' over' +
    '<select class="form-control form-inline timespace-select">' +
    '<option value="time">time</option>' +
    '<option value="space">space</option>' +
    '</select>' +
  '</p>' +
  '<button class="btn" onclick="continueFrom(this,2)">Continue</button>' +
  '</div>';
}

function frequencyHTML(what) {
  return '<div class="form-group">' +
  '<h4>How often will you be tracking '+ what +' ?</h4>' +
  '<p>I am tracking '+ what +' every' +
    '<input class="form-control form-inline form-inline-small frequency-input" placeholder="number"/>' +
     '<span class="frequency-select">'+timeSelectHTML+'</span>'+
  '</p>' +
  '<button class="btn" id="continue-3" onclick="continueFrom(this,3)">Continue</button>' +
  '<button class="btn" id="skip-3" onclick="skipFrom(this,3)">Skip</button>' +
  '</div>';
}

function durationHTML(what) {
  return '<div class="form-group">' +
  '<h4>How long will you be tracking '+ what +' ?</h4>' +
  '<p><table class="duration-input-table">' +
    '<td>I am tracking '+ what +' </td>'+
    '<td><select class="form-control form-inline form-inline-smaller" onchange="durationInput(this,1)">' +
      '<option disabled selected></option>' +
      '<option value="for">for</option>' +
      '<option value="from">from</option>' +
    '</select></td>' +
    '<td id="duration-input-r1c2"></td>' +
  '</table></p>' +
  // '<button class="btn" id="continue-4" onclick="continueFrom(this,4)">Continue</button>' +
  '<div id="button-bar"><button class="btn" id="skip-4" onclick="skipFrom(this,4)">Skip</button></div>' +
  '</div>';
}

// TODO: flesh this out
var durationHTML2 = '<select class="form-control form-inline form-inline-smaller" onchange="durationInput(this,2)">' +
    '<option disabled selected></option>' +
    '<option value="to">to</option>' +
    '<option value="for">for</option>' +
  '</select>';

function valuesSameHTML (what)  {
  return '<div class="form-group">' +
  '<h4>Are the values of '+ what +' the same every time?</h4>' +
  '<p><select class="form-control form-inline form-inline-small valuessame-select">' +
    '<option value="y">Yes</option>' +
    '<option value="n">No</option>' +
  '</select></p>' +
  '<button class="btn" onclick="continueFrom(this,11)">Continue</button>' +
  '</div>';
}

function valuesSingleHTML (what) {
  return '<div class="form-group">' +
    '<h4>What is the value of '+ what +' each time?</h4>' +
    '<p>The input value of '+ what +' each time is' +
      '<input type="text" id="valuesingle-input" class="form-control form-inline form-inline-small"/>' +
    '</p>' +
    '<button class="btn" onclick="continueFrom(this,12)">Continue</button>' +
    '</div>';
}

function valuesNumberHTML (what) {
  return '<div class="form-group">' +
  '<h4>How many possible values of '+ what +' are there?</h4>' +
  // TODO: include possibility for a range, yes/no?
  '<p>' +
    '<input type="text" id="valuemany-input" class="form-control form-inline form-inline-small"/>' +
    '<div class="checkbox"><label><input type="checkbox" class="form-control form-inline">More than 10</label></div>' +
    // <div class="checkbox"><label><input type="checkbox" value="per" class="sum-check-per"> per '+task.freqi+' '+task.freqs+'</label></div>' +
  '</p>' +
  '<button class="btn" onclick="continueFrom(this,13)">Continue</button>' +
  '</div>';
}

function capitalize(word) {
  return word.charAt(0).toUpperCase()+word.slice(1);
}

$('#addTrackingTaskButton').click(function() {
  $('#taskFields').append($('<div>').append(definingWhatHTML));
});

function continueFrom(btn,step) {
  $(btn).hide();
  if (step==3 || step==4) {
    $('#skip-'+step).hide();
  }
  generateTable(step);
  addNextStep(step);
}

function generateTable(step) {

  console.log('generateTable', step);

  var what = capitalize($('#what-input').val());
  // var what = w.charAt(0).toUpperCase()+w.slice(1);
  var ts = $('#timespace-select').val();
  var ts_text = (ts == 'time') ? 'Location' : 'Date';
  var freqi = parseInt($('.frequency-input').val(), 10);
  var freqs = $('.frequency-select select').val();
  var duras = $('.duration-select select').val();
  var duari = parseInt($('.duration-input').val(),10);
  var duras2 = $('.duration-select2 select').val();
  var duari2 = parseInt($('.duration-input2').val(),10);
  var timei1 = $('#timeinput-1 input').val();
  var timei2 = $('#timeinput-2 input').val();
  var vsingle = parseInt($('#valuesingle-input').val(),10);

  if (step == 1) {

    $('#toolsOutput')
      .append($('<table class="table output-table">')
        .append($('<tr>')
          .append($('<th>')
            .append(what)
          )
        )
        .append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
        .append($('<tr>').append('<td>'))
      );
  }

  else if (step == 2) {

    $('#toolsOutput')
      .append($('<table class="table output-table">')
        .append($('<tr>')
          .append($('<th>')
            .append(ts_text)
          )
          .append($('<th>')
            .append(what)
          )
        )
        .append($('<tr>').append('<td>').append('<td>'))
        .append($('<tr>').append('<td>').append('<td>'))
        .append($('<tr>').append('<td>').append('<td>'))
        .append($('<tr>').append('<td>').append('<td>'))
        .append($('<tr>').append('<td>').append('<td>'))
      );
  }

  else if (step == 3) {
    $('#toolsOutput')
      .append($('<table class="table output-table table-3">')
        .append($('<tr>')
          .append($('<th>')
            .append(capitalize(freqs))
          )
          .append($('<th>')
            .append(what)
          )
        )
      );
    for (var i=0; i<5; i++) {
      $('.table-3')
        .append($('<tr>')
          .append($('<td>').append((1+i*freqi).toString()))
          .append($('<td>'))
        );
    }
  }

  else if (step==4) {
    if (duras == 'minute' || duars == 'hour') {

    }
    else {
      $('#toolsOutput')
        .append($('<table class="table output-table table-4c">')
          .append($('<td>').append($('<tr>').append('')).append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>'))
          .append($('<td>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>'))
          .append($('<td>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>'))
          .append($('<td>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>'))
          .append($('<td>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>'))
          .append($('<td>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>'))
          .append($('<td>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>').append('<tr>'))
        );
    }
  }

  else if (step == 12) {
    $('#toolsOutput')
      .append($('<table class="table output-table table-12a">')
        .append($('<tr>')
          .append($('<th>')
            .append(ts_text)
          )
          .append($('<th>')
            .append(what)
          )
        )
      );
    for (var j=0; j<5; j++) {
      $('.table-12a')
        .append($('<tr>')
          .append($('<td>'))
          .append($('<td>').append(vsingle))
        );
    }

    $('#toolsOutput')
      .append($('<table class="table output-table table-12b">')
        .append($('<tr>')
          .append($('<th>')
            .append(ts_text)
          )
          .append($('<th>')
            .append('Sum of ' + what)
          )
        )
      );
    for (var k=1; k<=5; k++) {
      $('.table-12b')
        .append($('<tr>')
          .append($('<td>'))
          .append($('<td>').append(k*vsingle))
        );
    }

    $('#toolsOutput')
      .append($('<table class="table output-table table-12c">')
        .append($('<tr>')
          .append($('<th>')
            .append(ts_text)
          )
          .append($('<th>')
            .append(what)
          )
          .append($('<th>')
            .append('Sum of ' + what)
          )
        )
      );
    for (var l=1; l<=5; l++) {
      $('.table-12c')
        .append($('<tr>')
          .append($('<td>'))
          .append($('<td>').append(vsingle))
          .append($('<td>').append(l*vsingle))
        );
    }
  }
}

function addNextStep(step) {
  console.log('addNextStep', step);

  var what = $('#what-input').val();

  if (step == 1) {
    $('#taskFields').append($('<div>').append(timeSpaceHTML(what)));
  }
  else if (step == 2) {
    $('#taskFields').append($('<div>').append(frequencyHTML(what)));
  }
  else if (step == 3) {
    $('#taskFields').append($('<div>').append(durationHTML(what)));
  }
  else if (step == 4) {
    $('#taskFields').append($('<div>').append(valuesSameHTML(what)));
  }
  else if (step == 10) {
    $('#taskFields').append($('<div>').append(valuesSameHTML(what)));
  }
  else if (step == 11) {
    if ($('.valuessame-select').val() == 'y') {
      $('#taskFields').append($('<div>').append(valuesSingleHTML(what)));
    }
    else {
      $('#taskFields').append($('<div>').append(valuesNumberHTML(what)));
    }
  }
  else if (step == 13) {
    var num_values = parseInt($('#valuemany-input').val(), 10);
    $('#taskFields')
      .append($('<table class="table" id="manyinput-table">')
        .append($('<tr>')
          .append($('<th>').append('Label'))
          .append($('<th>').append('Value'))
        )
      );

    for (var i=0; i<num_values; i++) {
      $('#manyinput-table')
        .append($('<tr>')
          .append($('<td>').append('<input class="form-control form-inline" id="manyinput-label-'+i+'" />'))
          .append($('<td>').append('<input class="form-control form-inline" id="manyinput-value-'+i+'" />'))
        );
    }
    $('#taskFields').append($('<button class="btn" onclick="continueFrom(this,14)">Continue</button>'));
  }
}

function durationInput(selector,time) {
  // TODO: clear things from the next column
  var s = $(selector).val();

  if (s == 'from') {
    // add the from time thingy
    $('#duration-input-r1c2').html('');
    $('#duration-input-r1c2')
      .append("<div class='input-group date' id='timeinput-1'>" +
          "<input type='text' class='form-control' />" +
          "<span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span>" +
          "</span></div>"
      );
    $('#timeinput-1').datetimepicker();
    $('.duration-input-table')
      .append($('<tr class="row2">')
        .append($('<td>'))
        .append($('<td>')
          .append(durationHTML2)
        )
        .append($('<td id="duration-input-r2c2">'))
      );
    // add the next row
  }
  else if (s == 'to') {
    // add the date selector
    $('#duration-input-r2c2').html('');
    $('#duration-input-r2c2')
        .append("<div class='input-group date' id='timeinput-2'>" +
          "<input type='text' class='form-control' />" +
          "<span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span>" +
          "</span></div>");
    $('#timeinput-2').datetimepicker();
    $('#button-bar').html('');
      $('#button-bar').append('<button class="btn" id="continue-4" onclick="continueFrom(this,4)">Continue</button>' );
    $('#button-bar').append('<button class="btn" id="skip-4" onclick="skipFrom(this,4)">Skip</button>');
  }
  else if (s == 'for') {
    if (time == 1) {
      // add the for time thingy
      $('#duration-input-r1c2').html('');
      $('#duration-input-r1c2')
          .append('<input type="text" class="form-control form-inline form-inline-small duration-input" />')
          .append($('<span class="duration-select">')
            .append(timeSelectHTML)
        );
      $('#button-bar').html('');
      $('#button-bar').append('<button class="btn" id="continue-4" onclick="continueFrom(this,4)">Continue</button>' );
      $('#button-bar').append('<button class="btn" id="skip-4" onclick="skipFrom(this,4)">Skip</button>');
    }
    else {
      $('#duration-input-r2c2').html('');
      $('#duration-input-r2c2')
          .append('<input type="text" class="form-control form-inline form-inline-small duration-input2" />')
          .append($('<span class="duration-select2">')
            .append(timeSelectHTML)
        );
      $('#button-bar').html('');
      $('#button-bar').append('<button class="btn" id="continue-4" onclick="continueFrom(this,4)">Continue</button>' );
      $('#button-bar').append('<button class="btn" id="skip-4" onclick="skipFrom(this,4)">Skip</button>');
    }
    
  }
}

function skipFrom(btn, step) {
  $(btn).hide();
  console.log();
  if (step == 3 || step == 4) {
    // TODO: this is an arbitrary number
    continueFrom($('#continue-'+step), 10);
  }
}

