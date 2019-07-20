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
		   test.setName("Bean Cook Out");
		   
		   User user = new User();
		   user.setName("Jorge");
		   user.setPhoneNumber("781-555-555");
		   user.setStatus(1);
		   
		   User user1 = new User();
		   user1.setName("Terris");
		   user1.setPhoneNumber("781-555-555");
		   user1.setStatus(0);
		   
		   User user2 = new User();
		   user2.setName("Reina");
		   user2.setPhoneNumber("781-555-555");
		   user2.setStatus(2);
		   
		   List<User> users = new ArrayList();
		   List<Event> events = new ArrayList();
		   users.add(user);
		   users.add(user1);
		   users.add(user2);
		   
		   events.add(test);
		   
		   
		  // user.setEvents(events);
		   test.setUsers(users);
		   
		   dao.saveOrUpdate(test);
		   
		   //System.out.println(dao.getEvents());
		   
	      
	   

	   }

}
