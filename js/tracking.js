var timeSelectHTML = '<select class="form-control form-inline form-inline-small select-time frequency-select">' +
    '<option value="second">second(s)</option>' +
    '<option value="minute">minute(s)</option>' +
    '<option value="hour">hour(s)</option>' +
    '<option value="day">day(s)</option>' +
    '<option value="week">week(s)</option>' +
    '<option value="month">month(s)</option>' +
    '<option value="year">year(s)</option>' +
  '</select>';

// TODO: figure out time selector
var timeInputHTML = 'TIME SELECTOR';

var definingWhatHTML = '<div class="form-group">' +
  '<h4>What are you tracking?</h4>' +
  '<p>I am tracking' +
    '<input type="text" id="what-input" class="form-control form-inline"/>' +
  '</p>' +
  '<button class="btn" onclick="continueFrom(this,1)">Continue</button>' +
  '</div>';

var timeSpaceHTML = '<div class="form-group">' +
  '<h4>Are you tracking over time or space?</h4>' +
  '<p>I am tracking over' +
    '<select class="form-control form-inline timespace-select">' +
    '<option value="time">time</option>' +
    '<option value="space">space</option>' +
    '</select>' +
  '</p>' +
  '<button class="btn" onclick="continueFrom(this,2)">Continue</button>' +
  '</div>';

var frequencyHTML = '<div class="form-group">' +
  '<h4>How often will you be tracking?</h4>' +
  '<p>I am tracking every' +
    '<input class="form-control form-inline form-inline-small frequency-input" placeholder="number"/>' +
     '<span class="frequency-select">'+timeSelectHTML+'</span>'+
  '</p>' +
  '<button class="btn" onclick="continueFrom(this,3)">Continue</button>' +
  '</div>';

var durationHTML = '<div class="form-group">' +
  '<h4>How long will you be tracking?</h4>' +
  '<p><table class="duration-input-table">' +
    '<td>I am tracking</td>'+
    '<td><select class="form-control form-inline form-inline-smaller" onchange="durationInput(this)">' +
      '<option disabled selected></option>' +
      '<option value="for">for</option>' +
      '<option value="from">from</option>' +
    '</select></td>' +
  '</table></p>' +
  '<button class="btn" onclick="continueFrom(this,4)">Continue</button>' +
  '</div>';

// TODO: flesh this out
var durationHTML2 = 'DURATION HTML 2';

$('#addTrackingTaskButton').click(function() {
  $('#taskFields').append($('<div>').append(definingWhatHTML));
});

function continueFrom(btn,step) {
  $(btn).hide();
  generateTable(step);
  addNextStep(step);
}

function generateTable(step) {

  var what = $('#what-input').val();
  var ts = $('#timespace-select').val();
  var ts_text = (ts == 'time') ? 'Location' : 'Date';
  var freqi = parseInt($('.frequency-input').val(), 10);
  var freqs = $('.frequency-select').val();

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
            .append(freqs)
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
}

function addNextStep(step) {
  if (step == 1) {
    $('#taskFields').append($('<div>').append(timeSpaceHTML));
  }
  else if (step == 2) {
    $('#taskFields').append($('<div>').append(frequencyHTML));
  }
  else if (step == 3) {
    $('#taskFields').append($('<div>').append(durationHTML));
  }
}

function durationInput(selector) {
  // TODO: clear things from the next column
  var s = $(selector).val();
  if (s == 'from') {
    // add the from time thingy
    $('.duration-input-table')
      .append($('<tr class="row2">')
        .append($('<td>')
          .append(durationHTML2)
        )
      );
    // add the next row
  }
  else if (s == 'for') {
    // add the for time thingy
    $('.duration-input-table tr')
      .append($('<td>')
        .append('<input type="text" class="form-control form-inline form-inline-small duration-input" />')
        .append($('<span class="duration-select">')
          .append(timeSelectHTML)
        )
      );
  }
}


