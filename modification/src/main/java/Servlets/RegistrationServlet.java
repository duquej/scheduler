package Servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Services.UserAccountService;
import classes.UserAccount;

/**
 * Servlet implementation class RegistrationServlet
 */
@WebServlet("/RegistrationServlet")
public class RegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegistrationServlet() {
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
		UserAccountService service = new UserAccountService();
		UserAccount user = new UserAccount ();
		String username = request.getParameter("username");
		String password = request.getParameter("newpwd");
		String email = request.getParameter("newemail");
		
		List<UserAccount> users = service.findUser(username);
		if (!users.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		} else {
			
			user.setEmail(email);
			user.setPassword(password);
			user.setUsername(username);
			service.addUser(user);
		}
		
		
	}

}
