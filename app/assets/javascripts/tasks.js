
//This works!
//$(document).on('change', '.selector', function () { code });


//$(document).on('change', '.task-input', function () {
	//alert("test");
	//$('#footer-controls').toggle();
//});

$(document).on('change', '.ui-page-active .task-input', function() {
  
	var n = $( ".ui-page-active .task-input:checked" ).length;
	
	if (n > 1) {
		$('.ui-page-active #footer-controls-1').hide();
		$('.ui-page-active #footer-controls-2').show();
	}
	else if (n == 1) {
		$('.ui-page-active #footer-controls-2').hide();
		$('.ui-page-active #footer-controls-1').show();
	}  	
	else {
		$('.ui-page-active #footer-controls-1').hide();
		$('.ui-page-active #footer-controls-2').hide();
	}
  
});


//TODO: Refactor 3 functions below into 1
$(document).on('click', '.ui-page-active #mark-task-planned', function () {
	//alert("why do they make this so hard?");
	$(".ui-page-active #task-status").val("planned");
	$(".ui-page-active #mass-update-form").submit();
});

$(document).on('click', '.ui-page-active #mark-task-started', function () {
	//alert("why do they make this so hard?");
	$(".ui-page-active #task-status").val("started");
	$(".ui-page-active #mass-update-form").submit();
});

$(document).on('click', '.ui-page-active #mark-task-done', function () {
	//alert("why do they make this so hard?");
	$(".ui-page-active #task-status").val("done");
	$(".ui-page-active #mass-update-form").submit();
});

