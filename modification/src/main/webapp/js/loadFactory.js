var events;

$( document ).ready(function() {
	
	
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
    $('#deleteEventButton').hide()
    $('#addUserButton').hide()
    

    authenticateUser();
    if(!isLoggedIn()){
    	$("#myToast").toast('show');
	    $('#addEvent').hide()

    } else {
    	document.getElementById('signin-navbar').innerHTML = "Sign Out"
    	$('#addEvent').show()

    	
    }
    
    
    $('.date-picker').each(function(){
        $(this).datepicker({
            templates:{
                leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
            }
        }).on('show', function() {
                $('.datepicker').addClass('open');

                datepicker_color = $(this).data('datepicker-color');
                if( datepicker_color.length != 0){
                    $('.datepicker').addClass('datepicker-'+ datepicker_color +'');
                }
            }).on('hide', function() {
                $('.datepicker').removeClass('open');
            });
    });
	
	$("#eventSearch").on("submit", function(){
		 $.ajax({
			    type:"POST",
			    url: "EventServlet",
			    data: $("#eventSearch").serialize()+"&createEvent=0&addUser=0&eventSearch=1&deleteEvent=0" ,
			    success: function(data){
			    	window.location.href = "search.html";
			    	//console.log(data);
			    	loadSearchResults(data);


			    },
			    error: function(data){
			    	alert($("#eventSearch").serialize()+"&eventSearch=1");
			    	
			    }
			});
		   return false;
		 })
	
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
				        
				        resetEventsTable();
				        onPageLoad();
						
		
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
		
	onPageLoad()
	
})

function onPageLoad(){
	$.ajax({
	    type:"GET",
	    url: "EventServlet",
	    data:"date="+"null" +"&default="+5,
	    success: function(data){
	        //console.log(data);
	        displayAllEvents(data);
	        events = data;
	        
	    }
	});
	
	
}

function displayEventById(id){
	window.location.href = "event.html?id="+id;
	
	
}

function resetEventsTable(){
	events= [];
	$("#users > tbody").empty();
	eventname.innerText = "0 Events";
    $('#deleteEventButton').hide()
    $('#addUserButton').hide()

    
	
	
}

function authenticateUser(){
	
	
	$('#signin-button').click(function(event){
		
		if (isLoggedIn()){
			
			console.log("calling is signing out....")
			$.ajax({
			    type:"POST",
			    url: "auth",
			    data: $("#signin").serialize()+"&signin=0" ,
			    success: function(data){
	
			    	console.log(data)
			    	 $("#success-alert-event").fadeIn("slow",function(){
				            setTimeout(function(){
				              $("#success-alert-event").fadeOut("slow");
				            },4000);
				          });
			        
			        //resetEventsTable();
			        //onPageLoad();
					
	
			    },
			    error: function(data){
	
			    	 $("#failure-alert-event").fadeIn("slow",function(){
				            setTimeout(function(){
				              $("#failure-alert-event").fadeOut("slow");
				            },4000);
				          });
			    	
			    	
			    }
			});
			
			
			
			
			
		} else {
			
			console.log("calling signing in...")
		
			if($("#signin").valid()){
				$.ajax({
				    type:"POST",
				    url: "auth",
				    data: $("#signin").serialize()+"&signin=1" ,
				    success: function(data){
				        $('#login-register').click()
				        
				    	
				        
				        resetEventsTable();
				        onPageLoad();
				    	window.location.href = "index2.html";

						
		
				    },
				    error: function(data){
				    	$('#login-register').click()
				    	
			             $(" <p style='color:red'> Login Failed. Please try again. </p>").insertAfter("checkbox-signin"); 
			            
		
				    	$("#failure-signin").fadeIn("slow",function(){
				            setTimeout(function(){
				              $("#failure-signin").fadeOut("slow");
				            },4000);
				          });
				    	
				    	
				    }
				});
			}
	}
	});
	
	
}

function isLoggedIn(){
    var dc = document.cookie;
    console.log(dc);
	if (dc != ""){
		console.log("signed in")
		return true
	} else {
    //show validation message
		console.log("not signed in.")
		return false
	}
	
	
}

function validateLoginData(){
	
	
}

function displayAllEvents(data){

	var totalEvents=0;
	$.each(data, function(i, event ) {
		
	        totalEvents=totalEvents+1;
	        var dates = ""+event.beginDate + " - "+ event.endDate;
					
	        $('#users > tbody').append('<tr><td align="left">'
	    			+event.name+"</td> <td align='left'>"+event.name+"</td> <td align='left'>"+ dates+"</td>  <td align='left'> <button type='button' class='btn btn-info btn-sm' onclick='Javascript: displayEventById("+event.id+");'>View</button></td></tr>");
	    		
	    	
		
			});
	eventname.innerText = totalEvents+" Events Found";
		
}