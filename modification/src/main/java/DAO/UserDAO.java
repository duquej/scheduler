package DAO;


import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import Hibernate.HibernateUtil;
import classes.Event;
import classes.User;

public class UserDAO extends GenericHibernateDAO<User, Integer>{
	
    
    public void delete(int id) {
    	Transaction tx= null;
    	try {
	    	Session session;
	        User user;
	
	        session = HibernateUtil.getSessionFactory().getCurrentSession();
    		tx = session.beginTransaction();
    		
    		Query q = session.createQuery("DELETE FROM EventHasUser WHERE user="+ id);
    		q.executeUpdate();
    		Query a = session.createQuery("delete from User where id="+id);
    		a.executeUpdate();
    		
    		tx.commit();
    		
	        
    	}catch(Exception e) {
    		if (tx != null) 
    			tx.rollback();
    		e.printStackTrace();
    		
    	}
    
    	
    }
   
    
}
