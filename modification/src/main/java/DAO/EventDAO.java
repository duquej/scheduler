package DAO;


import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import Hibernate.HibernateUtil;
import classes.Event;
import classes.User;

public class EventDAO {
	
    public void saveEvent(Event event) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(event);
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
	public List <Event> getEvents() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From Event").list();
        }
    }
    
    public Event saveOrUpdate(Event t) {
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
    
    
}
