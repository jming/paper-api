function changeView(select) {
  var v = $(select).val();
  var nv = (v == 'graph') ? 'year' : 'graph';
  $('#'+v).show();
  $('#'+nv).hide();
}