package DAO;


import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import Hibernate.HibernateUtil;
import classes.Event;
import classes.User;

public class UserDAO {
	
    public void saveUser(User user) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(user);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }
    @SuppressWarnings("unchecked")
	public List <User> getUsers() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From User").list();
        }
    }
    
    public User saveOrUpdate(User t) {
    	Transaction tx = null;
    	
    	try {
    		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
    		tx = session.beginTransaction();
    		session.saveOrUpdate(t);
    		tx.commit();
    		
    		
    	}catch(HibernateException e){
    		if (tx != null) 
    			tx.rollback();
    		
    		e.printStackTrace();
    		return null;
    		
    	}
		return t;
    	
    	
    }
    
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
    		
	        //user = session.load(User.class,id);
	        //session.delete(user);
	
	        //session.flush() ;
    	}catch(Exception e) {
    		if (tx != null) 
    			tx.rollback();
    		e.printStackTrace();
    		
    	}
    
    	
    }
    
    public List<User> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From User").list();
        }
    }
    
}
