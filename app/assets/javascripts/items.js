$(document).on("click", ".link-items", function() {
	console.log("link items called");
	var parentId = $(this).closest("li").attr("id");
	console.log(parentId);
	$("#parent_id").val(parentId);

	$("#link-items-form").submit();
});