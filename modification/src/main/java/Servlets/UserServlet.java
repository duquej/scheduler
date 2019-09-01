package Servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import DAO.UserDAO;
import Services.UserService;
import classes.Event;
import classes.User;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private UserService service;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserServlet() {
        super();
        service = new UserService();
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
		List<User> users = service.findAll();
		if (request.getParameter("deleteUser").equals("1")) {
			service.delete(Integer.parseInt(request.getParameter("userID")));
		} else if (request.getParameter("editUser").equals("1")) {
			Integer userid = Integer.parseInt(request.getParameter("userID"));
			String name = request.getParameter("editname");
			String phone = request.getParameter("editphone");
			String status = request.getParameter("editstatus");
			int stat = 0;
			
			if (status.equals("Going")) {
				stat = 0;
				
			} else if (status.equals("Not Going")) {
				stat = 1;
				
			} else if (status.equals("Maybe")) {
				stat = 2;
				
			} else if (status.equals("Unknown")) {
				stat = 3;
				
			}
			
			User user = null;
			for(int i=0; i < users.size(); i++) {
				if (users.get(i).getId() == userid) {
					user = users.get(i);
					
				}
			}
			
			user.setName(name);;
			user.setPhoneNumber(phone);
			user.setStatus(stat);
			
			service.updateUser(user);
			
			
			
			
			
		}

	}

}
