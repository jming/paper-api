
function continueButton (step,n) {
  return '<button class="btn" onclick="continueFrom(this,'+step+','+n+')">Continue</button>';
}

function definingWhatHTML (n) {
  return '<div class="form-group">' +
  '<h4>What are you tracking?</h4>' +
  '<p>I am tracking' +
    '<input type="text" class="form-control form-inline what-input"/>' +
  '</p>' +
  continueButton(1,n) +
  '</div>';
}

function valueTypeHTML (what) {
  return '<div class="form-group">' +
    '<h4>What are the possible values of '+what+' each time you are tracking?</h4>' +
    '<p>The possible values are '+
      '<select class="form-control form-inline valuetype-select">' +
      '<option value="yn">yes or no</option>' +
      '<option value="single">the same number every time</option>' +
      '<option value="set">from a set of less than 10 possibilities</option>' +
      '<option value="other">other</option>' +
      '</select></p>' +
  '</div>';
}

function singleValueHTML (what) {
  return '<div class="form-group">' +
    '<h4>What is the value of '+ what +' each time?</h4>' +
    '<p>The input value of '+ what +' each time is' +
      '<input type="text" class="form-control form-inline form-inline-small singlevalue-input"/>' +
    '</p>' +
  '</div>';
}

function setValueHTML (what) {
  return '<div class="form-group">' +
    '<h4>What are the possible values of '+ what +' each time?</h4>' +
    '<p>The value of '+ what +' each time could be' +
    '<br>(Please separate values with a linebreak)' +
      '<textarea class="form-control setvalue-input"/>' +
    '</p>' +
  '</div>';
}

function timeSpaceHTML (what) {
  return '<div class="form-group">' +
    '<h4>Are you tracking '+ what +' over time or space?</h4>' +
    '<p>I am tracking '+ what +' over' +
      '<select class="form-control form-inline timespace-select">' +
      '<option value="time">time</option>' +
      '<option value="space">space</option>' +
      '</select>' +
    '</p>' +
  '</div>';
}

