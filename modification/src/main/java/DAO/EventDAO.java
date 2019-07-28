package DAO;


import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
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
    
    @SuppressWarnings("unchecked")
	public List <Event> getEventByDate(String date) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From Event where "+date+" between beginDate and endDate").list();
        }
    }
    
    public List<Event> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From Event").list();
        }
    }
    //SELECT * FROM   scheduler.events ORDER  BY begin_date DESC LIMIT  1;
    @SuppressWarnings("unchecked")
	public List<Event> findMostRecent() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From Event ORDER BY beginDate DESC").setMaxResults(1).list();
        }
    }
    
    public void delete(int id) {
    	Transaction tx= null;
    	try {
	    	Session session;
	        Event event;
	
	        session = HibernateUtil.getSessionFactory().getCurrentSession();
    		tx = session.beginTransaction();
    		
    		Query q = session.createQuery("DELETE FROM EventHasUser WHERE event="+ id);
    		q.executeUpdate();
    		Query a = session.createQuery("delete from Event where id="+id);
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
    
}
