$(function() {

	//Highlight current nav selection
	$("#plan-board, #current-board").removeClass("active");

	var pathname = window.location.pathname;

	if(pathname == "/boards/plan") {
		$("#plan-board").addClass("active");
		$("#column-backlog, #column-planned").addClass("actionable");
	}
	if(pathname == "/boards/current") {
		$("#current-board").addClass("active");
		$("#column-planned, #column-started, #column-done").addClass("actionable");
	}

	function bindSortable() {

		//Plan view, projects and tasks sortable, project_tasks not sortable
		$(".actionable").sortable(
			{ connectWith: ".actionable" },
			{ items: ".sortable"}
		);

		$(".actionable").disableSelection();

		$(".actionable").on("sortstop", function(event, ui) {

			//Items
			//TODO: Only make ajax call if status is new
			if(ui.item.hasClass("item")) {

				var item_id = ui.item.attr("id");

				if(ui.item.closest(".actionable").attr("id") == "column-backlog") {
					var dropped_in = "backlog";
				}
				else if(ui.item.closest(".actionable").attr("id") == "column-planned") {
					var dropped_in = "planned";
				}
				else if(ui.item.closest(".actionable").attr("id") == "column-started") {
					var dropped_in = "started";
				}
				else if(ui.item.closest(".actionable").attr("id") == "column-done") {
					var dropped_in = "done";
				}				
				else {
					//Default to planned and throw error
					//TODO: Throw error					
					var dropped_in = "planned";
				}

				$.ajax({
					type: "PUT",
					url: "/items/" + item_id + "/plan",
					data: { to: dropped_in },
					cache: true,
					dataType: "script"
				});

			}

			//Projects
			if(ui.item.hasClass("project"))	{

				var project_id = ui.item.attr("id");

				if(ui.item.closest(".actionable").attr("id") == "column-backlog") {
					var dropped_in = "backlog";
				}												
				else {
					var dropped_in = "planned";
				}

				$.ajax({
					type: "PUT",
					url: "/projects/" + project_id + "/plan",
					data: { to: dropped_in },
					cache: true,
					dataType: "script"
				});
			}

			//Tasks	
			if(ui.item.hasClass("task")) {

				if (ui.item.closest(".actionable").attr("id") == "column-backlog") {
					var status = "backlog";
				}
				if (ui.item.closest(".actionable").attr("id") == "column-planned") {
					var status = "planned";
				}
				console.log(status);

				$(ui.item).find(".status_field").val(status);
			  	$(ui.item).find(".jquery_sub").trigger('click');
			}

		});

	}

	bindSortable();
	
	//Current view, project_tasks and tasks sortable, projects not sortable
	/*
	$(".column").sortable(
		{ connectWith: ".column" },
		{ items: ".task" }
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
		
		$(ui.item).find(".status_field").val(status);
	  	$(ui.item).find(".jquery_sub").trigger('click');
		 
	});
	*/
	
	//Had to disable for now because it required a div wrapper #backlog around li's
	//$("#backlog").slimScroll({
			//height: 'auto',
			//distance: '3px'
	//});

	$(document).on("ajax:success", "#filter-form", function() {
		bindSortable();
	});
	
});


$(document).on("click", ".hide-tasks", function() {
	$(this).closest("li")
	.nextUntil(".item")
	.remove();
	
	$(this).siblings(".show-tasks-link").removeClass("hidden");
	$(this).addClass("hidden");
	
	$(this).closest(".item").addClass("sortable");
});

//Plan a project task (ie - split a project)
/*
$(".column").on("ajax:beforeSend", "form", function() {
	console.log("project task beforeSend fired");
	$(".pt-marked").removeClass("pt-marked");
	$(this).closest("li").addClass("pt-marked");
});
*/

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

//Hook into ajax beforeSend to mark card for subsequent DOM insertion
$(document).on("ajax:beforeSend", "a", function() {
	$(".marked").removeClass("marked");
	$(this).closest("li").addClass("marked");
	console.log("marked called");
});


$(document).on("click", ".cancel", function() {
	$(this).closest("li").remove();
});


$("#backlog").on("change", ".select-card-checkbox", function() {
	//TODO: This event is being fired twice for some reason, so this needs to be fixed
	//(Not since moving this function from boards.js to here I think)
	$(this).closest("li").children(".card-controls").addClass("invisible");
	$(this).closest("li").children(".card-controls-link-tasks").addClass("invisible");

	if ($(".select-card-checkbox:checked").length > 0) {
		$("#update-multiple-menu").removeClass("invisible");
	}
	else {
		$("#update-multiple-menu").addClass("invisible");
	}
});


//Using .on and delegated event binding approach so that projects added via ajax work
//TODO: Refactor this to simplify logic
$(document).on( "mouseenter", "li", function() {
	if ($(".select-card-checkbox:checked").length === 0) {
		if ($(this).hasClass("has-steps")
			&& $(this).closest(".actionable").attr("id") == "column-backlog") {
			$(this).find(".show-tasks-link").removeClass("invisible");
		}
		if ($(this).closest(".actionable").attr("id") == "column-backlog"
			|| $(this).closest(".actionable").attr("id") == "column-planned") {
			$(this).find(".insert-items-link").removeClass("invisible");
		}
		$(this).find(".delete-item-link").removeClass("invisible");
	}

	if ($(".select-card-checkbox:checked").length > 0
		&& !$(this).find(".select-card-checkbox").prop("checked")
		&& $(".has-steps .select-card-checkbox:checked").length === 0) {
			$(this).children(".card-controls").addClass("hidden");
			$(this).children(".add-items").removeClass("hidden");
	}
});

$(document).on( "mouseleave", "li", function() {
	//$(this).children(".card-controls").addClass("invisible").removeClass("hidden");
	$(this).find(".show-tasks-link, .delete-item-link, .insert-items-link")
		.addClass("invisible").removeClass("hidden");
	$(this).children(".add-items").addClass("hidden");
});
