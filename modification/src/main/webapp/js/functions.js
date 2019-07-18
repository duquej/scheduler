/**
 * 
 */

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
	loadEventData();
	
	
}

function loadEventData(){
		
	$.ajax({
	    type:"GET",
	    url: "EventServlet",
	    data:"date="+document.getElementById("queryDate").value ,
	    success: function(data){
	        console.log(data);
	    }
	});
	
	
}

function defaultLoad(){
	
	
	
}
