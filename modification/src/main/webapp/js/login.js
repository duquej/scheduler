var registrationValidator;

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
				    	//window.location.href = "event.html";
				        location.reload();

						
		
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
			    	//window.location.href = "event.html";
			    	location.reload();

					
	
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

function validatorInitalizer(){
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
}

function formRegistrationValidator(){
	validatorInitalizer()
	
	registrationValidator = $("#registration").validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            newemail: {
                required: true
            },
            newpwd:  {
                required: true,
                minlength: 3
            }
        },

        // Specify the validation error messages
        messages: {
        	name: {
                required: "Please provide an event name",
                minlength: "Your name must be at least 3 characters long"
            },
            newemail: {
                required: "Please provide an email"
            },
            newpwd: {
                required: "Please provide a password",
                minlength: "Must be at least 3 letters long"
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
	
	
}


function registrationHandler(){
	formRegistrationValidator();
	
	
	$('#register-button').click(function(event){
		if($("#registration").valid()){
			$.ajax({
			    type:"POST",
			    url: "RegistrationServlet",
			    data: $("#registration").serialize() ,
			    success: function(data){
			        $('#login-register').click()
			        
			        $("#success-register").fadeIn("slow",function(){
			            setTimeout(function(){
			              $("#success-register").fadeOut("slow");
			            },4000);
			          });
	
					
	
			    },
			    error: function(data){
			    	$('#login-register').click()
			    		            
	
			    	$("#failure-register").fadeIn("slow",function(){
			            setTimeout(function(){
			              $("#failure-register").fadeOut("slow");
			            },4000);
			          });
			    	
			    	
			    }
			});
		}
	});
	
	
}