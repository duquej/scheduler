package Services;

import DAO.UserDAO;
import classes.User;

public class UserService {
	
	private UserDAO dao;
	
	public UserService() {
		dao = new UserDAO();
		
	}
	
	public User addUser(User t) {
		return dao.saveOrUpdate(t);
	}
	
	public User updateUser(User t) {
		return addUser(t);
	}

}
