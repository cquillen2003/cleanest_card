
//This works!
//$(document).on('change', '.selector', function () { code });


//$(document).on('change', '.task-input', function () {
	//alert("test");
	//$('#footer-controls').toggle();
//});

$(document).delegate("#application-page", "pageshow", function() {
  //alert('A page with an id of "aboutPage" was just created by jQuery Mobile!');
  
  $(".task-input").change(function() {
  	//alert("changed!");
  	var n = $( ".task-input:checked" ).length;
  	
  	if (n > 1) {
  		$('#footer-controls-1').hide();
  		$('#footer-controls-2').show();
  	}
  	else if (n == 1) {
  		$('#footer-controls-2').hide();
  		$('#footer-controls-1').show();
  	}  	
  	else {
  		$('#footer-controls-1').hide();
  		$('#footer-controls-2').hide();
  	}
  });
  
});




//TODO: Refactor 3 functions below into 1
$(document).on('click', '#mark-task-planned', function () {
	//alert("why do they make this so hard?");
	$("#task-status").val("planned");
	$("#mass-update-form").submit();
});

$(document).on('click', '#mark-task-started', function () {
	//alert("why do they make this so hard?");
	$("#task-status").val("started");
	$("#mass-update-form").submit();
});

$(document).on('click', '#mark-task-done', function () {
	//alert("why do they make this so hard?");
	$("#task-status").val("done");
	$("#mass-update-form").submit();
});

