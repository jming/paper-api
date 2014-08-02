var STEP = {
  DEFININGWHAT : 1,
  VALUETYPE : 2,
  VALUESINGLE: 3,
  VALUESET: 4,
  TIMESPACE: 10,
  FREQUENCY: 11,
  DURATION: 12
};

var trackingHTML =
'<div class="definingwhat-div">' +
  '<h4>What are you tracking?</h4>' +
  '<p>I am tracking' +
    '<input type="text" class="form-control form-inline what-input"/>' +
  '</p>' +
'</div>' +
'<div class="valuetype-div" style="display:none;">' +
  '<h4>What are the possible values of <span class="what-span"></span> each time you are tracking?</h4>' +
  '<p>The possible values are '+
    '<select class="form-control form-inline valuetype-select" onchange="updateValueType(this)">' +
    '<option value="yn">yes or no</option>' +
    '<option value="single">the same number every time</option>' +
    '<option value="set">from a set of less than 10 possibilities</option>' +
    '<option value="other">other</option>' +
    '</select></p>' +
'</div>' +
'<div class="valuesingle-div" style="display:none;">' +
  '<h4>What is the value of <span class="what-span"></span> each time?</h4>' +
  '<p>The input value of <span class="what-span"></span> each time is' +
    '<input type="text" class="form-control form-inline form-inline-small valuesingle-input"/>' +
  '</p>' +
'</div>' +
'<div class="valueset-div" style="display:none;">' +
  '<h4>What are the possible values of <span class="what-span"></span> each time?</h4>' +
  '<p>(Please separate values with a linebreak)</p>' +
    '<p><textarea class="form-control valueset-input"/></p>' +
'</div>' +
'<div class="timespace-div" style="display:none;">' +
  '<h4>Are you tracking <span class="what-span"></span> over time or space?</h4>' +
  '<p>I am tracking <span class="what-span"></span> over' +
    '<select class="form-control form-inline form-inline-small timespace-select">' +
    '<option value="time">time</option>' +
    '<option value="space">space</option>' +
    '</select>' +
  '</p>' +
'</div>' +
'<div class="frequency-div" style="display:none;">' +
'<h4>How often will you be tracking <span class="what-span"></span> ?</h4>' +
  '<p>I am tracking <span class="what-span"></span> every' +
    '<input type="number" class="form-control form-inline form-inline-small frequency-input" placeholder="number"/>' +
    '<select class="form-control form-inline form-inline-small select-time frequency-select">' +
      '<option value="minute">minute(s)</option>' +
      '<option value="hour">hour(s)</option>' +
      '<option value="day">day(s)</option>' +
      '<option value="week">week(s)</option>' +
      '<option value="month">month(s)</option>' +
      '<option value="year">year(s)</option>' +
    '</select>' +
  '</p>' +
'</div>'+
'<div class="duration-div" style="display:none;">' +
'<h4>How long will you be tracking <span class="what-span"></span> ?</h4>' +
  '<table><tr>' +
    '<td>I will be tracking <span class="what-span"></span></td>' +
    '<td><div class="duration1-div">' +
      '<select class="form-control form-inline form-inline-smaller" onchange="durationInput(this,1)">' +
      '<option disabled selected></option>' +
      '<option value="for">for</option>' +
      '<option value="from">from</option>' +
    '</select></div></td>' +
    '<td>' +
      '<div class="duration2-div" style="display:none;">'+
        '<input type="number" class="form-control form-inline form-inline-small" placeholder="number"/>' +
        '<select class="form-control form-inline form-inline-small select-time">' +
          '<option value="minute">minute(s)</option>' +
          '<option value="hour">hour(s)</option>' +
          '<option value="day">day(s)</option>' +
          '<option value="week">week(s)</option>' +
          '<option value="month">month(s)</option>' +
          '<option value="year">year(s)</option>' +
        '</select>' +
      '</div>' +
      '<div class="input-group date timeInput duration3-div" style="display:none;">'+
        "<input type='text' class='form-control' />" +
        "<span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span>" +
      '</div>' +
    '</td>' +
  '</tr><tr>' +
    '<td></td>' +
    '<td><div class="duration4-div" style="display:none;">' +
      '<select class="form-control form-inline form-inline-smaller" onchange="durationInput(this,2)">' +
      '<option disabled selected></option>' +
      '<option value="to">to</option>' +
      '<option value="for">for</option>' +
    '</select></div></td>' +
    '<td>' +
      '<div class="duration5-div" style="display:none;">'+
        '<input type="number" class="form-control form-inline form-inline-small" placeholder="number"/>' +
        '<select class="form-control form-inline form-inline-small select-time">' +
          '<option value="minute">minute(s)</option>' +
          '<option value="hour">hour(s)</option>' +
          '<option value="day">day(s)</option>' +
          '<option value="week">week(s)</option>' +
          '<option value="month">month(s)</option>' +
          '<option value="year">year(s)</option>' +
        '</select>' +
      '</div>' +
      '<div class="input-group date timeInput duration6-div" style="display:none;">'+
        "<input type='text' class='form-control' />" +
        "<span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span>" +
      '</div>' +
    '</td>' +
  '</tr></table>' +
'</div>' +
'<div class="continuebutton-div"><p>' +
  '<button class="btn" onclick="continueFrom(1,0)">Continue</button>' +
'</p></div>';

var outputHTML = '<div class="panel-group" id="accordion">' + '</div>';

function basicTableHTML (n, opt_n) {
  return '<div class="panel panel-default">' +
  '<div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#option'+n+'">' +
    'Option #' +opt_n +
  '</a></h4></div>' +
  '<div id=option'+n+' class="panel-collapse collapse in"><div class="panel-body">' +
    '<table class="output-table">' +
      '<tr class="r1"><th class="c1"></th><th class="c2"></th></tr>' +
      '<tr class="r2"><td class="c1"></td><td class="c2"></td></tr>' +
      '<tr class="r3"><td class="c1"></td><td class="c2"></td></tr>' +
      '<tr class="r4"><td class="c1"></td><td class="c2"></td></tr>' +
      '<tr class="r5"><td class="c1"></td><td class="c2"></td></tr>' +
    '</table>' +
  '</div></div>';
}

function durationInput(select,opt) {
  var s = $(select).val();
  if (opt == 1) {
    if (s == 'for') {
      $('.duration2-div').show();
      $('.duration3-div').hide();
      $('.duration4-div').hide();
      $('.duration5-div').hide();
      $('.duration6-div').hide();
    }
    else if (s == 'from') {
      $('.duration2-div').hide();
      $('.duration3-div').show();
      $('.duration4-div').show();
    }
  }
  else if (opt == 2) {
    if (s == 'for') {
      $('.duration2-div').hide();
      $('.duration5-div').show();
      $('.duration6-div').hide();
    }
    else if (s == 'to') {
      $('.duration2-div').hide();
      $('.duration5-div').hide();
      $('.duration6-div').show();
    }
  }
}

function updateValueType (select) {
  if (!$('.continuebutton-div button').hasClass('continue-'+STEP.VALUETYPE)) {
    // remove 
    var s = $(select).val();
    if (s == 'yn' || s == 'other') {
      $('.valuesingle-div').hide();
      $('.valueset-div').hide();
    }
    else if (s == 'single') {
      $('.valueset-div').hide();
      showDiv2('.valuesingle-div','');
    }
    else if (s == 'set') {
      $('.valuesingle-div').hide();
      showDiv2('.valueset-div','');
    }
  }
}

