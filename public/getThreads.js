var anonCheck = function (name) {
	if (name == "") return "Anonymous";
	return name;
}

$(document).ready(function () {
    $.getJSON("/api/threads", function (res) {
        $.each(res, function (i, item) {
        	$('#board').append('<div class="threadDiv" id="' + item['_id'] + '">' + "</div>");
        	$.each(item['comments'],function(j,actComment){
        		$('#' + item['_id']).append('<div class="commentLine"><div class="commentHeader"><span class="commentDate">' +
        			actComment.date +
		             '</span> <span class="commentName">' +
		             anonCheck(actComment.name) +
		             '</span></div>' +
		             '<div class="commentBody">' +
		             actComment.body +
		             '</div></div>');
            
        	});
        	
        	console.log(item);

        });
    });
});
