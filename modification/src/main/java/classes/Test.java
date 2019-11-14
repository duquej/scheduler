package classes;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import DAO.EventDAO;
import DAO.UserAccountDAO;
import DAO.UserDAO;

public class Test {
	
	   
	   @SuppressWarnings("deprecation")
	public static void main(String[] args) {
		   //UserDAO dao = new UserDAO();
		   UserAccountDAO dao = new UserAccountDAO();
		   		   	
		   System.out.println(dao.findUser("admin").get(0).getUsername());
		  
		   
		   
		   
	      
	   

	   }

}
