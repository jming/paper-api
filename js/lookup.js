function changeView(select) {
  var v = $(select).val();
  var nv = (v == 'graph') ? 'calendar' : 'graph';
  $('#'+v).show();
  $('#'+nv).hide();
}

$('#container_image').PictureCut({
	InputOfImageDirectory       : "image",
	PluginFolderOnServer        : "/jquery.picture.cut/",
	FolderOnServer              : "/uploads/",
	EnableCrop                  : true,
	CropWindowStyle             : "Bootstrap"
})