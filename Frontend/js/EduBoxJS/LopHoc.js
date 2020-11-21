// jQuery code
$(document).ready(function(){

	var lophoc_arr = [];
	var image_background = "images/featured-job.jpg";

	var token_access = localStorage.getItem("token_access");
	var token_access_full = "Bearer " + token_access;
	console.log(token_access_full);

	$.ajax({
		url: 'http://localhost:8000/course/get-all',
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
				document.getElementById('c-suit').innerHTML += insertInformationElementSuit(image_background, lophoc_arr[0].image_course, lophoc_arr[0].title, lophoc_arr[0].location, lophoc_arr[0].cost, lophoc_arr[0].note, lophoc_arr[0].unique_id);
				for (i=0; i<lophoc_arr.length; i++) {
					console.log(lophoc_arr.length);
				    document.getElementById('l-job').innerHTML += insertInformationElement(lophoc_arr[i].image_course,lophoc_arr[i].title, lophoc_arr[i].location, lophoc_arr[i].cost, lophoc_arr[i].unique_id);
				}			
			} 
		},
		error: function () { window.location.href = "http://localhost:3000/TrangChu.html"; },
	});

	function insertInformationElement(image_giasu, title, location, cost, unique_id) {
		var element_lophoc = "<a href=\"#\" onclick=\"getCourseDetail('"+ unique_id +"')\" >";
		element_lophoc += "<div class=\"featured\"></div>";
		element_lophoc += "<img src=\""+ image_giasu + "\"" + " alt=\"\" class=\"img-circle\" />";
		element_lophoc += "<div class=\"title\">";
		element_lophoc += "<h5>"+ title +"</h5>";
		element_lophoc += "</div> <div class=\"data\">";
		element_lophoc += "<span class=\"city\"><i class=\"fa fa-map-marker\"></i>" + location + "</span>";
		element_lophoc += "<span class=\"sallary\"><i class=\"fa fa-dollar\"></i>" + cost + "</span>";
		element_lophoc += "</div> </a>";
		console.log(image_giasu);		
		return element_lophoc;
	}

	function insertInformationElementSuit(image_background, image_giasu, title, location, cost, description, unique_id) {
		var element_lophoc = "<a href=\"#\" onclick=\"getCourseDetail('"+ unique_id +"')\" >";
		element_lophoc += "<img src=" + image_background + " alt=\"Featured Job\" class=\"img-responsive\" />";
		element_lophoc += "<div class=\"featured-job\"></div>";
		element_lophoc += "<img src=\""+ image_giasu + "\"" + " alt=\"\" class=\"img-circle pull-left\" />";
		element_lophoc += "<div class=\"title\">";
		element_lophoc += "<h5>"+ title +"</h5>";
		element_lophoc += "</div> <div class=\"data\">";
		element_lophoc += "<span class=\"city\"><i class=\"fa fa-map-marker\"></i>" + location + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "</span>";
		element_lophoc += "<span class=\"sallary\"><i class=\"fa fa-dollar\"></i>" + cost + "</span>";
		element_lophoc += "</div> <div class=\"description\">" + description + "</div>";
		element_lophoc += "</div> </a>";
		console.log(image_giasu);		
		return element_lophoc;
	}

});