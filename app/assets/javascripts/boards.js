$(document).ready(function() {

	// Allow Bootstrap dropdown menus to have forms/checkboxes inside, 
	// and when clicking on a dropdown item, the menu doesn't disappear.
	// From: https://github.com/twbs/bootstrap/issues/2097
	$(document).on('click', '.dropdown-menu.dropdown-menu-form', function(e) {
	  e.stopPropagation();
	});

	$('#column-backlog').perfectScrollbar();

	//TODO - Remove the following two event bindings
	//These are workarounds for the problem I had with the spacebar
	//behaving like the down arrow button
	$("#column-backlog").on("focusin", "#new-item-name", function() {

		$('#column-backlog').perfectScrollbar('destroy');

		$('#column-backlog').perfectScrollbar({
			useKeyboard: false
		});
	});

	$("#column-backlog").on("focusout", "#new-item-name", function() {

		$('#column-backlog').perfectScrollbar('destroy');

		$('#column-backlog').perfectScrollbar({
			useKeyboard: true
		});
	});	

});