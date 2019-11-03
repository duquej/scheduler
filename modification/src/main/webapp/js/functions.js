/**
 * 
 */
var eventDetails;
var event;
var users = [];
var status;
var eventValidator;

$(document).ready(function(){
    var date_input=$('input[name="begindate"]'); 
    var date_input2=$('input[name="enddate"]'); 
    var bs_query=$('input[name="bsQuery"]');

    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
      format: 'yyyy/mm/dd',
      container: container,
      todayHighlight: false,
      autoclose: true,
    };

    
    bs_query.datepicker(options);
    date_input.datepicker(options);
    date_input2.datepicker(options);
    
    $('#queryDate').datepicker().on('changeDate', function(e) {
		var date = $(this).val();
		document.getElementById("queryDate").value = date;
		$("#users > tbody").empty();
		status = 1;
		users= [];
        clearData();
		onLaunch();
	    
	});
    
    
	$('#submit-event').click(function(event){
		
		if($("#formEvent").valid()){
			$.ajax({
			    type:"POST",
			    url: "EventServlet",
			    data: $("#formEvent").serialize()+"&createEvent=1" ,
			    success: function(data){
			        $('#myModal').click()
	
			    	 $("#success-alert-event").fadeIn("slow",function(){
				            setTimeout(function(){
				              $("#success-alert-event").fadeOut("slow");
				            },4000);
				          });
			        
			        clearData();
			        onLaunch();
					
	
			    },
			    error: function(data){
			    	$('#myModal').click()
	
			    	 $("#failure-alert-event").fadeIn("slow",function(){
				            setTimeout(function(){
				              $("#failure-alert-event").fadeOut("slow");
				            },4000);
				          });
			    	
			    	
			    }
			});
		}
	});
	
	$('#submit-delete-event').click(function(event){
		$.ajax({
		    type:"POST",
		    url: "EventServlet",
		    data: $("#formEvent").serialize()+"&createEvent=0&addUser=0&deleteEvent=1&eventId="+eventDetails.id,
		    success: function(data){
		        $('#deleteEvent').click()

		    	 $("#success-alert-event-delete").fadeIn("slow",function(){
			            setTimeout(function(){
			              $("#success-alert-event-delete").fadeOut("slow");
			            },4000);
			          });
		        
		        window.location.href = "index.html";
		        
		        //clearData();
		        //onLaunch();
				

		    },
		    error: function(data){
		    	alert($("#formEvent").serialize()+"&createEvent=1");
		    	
		    }
		});
	});
	
	$('#submit-edit').click(function(event){
		$.ajax({
		    type:"POST",
		    url: "UserServlet",
		    data: $("#formEdit").serialize()+"&deleteUser=0&editUser=1" ,
		    success: function(data){
		        $('#myEdit').click()

		    	 $("#success-alert-user-edit").fadeIn("slow",function(){
			            setTimeout(function(){
			              $("#success-alert-user-edit").fadeOut("slow");
			            },4000);
			          });
		        
		        clearData();
		        onLaunch();
				

		    },
		    error: function(data){
		    	alert($("#formEvent").serialize()+"&deleteUser=0&editUser=1");
		    	
		    }
		});
	});
	
	$('#submit-user').click(function(event){
		$.ajax({
		    type:"POST",
		    url: "EventServlet",
		    data: $("#formUser").serialize()+"&createEvent=0&addUser=1" ,
		    success: function(data){
		        $('#myUser').click()
		        //$('#success-alert-user').show()
		        $("#success-alert-user").fadeIn("slow",function(){
		            setTimeout(function(){
		              $("#success-alert-user").fadeOut("slow");
		            },4000);
		          });
		        
		        clearData();
		        onLaunch();


		    },
		    error: function(data){
		    	alert($("#formUser").serialize()+"&createEvent=0&addUser=1");
		    	
		    }
		});
	});
	
	$('#submit-delete').click(function(event){
			
			$.ajax({
			    type:"POST",
			    url: "UserServlet",
			    data: $("#formEdit").serialize()+"&deleteUser=1" ,
			    success: function(data){
			        $('#myEdit').click()
	
			        $("#success-alert-user-delete").fadeIn("slow",function(){
			            setTimeout(function(){
			              $("#success-alert-user-delete").fadeOut("slow");
			            },4000);
			          });
			        
			        
			        clearData();
			        onLaunch();
	
	
			    },
			    error: function(data){
			    	alert($("#formEdit").serialize()+"&deleteUser=1");
			    	
			    }
			});
		});
	
	
    
    
    
    
    
    
    
   
})



$( document ).ready(function(){
	
	$("#1drop").click(function () {
		  $("#dropDownStatus").text($(this).text());
	        document.getElementById("status").value = $(this).text();
	});	
	
	$("#2drop").click(function () {
		  $("#dropDownStatus").text($(this).text());
	      document.getElementById("status").value = $(this).text();

		  });	
	$("#3drop").click(function () {
		  $("#dropDownStatus").text($(this).text());
	       document.getElementById("status").value = $(this).text();

		  });	
	$("#4drop").click(function () {
		  $("#dropDownStatus").text($(this).text());
	       document.getElementById("status").value = $(this).text();

		  });	
	
	$("#5drop").click(function () {
		  $("#editUserDropDown").text($(this).text());
	       document.getElementById("editstatus").value = $(this).text();

		  });
	$("#6drop").click(function () {
		  $("#editUserDropDown").text($(this).text());
	       document.getElementById("editstatus").value = $(this).text();

		  });
	$("#7drop").click(function () {
		  $("#editUserDropDown").text($(this).text());
	       document.getElementById("editstatus").value = $(this).text();

		  });
	$("#8drop").click(function () {
		  $("#editUserDropDown").text($(this).text());
	       document.getElementById("editstatus").value = $(this).text();

		  });
	
	
	
});

$( document ).ready(function() {
	
    $('#deleteEventButton').hide()
    $('#addUserButton').hide()

	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	newdate = year + "-0" + month + "-" + day;
	bsDate = year + "/0" + month + "/" + day;
	document.getElementById("queryDate").value = bsDate;
	status = 0;

	jQuery.validator.setDefaults({
	    errorElement: 'span',
	    errorPlacement: function (error, element) {
	        error.addClass('invalid-feedback');
	        element.closest('.form-group').append(error);
	    },
	    highlight: function (element, errorClass, validClass) {
	        $(element).addClass('is-invalid');
	    },
	    unhighlight: function (element, errorClass, validClass) {
	        $(element).removeClass('is-invalid');
	    }
	});
	
	 eventValidator = $("#formEvent").validate({
	        rules: {
	            eventname: {
	                required: true,
	                minlength: 3
	            },
	            begindate: {
	                required: true,
	                date: true
	            },
	            enddate:  {
	                required: true,
	                date: true
	            }
	        },

	        // Specify the validation error messages
	        messages: {
	        	formEventName: {
	                required: "Please provide an event name",
	                minlength: "Your event name must be at least 3 characters long"
	            },
	            begindate: {
	                required: "Please provide a date",
	                date: "Must be a valid date"
	            },
	            enddate: {
	                required: "Please provide a date",
	                date: "Must be a valid date"
	            }
	        },
	        highlight: function (element, errorClass) {
	                $(element).closest('.form-control').addClass('has-error');
	                //$(element).addClass('has-error');
	            },
	            unhighlight: function (element, errorClass) {
	                $(element).closest(".form-control").removeClass("has-error");
	            },
	        

	    });
	 
	 $("#myModal").on("hidden.bs.modal", function () {
		    resetEventForm();
		});
	 
	 $("#eventSearch").on("submit", function(){
		 $.ajax({
			    type:"POST",
			    url: "EventServlet",
			    data: $("#eventSearch").serialize()+"&createEvent=0&addUser=0&eventSearch=1&deleteEvent=0" ,
			    success: function(data){
			    	window.location.href = "search.html";
			    	console.log(data);
			    	loadSearchResults(data);


			    },
			    error: function(data){
			    	alert($("#eventSearch").serialize()+"&eventSearch=1");
			    	
			    }
			});
		   return false;
		 })
	
		 
	
	var id=getUrlVars()["id"];
	loadEventById(id);
	
});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function clearData(){
	users= [];
	$("#users > tbody").empty();
	eventname.innerText = "No Event Scheduled";
	eventdates.innerText = " ";
	eventDetails=null;
    $('#deleteEventButton').hide()
    $('#addUserButton').hide()

    

}

function resetEventForm(){
	document.getElementById("formEvent").reset(); //native JS
	eventValidator.resetForm();
	$('.form-group').each(function () { $('#formEvent').removeClass('has-success'); });
	$('.form-group').each(function () { $('#formEvent').removeClass('has-error'); });
	$('.form-group').each(function () { $('#formEvent').removeClass('has-feedback'); });
	$('.help-block').each(function () { $('#formEvent').remove(); });
	$('.form-control-feedback').each(function () { $(this).remove(); });
	
}


function onLaunch(){
	
	console.log("onlaunch called");
	loadEventData();
	
	
}

function loadEventById(id){
	$.ajax({
	    type:"GET",
	    url: "EventServlet",
	    data:"date="+id +"&default="+6,
	    success: function(data){
	        defaultLoad(data);
	        event = data;
	        status=6
	        document.getElementById("queryDate").value = id
	        
	    }
	});
	
	
	
}

function loadEventData(){
	
		
	$.ajax({
	    type:"GET",
	    url: "EventServlet",
	    data:"date="+document.getElementById("queryDate").value +"&default="+status,
	    success: function(data){
	        console.log(data);
	        defaultLoad(data);
	        event = data;
	        
	    }
	});
	
	
}


function defaultLoad(data){

	
	$.each(data, function(i, event ) {
		
        document.getElementById("eventID").value = event.id
		eventDetails = {name:event.name, 
				beginDate: event.beginDate,
				endDate: event.endDate,
				id: event.id}
				
		
		$.each(event.users, function(inc, user){
			
			
			users[inc] = {name: user.name, 
					status: user.status, 
					phonenumber: user.phoneNumber,
					id: user.id}			
			
			
		});
		
        $('#deleteEventButton').show()
        $('#addUserButton').show()
        imageDisplayControl(users);
    	detailsDisplayControl();
		  
		});
	
	
}
function detailsDisplayControl(){
	eventname.innerText = "Event Name: "+ eventDetails.name;
	eventdates.innerText = "Dates: "+ eventDetails.beginDate +" to "+eventDetails.endDate;

	
}

function imageDisplayControl(data){
	
	for (var i =0; i < data.length; i++){
		var name = data[i].name;
		var phone = data[i].phonenumber
		var status;
		var imgsrc;
		var eventName = eventDetails.name;
		var beginDate = eventDetails.beginDate;
		var endDate = eventDetails.endDate;
		var id = data[i].id;
		
		if (data[i].status === 0 ) {
			status = "Going";
			imgsrc= "images/greenDot.png"
		} else if (data[i].status === 1) {
			status = "Not going";
			imgsrc = "images/redDot.jpg";
			
		} else if (data[i].status === 2) {
			status = "Maybe";
			imgsrc = "images/yellowDot.png"
		} else if (data[i].status === 3){
			status = "Unknown";
			imgsrc = "images/greyDot.png";
		}
		

		
		
		$('#users > tbody').append('<tr><td align="left"> <img src="'+imgsrc+'" align="texttop" alt="IN" width="14" height="14" title="reserve" onclick="">'
				+name+"</td> <td align='left'>"+status+"</td> <td align='left'>"+ phone+"</td>  <td align='left'> <button type='button' class='btn btn-info btn-sm' onclick='Javascript: userOptions("+id+");'>Edit</button></td></tr>");
				
	}
	
	
}

function userOptions(id){
	var user;
	
	for(var i=0; i<users.length; i++){
		if (users[i].id === id){
			user=users[i];
		}
	}
	console.log(user);
	

    document.getElementById("userID").value = id;
    document.getElementById("editstatus").value = user.status;
    document.getElementById("editphone").value = user.phonenumber;
    document.getElementById("editname").value = user.name;

    $('#myEdit').modal('show');
	
}



