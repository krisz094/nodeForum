$(document).ready(function(){
	$('.commentId').click(function(){
		$('#replyArea').val($('#replyArea').val() + '>>' + $(this).html() + '\n');
	});

	$('.commentBody').each(function(comment){
		//$(this).text(IDtoURL($(this).text()));
		this.innerHTML= IDtoURL(this.innerHTML);
		console.log(this.innerHTML);
	});


});

function IDtoURL(comment){
	var IDregEx = /&gt;&gt;[0-9a-f]+/gm;
	return comment.replace(IDregEx,function(id){
		return '<a class="replyLink" href="#' + id.replace(/&gt;/g,"") + '">' + id  + '</a>';
	});
}