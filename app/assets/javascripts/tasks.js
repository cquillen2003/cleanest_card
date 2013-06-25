
//This works!
//$(document).on('change', '.selector', function () { code });


$(document).on('change', '.task-input', function () {
	//alert("test");
	$('#footer-controls').toggle();
});


$(document).on('click', '#mark-task-done', function () {
	//alert("why do they make this so hard?");
	$("#mass-update-form").submit();
});

