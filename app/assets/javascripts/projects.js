$(function() {
	
	
	$(".column").sortable(
		{ connectWith: ".column" },
		{ items: ".sortable" },
		{ cancel: ".cancel-sortable" }
	);
	
	$(".column").disableSelection();	
	
	$(".column").on("sortstop", function( event, ui ) {
		
		//Set order value of items in Planned column
		//$("#column-one .project, #column-one .task").each(function(index) {
			//if ($(this).find(".order_field").val() != index + 1) {
				//$(this).find(".order_field").val(index + 1);
				//$(this).find(".jquery_sub").trigger('click');
			//}
		//});
		
		//Set status of dropped item
		if (ui.item.closest(".column").attr("id") == "column-backlog") {
			var status = "backlog"
		}
		if (ui.item.closest(".column").attr("id") == "column-planned") {
			var status = "planned"
		}
		if (ui.item.closest(".column").attr("id") == "column-started") {
			var status = "started"
		}
		if (ui.item.closest(".column").attr("id") == "column-done") {
			var status = "done"
		}
		//console.log(status)
		$(ui.item).find(".status_field").val(status);
	  $(ui.item).find(".jquery_sub").trigger('click');
		 
	});
	
	//Had to disable for now because it required a div wrapper #backlog around li's
	//$("#backlog").slimScroll({
			//height: 'auto',
			//distance: '3px'
	//});
	
});


//Using .on and delegated event binding approach so that projects added via ajax work
$(".column").on( "mouseenter", "li", function() {
	$(this).children(".card-controls").removeClass("invisible");
});

$(".column").on( "mouseleave", "li", function() {
	$(this).children(".card-controls").addClass("invisible");
});


$(".hide-tasks").click(function() {
	$(this).closest("li")
	.nextUntil(".project, .task")
	.remove();
	
	
	$(this).siblings(".show-tasks").removeClass("hidden");
	$(this).addClass("hidden");
	
	$(this).closest(".project").addClass("sortable");
	
});

//Using the nested model form delete technique from RailsCasts #196 Nested Model Form (revised)
//This way the user can click cancel and cancel the task deletions

//Think I can delete this now that I'm useing the nested form gem
/*
$("form").on("click", ".delete-task", function(event) {
	$(this).prev("input[type=hidden]").val('1');
	$(this).closest("tr").hide();
	event.preventDefault();
});
*/

//Trying to hook into ajax beforeSend
$(".column").on("ajax:beforeSend", "a", function() {
	console.log("beforeSend fired");
	$(".marked").removeClass("marked");
	$(this).closest("li").addClass("marked");
});


