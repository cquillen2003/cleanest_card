$(function() {

	//Highlight current nav selection
	$("#plan-board, #current-board").removeClass("active");

	var pathname = window.location.pathname;

	if(pathname == "/boards/plan") {
		$("#plan-board").addClass("active");
	}
	if(pathname == "/boards/current") {
		$("#current-board").addClass("active");
	}

	function bindSortable() {

		//Plan view, projects and tasks sortable, project_tasks not sortable
		$(".plannable").sortable(
			{ connectWith: ".plannable" },
			{ items: ".item, .project, .task"}
		);

		$(".plannable").disableSelection();

		$(".plannable").on("sortstop", function(event, ui) {

			//Items
			//TODO: Only make ajax call if status is new
			if(ui.item.hasClass("item")) {

				var item_id = ui.item.attr("id");

				if(ui.item.closest(".plannable").attr("id") == "column-backlog") {
					var dropped_in = "backlog";
				}
				else {
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

				if(ui.item.closest(".plannable").attr("id") == "column-backlog") {
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

				if (ui.item.closest(".plannable").attr("id") == "column-backlog") {
					var status = "backlog";
				}
				if (ui.item.closest(".plannable").attr("id") == "column-planned") {
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
	
	//Had to disable for now because it required a div wrapper #backlog around li's
	//$("#backlog").slimScroll({
			//height: 'auto',
			//distance: '3px'
	//});

	$(document).on("ajax:success", "#filter-form", function() {
		bindSortable();
	});
	
});


$(".hide-tasks").click(function() {
	$(this).closest("li")
	.nextUntil(".item")
	.remove();
	
	$(this).siblings(".show-tasks").removeClass("hidden");
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
$(".plannable, .column").on("ajax:beforeSend", "a", function() {
	$(".marked").removeClass("marked");
	$(this).closest("li").addClass("marked");
});

$(document).on("ajax:success", "#link-items-form", function() {
	$(".select-card-checkbox:checked").closest("li").remove();
});


$(".plannable, .column").on("click", ".cancel", function() {
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
$(document).on( "mouseenter", "li", function() {
	if ($(".select-card-checkbox:checked").length === 0) {
		$(this).children(".card-controls").removeClass("invisible");
	}

	if ($(".select-card-checkbox:checked").length > 0
		&& !$(this).find(".select-card-checkbox").prop("checked")
		&& $(".has-steps .select-card-checkbox:checked").length === 0) {
			$(this).children(".card-controls").addClass("hidden");
			$(this).children(".add-items").removeClass("hidden");
	}
});

$(document).on( "mouseleave", "li", function() {
	$(this).children(".card-controls").addClass("invisible").removeClass("hidden");
	$(this).children(".add-items").addClass("hidden");
});
