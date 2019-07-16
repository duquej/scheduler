package Services;

import DAO.EventDAO;
import classes.Event;

public class EventService {
	
	private EventDAO dao;
	
	public EventService() {
		dao = new EventDAO();
	}
	
	public Event addEvent(Event t) {
		return dao.saveOrUpdate(t);
	}
	
	public Event updateEvent(Event t) {
		return addEvent(t);
	}


}
