$(function() {
	
	$( ".columns" ).sortable( 
		{ connectWith: ".columns" },
		{ items: ".project, .task"}
	);
	
	$(".columns").on("sortstop", function( event, ui ) {
		
		//Set order value of items in Planned column
		$("#column-one .project, #column-one .task").each(function(index) {
			if ($(this).find(".order_field").val() != index + 1) {
				$(this).find(".order_field").val(index + 1);
				$(this).find(".jquery_sub").trigger('click');
			}
		});
		
		//Set status of dropped item
		if (ui.item.closest(".columns").attr("id") == "column-one") {
			var status = "planned"
		}
		if (ui.item.closest(".columns").attr("id") == "column-two") {
			var status = "started"
		}
		if (ui.item.closest(".columns").attr("id") == "column-three") {
			var status = "done"
		}
		//console.log(status)
		$(ui.item).find(".status_field").val(status);
		$(ui.item).find(".jquery_sub").trigger('click');
		 
	});
	
	$( ".columns" ).disableSelection();
	
	
});