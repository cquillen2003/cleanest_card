$(document).on("click", ".link-items", function() {
	
	var parentId = $(this).closest("li").attr("id");
	
	//Perform action without a form to avoid the problem I had with
	//the Insert Items form (form within a form).
	var itemObjectsArray = $(".select-card-checkbox:checked").serializeArray();

	var itemIdsArray = [];

	for (var i = 0; i < itemObjectsArray.length; i++) {
		itemIdsArray[i] = itemObjectsArray[i].value;
	}

	$.ajax({
		type: "PUT",
		url: "/items/link_items",
		data: {
			parent_id: parentId,
			item_ids: itemIdsArray
		},
		cache: true,
		dataType: "script",
		success: function() {
			$(".select-card-checkbox:checked").closest("li").remove();
			$(".add-items").addClass("hidden");
			$('#column-backlog').perfectScrollbar('update');
		}
	});
	
});

