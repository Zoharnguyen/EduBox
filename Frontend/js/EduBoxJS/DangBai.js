// jQuery code
$(document).ready(function(){
	$("#b-dangbai").click(function(){
		var var_job_subject = $("#job-subject").val();
		var var_job_form_study = $("#job-form-study").val();
		var var_job_location = $("#job-location").val();
		var var_job_cost = $("#job-cost").val();
		var var_job_day_study = $("#job-day-study").val();
		var var_note = $("#job-note").val();
		var var_image_course = "images/job4.jpg";
		var var_title = $("#job-title").val();

		console.log("var_job_subject: " + var_job_subject);
		console.log("var_job_form_study: " + var_job_form_study);
		console.log("var_job_location: " + var_job_location);
		console.log("var_job_cost: " + var_job_cost);
		console.log("var_job_day_study: " + var_job_day_study);
		console.log("var_note: " + var_note);

		var course_body = {subject:var_job_subject, form_study:var_job_form_study, location: var_job_location, cost: var_job_cost, time: var_job_day_study, note: var_note, image_course:var_image_course, title:var_title};

		// $.post('http://localhost:8000/course/add', JSON.stringify(course_body), function(data, status) {
		// 	console.log(status)
		// 	if (status === "success") {
		// 		console.log( "Success" ); 	
		// 		$(location).attr('href', 'LopHoc.html')
		// 	}		 
		// }, "json");

		var token_access = localStorage.getItem("token_access");
		var token_access_full = "Bearer " + token_access;
		console.log(token_access_full);
		var json_body = JSON.stringify(course_body);
		console.log(json_body);

		$.ajax({
			url: 'http://localhost:8000/course/add',
			type: 'POST',
			beforeSend: function (xhr) {
			    xhr.setRequestHeader('Authorization', token_access_full);
			},
			data: json_body,
			success: function (data, status) {
			  	console.log(status)
				if (status === "success") {
					console.log( "Success" ); 	
					$(location).attr('href', 'LopHoc.html')
				} 
			},
			error: function () { window.location.href = "http://localhost:3000/TrangChu.html"; },
	});

	});
});