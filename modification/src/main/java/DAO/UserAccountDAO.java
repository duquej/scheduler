package DAO;

import java.util.List;

import org.hibernate.Session;

import Hibernate.HibernateUtil;
import classes.Event;
import classes.UserAccount;

public class UserAccountDAO extends GenericHibernateDAO<UserAccount, Integer>{
	 public List<UserAccount> findUser(String username){
	    	try (Session session = HibernateUtil.getSessionFactory().openSession()) {
	            return session.createQuery("From UserAccount WHERE username LIKE '%"+username+"%'").list();
	        }
	    		
	    }

}
