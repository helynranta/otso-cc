$(document).ready(function()
{

	$("#submitBtn").click(function() {
   		postData();
   	});


function postData()
{
    var url = window.location.href;
    url = url.split("/");
    var id = url[url.length - 1];
	var data = JSON.stringify({
		"id":id,
		"email": $("#email").val(),
		"date": new Date().toJSON(),
		"stars": [$("#overall").val(), $("#tidiness").val(), $("#service").val(), $("#time").val()],
		"comment": $("#comment").val(),
		"recall": $("#recall input[type='radio']:checked").val()
	});
	$.ajax({
			url:'/feedback.json/'+id,
			contentType:'application/json',
			dataType:'json',
			type:'POST',
			data:data,
			success: function(data) {

				$("body").html("that you!");

			}.bind(this),
			error:function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
}

})
