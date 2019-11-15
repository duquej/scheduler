function loginHandler(){
	
	
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
				        
				    	
				        
				        //resetEventsTable();
				        //onPageLoad();
				    	window.location.href = "event.html";

						
		
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

function signInButtonLogic(){
	
	$('#signin-navbar').click(function(event){
		if (!isLoggedIn()){
			$('#login-test').modal('show');
		} else {
			console.log("calling logout post")
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
			    	window.location.href = "event.html";

					
	
			    },
			    error: function(data){
	
			    	 $("#failure-alert-event").fadeIn("slow",function(){
				            setTimeout(function(){
				              $("#failure-alert-event").fadeOut("slow");
				            },4000);
				          });
			    	
			    	
			    }
			});
			
			
		}

		
		
		
		
		
	})
	
	
	
}

function initializeSignInButton(){
	 if(!isLoggedIn()){
	    	$("#myToast").toast('show');
		    $('#addEvent').hide()

	    } else {
	    	document.getElementById('signin-navbar').innerHTML = "Sign Out"
	    	$('#addEvent').show()

	    	
	    }
	    
	
}