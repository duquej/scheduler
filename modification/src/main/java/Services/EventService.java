package Services;

import java.util.List;

import DAO.EventDAO;
import classes.Event;

public class EventService {

	public EventDAO getDAO() {
		return new EventDAO();
	}
	
	
	public Event addEvent(Event t) {
		return getDAO().saveOrUpdate(t);
	}
	
	
	public Event updateEvent(Event t) {
		return addEvent(t);
	}
	
	
	public void delete(int id) {
		getDAO().delete(id);
	}
	
	
	public List<Event> getEventByDate(String date) {
		return getDAO().getEventByDate(date);
	}
	
	
	public List<Event> findMostRecent(){
		return getDAO().findMostRecent();
	}
	
	
	public List<Event> findEventByName(String event){
		return getDAO().findEventByName(event);
	}
	
	
	public List<Event> findAll(){
		return getDAO().findAll();
	}
	
	

}
