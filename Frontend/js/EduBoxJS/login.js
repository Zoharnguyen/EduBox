// jQuery code
$(document).ready(function(){
	$("#form-login").click(function(){
		var var_username = $("#login-username").val();
		var var_password = $("#login-password").val();
		console.log("username: " + var_username);
		console.log("password: " + var_password);
		$.post('http://localhost:8000/api/token/', {username:var_username, password:var_password}, function( data, status ) {
		  console.log( data.refresh ); // Refresh token
		  console.log( data.access ); // Access token
		  console.log( "status_message: " + status );
		  if (status === "success") {
			console.log("Compare success");
			localStorage.setItem("token_access", data.access);
			localStorage.setItem("token_refresh", data.refresh);
			window.location.href = "http://localhost:3000/LopHoc.html";
			}
		}, "json");
	});
});