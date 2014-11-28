function changeView(select) {
  var v = $(select).val();
  var nv = (v == 'graph') ? 'calendar' : 'graph';
  $('#'+v).show();
  $('#'+nv).hide();
}