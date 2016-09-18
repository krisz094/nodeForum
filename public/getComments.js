var anonCheck = function (name) {
	if (name == "") return "Anonymous";
	return name;
}

$(document).ready(function () {
    $.getJSON("/api/comments", function (res) {
        $.each(res, function (i, item) {
        	$('#board').add('<div class="t')
            //$('#commentDiv').prepend('<div class="commentLine"><div class="commentHeader"><span class="commentDate">' + res[i].date +
             //'</span> <span class="commentName">' + anonCheck(res[i].name) + '</span></div>' + '<div class="commentBody">' + res[i].text +'</div></div>');
             //$('#commentDiv').add("div").html('asd');
        });
    });

});
