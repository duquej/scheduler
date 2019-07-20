/**
 * 
 */
var eventDetails;
var event;
var users = [];

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
		    },
		    error: function(data){
		    	alert($("#formEvent").serialize()+"&createEvent=1");
		    	
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


		    },
		    error: function(data){
		    	alert($("#formUser").serialize()+"&createEvent=1&addUser=1");
		    	
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
	
	
	
});

$( document ).ready(function() {
	
	//TODO: FIX LOADING DATES. 
    

	
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	newdate = year + "-0" + month + "-" + day;
	document.getElementById("queryDate").value = newdate
	
	
	
	onLaunch();
});


function onLaunch(){
	$('#success-alert-event').hide()
    $('#success-alert-user').hide()

	loadEventData();
	
	
}

function loadEventData(){
	
	document.getElementById("queryDate").value = "2019-07-16";
		
	$.ajax({
	    type:"GET",
	    url: "EventServlet",
	    data:"date="+document.getElementById("queryDate").value ,
	    success: function(data){
	        console.log(data);
	        defaultLoad(data);
	        event = data;
	        document.getElementById("eventID").value = event[0].id
	        
	    }
	});
	
	
}

function defaultLoad(data){

	
	$.each(data, function(i, event ) {
		

		eventDetails = {name:event.name, 
				beginDate: event.beginDate,
				endDate: event.endDate}
				
		
		$.each(event.users, function(inc, user){
			
			
			
			users[inc] = {name: user.name, 
					status: user.status, 
					phonenumber: user.phoneNumber}			
			
			
		});
		
		
		
		  
		});
	
	imageDisplayControl(users, event)
	
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
		
		eventname.innerText = "Event Name: "+ eventName;

		
		
		$('#users tr:last').after('<tr><td align="left"> <img src="'+imgsrc+'" align="texttop" alt="IN" width="14" height="14" title="reserve" onclick="">'
				+name+"</td> <td align='left'>"+status+"</td> <td align='left'>"+ phone+"</td></tr>");
				
	}
	
	
}



