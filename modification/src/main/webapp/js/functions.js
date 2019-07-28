/**
 * 
 */
var eventDetails;
var event;
var users = [];
var status;

$(document).ready(function(){
    var date_input=$('input[name="begindate"]'); 
    var date_input2=$('input[name="enddate"]'); 

    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
      format: 'yyyy/mm/dd',
      container: container,
      todayHighlight: false,
      autoclose: true,
    };
    date_input.datepicker(options);
    date_input2.datepicker(options);
    
    
   
})
$( document ).ready(function(){
	$('#queryDate').change(function() {
	    var date = $(this).val();
		document.getElementById("queryDate").value = date;
		$("#users > tbody").empty();
		status = 1;
		users= [];
        clearData();
		onLaunch();

	});
	
	
});


$( document ).ready(function(){
	$('#submit-event').click(function(event){
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
	});
	
	
	
	
});

$( document ).ready(function(){
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
		        
		        clearData();
		        onLaunch();
				

		    },
		    error: function(data){
		    	alert($("#formEvent").serialize()+"&createEvent=1");
		    	
		    }
		});
	});
	
	
	
	
});

$( document ).ready(function(){
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
	
	
	
	
});

$( document ).ready(function(){
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
	
	
	
	
});

$( document ).ready(function(){
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
	
	
	
	
});

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

	
	//TODO: FIX LOADING DATES. 
    

	
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	newdate = year + "-0" + month + "-" + day;
	document.getElementById("queryDate").value = newdate
	status = 0;

	
	
	
	onLaunch();
});

function clearData(){
	users= [];
	$("#users > tbody").empty();
	eventname.innerText = "Event: No event.";
	eventdates.innerText = "Dates: ";
	eventDetails=null;
    $('#deleteEventButton').hide()
    $('#addUserButton').hide()

    

}
function onLaunch(){
	

	loadEventData();
	
	
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

function eventFormValidation(){
	var status=0;
	
//	formEventName
	
	
	
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
	//$('#myEdit').show();
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



