package DAO;


import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import Hibernate.HibernateUtil;
import classes.Event;
import classes.User;

public class EventDAO extends GenericHibernateDAO<Event, Integer>{
	
    
    /**Returns the event for the selected date if one exists. 
     * @returns Returns a list of events.
     * @param A valid date in the format "YYYY-MM-DD" */
	public List <Event> getEventByDate(String date) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From Event where "+date+" between beginDate and endDate").list();
        }
    }
    

	/**Returns the most recent event.
	 * @returns Returns a list of events. */
	public List<Event> findMostRecent() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("From Event ORDER BY beginDate DESC").setMaxResults(1).list();
        }
    }
    
	
    /**Searches and returns events that match the given event parameter.
     * @param must be a valid string.
     * @returns Returns a list of events.
     *  */
    public List<Event> findEventByName(String event){
    	try (Session session = HibernateUtil.getSessionFactory().openSession()) {
    		System.out.println("From Event WHERE name LIKE '%"+event+"%'");
            return session.createQuery("From Event WHERE name LIKE '%"+event+"%'").list();
        }
    		
    }
    
    
    /**Deletes the event with the given unique ID
     * @param must be an int type */
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
