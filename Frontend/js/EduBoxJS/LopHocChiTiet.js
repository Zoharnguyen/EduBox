// jQuery code
$(document).ready(function(){

	var lophoc_information = {
		"image_background":"images/featured-job.jpg",
		"image":"images/job1.jpg",
        "title": "Title-03",
        "location": "Location-03",
        "cost": "Cost-03",
        "note": "Yeu cau hoc sinh co hoc luc kha tro nen, khong nghich ngom hay bi dup tu truoc",
        "subject": "Toan",
        "form_study": "Hoc tai nha",
        "time": "Toi thu 2,4 hang tuan",
        "image_user": "images/client-logo.gif",
        "bio": "Toi la mot nguoi yeu thich viec truyen dat kien thuc cho nguoi khac va giup do cac ban hoc sinh dat duoc nhung thanh qua trong hoc tap"
	};

	var var_picked_course = localStorage.getItem("id_picked_course");
	console.log(var_picked_course);
	var url_get_course = 'http://localhost:8000/course/get/' + var_picked_course;
	console.log(url_get_course);

	var token_access = localStorage.getItem("token_access");
	var token_access_full = "Bearer " + token_access;
	console.log(token_access_full);

	$.ajax({
		url: url_get_course,
		type: 'GET',
		beforeSend: function (xhr) {
		    xhr.setRequestHeader('Authorization', token_access_full);
		},
		data: {},
		success: function (data, status) {
		  	console.log( "status_message: " + status );
		  	if (status === "success") {
				console.log(data);
				lophoc_arr = data;
				lophoc_detail = lophoc_arr[0];
				lophoc_detail["image_background"] =  "images/featured-job.jpg";
				lophoc_detail["image_user"] = "images/client-logo.gif";
				lophoc_detail["bio"] = "Toi la mot nguoi yeu thich viec truyen dat kien thuc cho nguoi khac va giup do cac ban hoc sinh dat duoc nhung thanh qua trong hoc tap";

				document.getElementById('h-course').innerHTML += insertInformationElementHead(lophoc_detail.image_background, lophoc_detail.image_course, lophoc_detail.title, lophoc_detail.location, lophoc_detail.cost, lophoc_detail.note);
				document.getElementById('bl-course').innerHTML += insertInformationElementBodyLeft(lophoc_detail.note, lophoc_detail.subject, lophoc_detail.form_study, lophoc_detail.time);
				document.getElementById('sidebar').innerHTML += insertInformationElementBodyRight(lophoc_detail.image_user, lophoc_detail.bio);			
			}
		},
		error: function () { window.location.href = "http://localhost:3000/TrangChu.html"; },
	});

	function insertInformationElementHead(image_background, image_giasu, title, location, cost, description) {
		var element_lophoc_head = "<h1>"+ title+ "</h1><br><br><h4>";
		element_lophoc_head += "<span><i class=\"fa fa-map-marker\"></i>" + location +"</span>"
		element_lophoc_head += "<span><i class=\"fa fa-dollar\"></i>"+ cost +"</span>";
		element_lophoc_head += "</h4>";		
		console.log(image_giasu);		
		return element_lophoc_head;
	}

	function insertInformationElementBodyLeft(description, subject, form_course, schedule) {
		var element_lophoc_BodyLeft = "<article> <h2>Thông tin về lớp</h2>";		
		element_lophoc_BodyLeft += "<h3>Mon Hoc</h3><p>" + subject + "</p>";
		element_lophoc_BodyLeft += "<h3>Hinh Thuc</h3><p>" + form_course + "</p>";
		element_lophoc_BodyLeft += "<h3>Lich Hoc</h3><p>" + schedule + "</p>";
		element_lophoc_BodyLeft += "<h3>Ghi Chu</h3><p>" + description + "</p>";
		element_lophoc_BodyLeft += "<h3>Ghi Danh Lop Hoc</h3><p>Ban co the lien he truc tiep toi dia chi edubox@gmail.com neu can ho tro them thong tin</p>"
		element_lophoc_BodyLeft += "<p><a href=\"#\" class=\"btn btn-primary btn-lg\">Dang Ky</a></p>";
		element_lophoc_BodyLeft += "</article>";	
		return element_lophoc_BodyLeft;
	}

	function insertInformationElementBodyRight(image_user, bio) {
		var element_lophoc_BodyRight = "<hr><div class=\"sidebar-widget\" id=\"company\"> <h2>Gia Sư</h2>";		
		element_lophoc_BodyRight += "<p><img src=\"" + image_user + "\" alt=\"\" class=\"img-responsive\"></p>";
		element_lophoc_BodyRight += "<p>" + bio + "</p>";
		element_lophoc_BodyRight += "<p><a href=\"TrangCaNhan.html\" class=\"btn btn-primary\">Them Thong Tin</a></p>";
		element_lophoc_BodyRight += "</div> <hr><div class=\"sidebar-widget\" id=\"company-jobs\"><h2>Các lớp khác của gia sư</h2><ul><li><a href=\"#\">Lop Hoc Tieng Anh</a></li><li><a href=\"#\">Lop Hoc Lop 8</a></li><li><a href=\"#\">Lop Hoc Tieu Hoc</a></li></ul></div>";	
		return element_lophoc_BodyRight;
	}

	// $("#b-dangbai").click(function(){
	// 	var var_job_subject = $("#job-subject").val();
	// 	var var_job_form_study = $("#job-form-study").val();
	// 	var var_job_location = $("#job-location").val();
	// 	var var_job_cost = $("#job-cost").val();
	// 	var var_job_day_study = $("#job-day-study").val();
	// 	var var_note = $("#job-note").val();

	// 	console.log("var_job_subject: " + var_job_subject);
	// 	console.log("var_job_form_study: " + var_job_form_study);
	// 	console.log("var_job_location: " + var_job_location);
	// 	console.log("var_job_cost: " + var_job_cost);
	// 	console.log("var_job_day_study: " + var_job_day_study);
	// 	console.log("var_note: " + var_note);

	// 	// $.post('http://localhost:8000/api/token/', {username:var_username, password:var_password}, function( data, status ) {
	// 	//   console.log( data.refresh ); // Refresh token
	// 	//   console.log( data.access ); // Access token
	// 	//   console.log( "status_message: " + status );
	// 	//   if (status === "success") {
	// 	// 	console.log("Compare success");
	// 	// 	window.location.href = "http://localhost:3000/LopHoc.html";
	// 	// 	}
	// 	// }, "json");

	// 	$(location).attr('href', 'LopHoc.html')
	// });
});