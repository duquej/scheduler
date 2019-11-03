function loadSearchResults(data){
	
	document.getElementById("resultsnum").innerText = data.length + " Events found";
	

	for (var i =0; i < data.length; i++){
		console.log(data[i].name);
		var eventName = data[i].name;
		var beginDate = data[i].beginDate;
		var endDate = data[i].endDate;
		var id = data[i].id;
		
		
		
		$('#events > tbody').append('<tr><td align="left">'
				+eventName+"</td> <td align='left'>"+beginDate+"</td> <td align='left'>"+ endDate+"</td>  <td align='left'> <button type='button' class='btn btn-info btn-sm' onclick='Javascript: loadEvent("+id+");'>View</button></td></tr>");
				
	}
	
	
}

function clearSearchResults(){
	
}

function eventLoad(id){
	
}

