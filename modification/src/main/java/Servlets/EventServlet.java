package Servlets;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DAO.EventDAO;
import DAO.UserDAO;
import classes.Event;
import classes.User;

/**
 * Servlet implementation class EventServlet
 */
@WebServlet("/EventServlet")
public class EventServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private EventDAO eventDAO;
	private UserDAO userDAO;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EventServlet() {
        super();
        eventDAO = new EventDAO();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//List<Event> events = eventDAO.getEvents();
		
		String date = request.getParameter("date");
		String parsedDate = "'"+date+"'";
		
		List<Event> events = eventDAO.getEventByDate(parsedDate);
		
		
		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(events);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);;
		
		
		
		
		
		
		
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Event> events = eventDAO.findAll();
		
		
		if (request.getParameter("createEvent").equals("1")) {
			String name = request.getParameter("eventname");
			String startDate = request.getParameter("begindate");
			String endDate = request.getParameter("enddate");
			
			startDate= startDate.replace("/", "-");
			endDate = endDate.replace("/", "-");
			Date parsedStart=Date.valueOf(startDate);
			Date parsedEnd = Date.valueOf(endDate);
					   
			Event event = new Event();
			event.setBeginDate(parsedStart);
			event.setEndDate(parsedEnd);
			event.setName(name);
			
			eventDAO.saveOrUpdate(event);
			
			
			
		} else if (request.getParameter("addUser").equals("1")) {
			String eventID = request.getParameter("eventID");
			String name = request.getParameter("name");
			String phone = request.getParameter("phonenumber");
			String status = request.getParameter("status");
			Event event = null;
			int stat= 0;

			
			for (int i =0; i < events.size(); i++) {
				if (events.get(i).getId() == Integer.parseInt(eventID)) {
					event = events.get(i);
					
				}
				
			}
						
			if (status.equals("Going")) {
				stat = 0;
				
			} else if (status.equals("Not Going")) {
				stat = 1;
				
			} else if (status.equals("Maybe")) {
				stat = 2;
				
			} else if (status.equals("Unknown")) {
				stat = 3;
				
			}
			
			User user = new User();
			user.setName(name);
			user.setPhoneNumber(phone);
			user.setStatus(stat);
			event.getUsers().add(user);
			
			eventDAO.saveOrUpdate(event);
			
			
			
			
		} else if(request.getParameter("deleteEvent").equals("1")) {
			
			
			
		}
	}

}
