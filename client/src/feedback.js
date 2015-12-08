$(document).ready(function()
{

	$("#submitBtn").click(function() {	
   		postData();
   	});


function postData()
{
	console.log("jee");
	/*"asdf": {
        "email": "example",
        "date": "example",
        "stars": [
            0,
            1,
            2,
            3
        ],
        "comment": "example",
        "recall": 0
    }*/

    var url = window.location.href;
    asd = url.split("/");
    id = asd[asd.length - 1];


	var data = JSON.stringify({
		"id":id,
		"email": $("email").val(),
		"date": new Date().toJSON(),
		"stars": [$("#overall").val(), $("#tidiness").val(), $("#service").val(), $("#time").val()],
		"comment": $("comment").val(),
		"recall": $("#recall input[type='radio']:checked").val()

	});

	console.log(data);
	$.ajax({
			url:'/feedback.json/'+id,
			contentType:'application/json',
			dataType:'json',
			type:'POST',
			data:data,
			success: function(data) {
				try{
					data = JSON.parse(data);

				} catch(err){
					console.log(err.toString());
				} finally {
					if(data['success']=="true"){
						$this.props.logIn(true, data.userinfo.group);
					}
				}
			}.bind(this),
			error:function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
}

})