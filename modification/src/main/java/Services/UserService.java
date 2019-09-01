package Services;

import java.util.List;

import DAO.UserDAO;
import classes.User;

public class UserService {
	
	public UserDAO getDAO() {
		return new UserDAO();
	}
	
	public User addUser(User t) {
		return getDAO().saveOrUpdate(t);
	}
	
	public User updateUser(User t) {
		return addUser(t);
	}
	
	public void delete(int id) {
		getDAO().delete(id);
	}

	public List<User> findAll() {
		return getDAO().findAll();
	}
}
