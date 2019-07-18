package classes;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import DAO.EventDAO;
import DAO.UserDAO;

public class Test {
	
	   
	   @SuppressWarnings("deprecation")
	public static void main(String[] args) {
		   //UserDAO dao = new UserDAO();
		   EventDAO dao = new EventDAO();
		   Event test = new Event();
		   test.setBeginDate(new Date(2019-10-03));
		   test.setEndDate(new Date(2019-10-03));
		   test.setName("bowling");
		   
		   User user = new User();
		   user.setName("zod");
		   user.setPhoneNumber("781");
		   
		   List<User> users = new ArrayList();
		   List<Event> events = new ArrayList();
		   users.add(user);
		   events.add(test);
		   
		   
		  // user.setEvents(events);
		   test.setUsers(users);
		   
		   dao.saveOrUpdate(test);
		   
		   //System.out.println(dao.getEvents());
		   
	      
	   

	   }

}
