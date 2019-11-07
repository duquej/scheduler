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
	        console.log(data);
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