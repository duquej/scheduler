package Servlets;

import java.io.IOException;
import java.util.Date;

import Services.UserAccountService;
import classes.UserAccount;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class auth
 */
@WebServlet("/auth")
public class auth extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public auth() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String logoutCheck = request.getParameter("signin");
		if (logoutCheck.equals("1")) {
			
			UserAccountService service = new UserAccountService();
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			UserAccount userValidated = service.validateUser(username, password);
			
			if (userValidated != null) {
				System.out.println("Sign In Successfull!");
				
				HttpSession oldSession = request.getSession(false);
	            if (oldSession != null) {
	                oldSession.invalidate();
	            }
				
	            HttpSession newSession = request.getSession(true);

	            //setting session to expiry in 5 mins
	            newSession.setMaxInactiveInterval(5*60);

	            Cookie message = new Cookie("message", "success");
	            response.addCookie(message);
	            response.setStatus(HttpServletResponse.SC_OK);
	            response.sendRedirect("index2.html");
				
			    //request.getSession().setAttribute("loggedIn", "true");
			    
			    
			    
			    
			} else {
				//tell home page incorrect login.
	            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				System.out.println("Sign In Failure!!");

				
			}
		} else {
			System.out.println("deleting cookies");
			
			HttpSession session = request.getSession(false);
			System.out.println(session == null);
		    if(session != null){
		    	
		    	 
		        //session.invalidate();
		        Cookie[] cookies = request.getCookies();
		        System.out.println("cookie length: "+cookies.length);
		        if (cookies != null) { // Yes, this can return null! The for loop would otherwise throw NPE.
		        	
		            for (Cookie cookie : cookies) {
		            	
		            	System.out.println(cookie.getName());
		                if (cookie.getName().equals("message")) {
		                	System.out.println("cookie wanted founed");
		                    cookie.setMaxAge(0);
		                    response.addCookie(cookie);
		             
		                    break;
		                 }
		             }
		         }
		        
		        response.sendRedirect("index2.html");

		     }			
			
			
		}
		
	}

}
