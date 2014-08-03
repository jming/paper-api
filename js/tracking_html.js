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
    '<option value="yn">whether it occurs or not</option>' +
    '<option value="single">the same number every time</option>' +
    '<option value="set">from a set of less than 5 possibilities</option>' +
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
  '<p>(Please separate values with a comma)</p>' +
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
      '<select class="form-control form-inline form-inline-smaller duration1-select" onchange="durationInput(this,1)">' +
      '<option disabled selected></option>' +
      '<option value="for">for</option>' +
      '<option value="from">from</option>' +
    '</select></div></td>' +
    '<td>' +
      '<div class="duration2-div" style="display:none;">'+
        '<input type="number" class="form-control form-inline form-inline-small duration2-input" placeholder="number"/>' +
        '<select class="form-control form-inline form-inline-small select-time duration2-select">' +
          '<option value="minute">minute(s)</option>' +
          '<option value="hour">hour(s)</option>' +
          '<option value="day">day(s)</option>' +
          '<option value="week">week(s)</option>' +
          '<option value="month">month(s)</option>' +
          '<option value="year">year(s)</option>' +
        '</select>' +
      '</div>' +
      '<div class="input-group date timeInput duration3-div" style="display:none;" id="duration3-dtpick">'+
        "<input type='text' class='form-control duration3-input' />" +
        "<span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span>" +
      '</div>' +
    '</td>' +
  '</tr><tr>' +
    '<td></td>' +
    '<td><div class="duration4-div" style="display:none;">' +
      '<select class="form-control form-inline form-inline-smaller duration4-select" onchange="durationInput(this,2)">' +
      '<option disabled selected></option>' +
      '<option value="to">to</option>' +
      '<option value="for">for</option>' +
    '</select></div></td>' +
    '<td>' +
      '<div class="duration5-div" style="display:none;">'+
        '<input type="number" class="form-control form-inline form-inline-small duration5-input" placeholder="number"/>' +
        '<select class="form-control form-inline form-inline-small select-time duration5-select">' +
          '<option value="minute">minute(s)</option>' +
          '<option value="hour">hour(s)</option>' +
          '<option value="day">day(s)</option>' +
          '<option value="week">week(s)</option>' +
          '<option value="month">month(s)</option>' +
          '<option value="year">year(s)</option>' +
        '</select>' +
      '</div>' +
      '<div class="input-group date timeInput duration6-div" style="display:none;" id="duration6-dtpick">'+
        "<input type='text' class='form-control duration6-input' />" +
        "<span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span>" +
      '</div>' +
    '</td>' +
  '</tr></table>' +
'</div>' +
'<div class="continuebutton-div">' +
  '<button class="btn" onclick="continueFrom(1,0)">Continue</button>' +
'</div>';

var outputHTML = '<div class="panel-group" id="accordion">' + '</div>';

function optionHTML (n, opt_n, stuff) {
  return '<div class="panel panel-default">' +
  '<div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#option'+n+'">' +
    'Tool #' +opt_n +
  '</a><button class="btn output-print" onclick="outputPrint('+opt_n+')"><span class="glyphicon glyphicon-print"></span></button></h4></div>' +
  '<div id=option'+n+' class="panel-collapse collapse options-collapse in"><div class="panel-body">' +
    '<p class="instructions"></p>' +
    '<div class="option">'+stuff+'</div>' +
  '</div></div>';
}

function basicTableHTML (n, opt_n) {
  var table =
    '<table class="table output-table">' +
      '<tr class="r1"><th class="c1"></th><th class="c2" style="display:none;"><th class="c3" style="display:none;"></th><th class="c4" style="display:none;"></th><th class="c5" style="display:none;"></th><th class="c6" style="display:none;"></th><th class="c7" style="display:none;"></th><th class="c8" style="display:none;"></th><th class="c9" style="display:none;"></th><th class="c10" style="display:none;"></th></tr>' +
      '<tr class="r2"><td class="c1"></td><td class="c2" style="display:none;"><td class="c3" style="display:none;"></td><td class="c4" style="display:none;"></td><td class="c5" style="display:none;"></td><td class="c6" style="display:none;"></td><td class="c7" style="display:none;"></td><td class="c8" style="display:none;"></td><td class="c9" style="display:none;"></td><td class="c10" style="display:none;"></td></tr>' +
      '<tr class="r3"><td class="c1"></td><td class="c2" style="display:none;"><td class="c3" style="display:none;"></td><td class="c4" style="display:none;"></td><td class="c5" style="display:none;"></td><td class="c6" style="display:none;"></td><td class="c7" style="display:none;"></td><td class="c8" style="display:none;"></td><td class="c9" style="display:none;"></td><td class="c10" style="display:none;"></td></tr>' +
      '<tr class="r4"><td class="c1"></td><td class="c2" style="display:none;"><td class="c3" style="display:none;"></td><td class="c4" style="display:none;"></td><td class="c5" style="display:none;"></td><td class="c6" style="display:none;"></td><td class="c7" style="display:none;"></td><td class="c8" style="display:none;"></td><td class="c9" style="display:none;"></td><td class="c10" style="display:none;"></td></tr>' +
      '<tr class="r5"><td class="c1"></td><td class="c2" style="display:none;"><td class="c3" style="display:none;"></td><td class="c4" style="display:none;"></td><td class="c5" style="display:none;"></td><td class="c6" style="display:none;"></td><td class="c7" style="display:none;"></td><td class="c8" style="display:none;"></td><td class="c9" style="display:none;"></td><td class="c10" style="display:none;"></td></tr>' +
      '<tr class="r6"><td class="c1"></td><td class="c2" style="display:none;"><td class="c3" style="display:none;"></td><td class="c4" style="display:none;"></td><td class="c5" style="display:none;"></td><td class="c6" style="display:none;"></td><td class="c7" style="display:none;"></td><td class="c8" style="display:none;"></td><td class="c9" style="display:none;"></td><td class="c10" style="display:none;"></td></tr>' +
      '</table>';
  return optionHTML(n,opt_n, table);
}

function clockHTML (n, opt_n) {
  var clock = '<img src="img/clock.png" class="output-clock" />';
  return optionHTML(n, opt_n, clock);
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
      continueButton(STEP.DURATION, 0);
    }
    else if (s == 'from') {
      $('.duration2-div').hide();
      $('.duration3-div').show();
      $('.duration3-div').datetimepicker();
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
      $('.duration6-div').datetimepicker();
    }
    continueButton(STEP.DURATION, 0);
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

function outputPrint (opt) {
  console.log(opt);
}

