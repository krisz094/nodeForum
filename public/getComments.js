var anonCheck = function (name) {
	if (name == "") return "Anonymous";
	return name;
}

$(document).ready(function () {
    $.getJSON("/api/comments", function (res) {
        $.each(res, function (i, item) {
            $('#commentDiv').prepend('<div class="commentLine"><div class="commentHeader"><span class="commentDate">' + res[i].date +
             '</span> <span class="commentName">' + anonCheck(res[i].name) + '</span></div>' + res[i].text +'</div>');
             //$('#commentDiv').add("div").addClass('commentLine').html('asd');
        });
    });
});
