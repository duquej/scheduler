package Hibernate;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import classes.User;
import classes.Event;
import classes.EventHasUser;


/**Configures Hibernate with the configured settings and annotations in the classes package. */
public class HibernateUtil {
    private static SessionFactory sessionFactory;
     
    /**Initializes a Hibernate session with the configured settings if it has not yet been done so, otherwise, it
     * returns the current session. 
     *  */
    public static SessionFactory getSessionFactory() {
    	try {
	        if (sessionFactory == null) {
	            // loads configuration and mappings
	            Configuration configuration = new Configuration().addAnnotatedClass(User.class).addAnnotatedClass(Event.class).addAnnotatedClass(EventHasUser.class).configure("hibernate.cfg.xml");
	            ServiceRegistry serviceRegistry
	                = new StandardServiceRegistryBuilder()
	                    .applySettings(configuration.getProperties()).build();
	             
	            // builds a session factory from the service registry
	            sessionFactory = configuration.buildSessionFactory(serviceRegistry);           
	        }
    	} catch (Exception e) {
    		e.printStackTrace();
    		
    	}    
    	
        return sessionFactory;
    }
}
