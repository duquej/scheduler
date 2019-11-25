package Services;

import java.util.List;

import DAO.UserAccountDAO;
import classes.Event;
import classes.UserAccount;

public class UserAccountService {
	
	public UserAccountDAO getDAO() {
		return new UserAccountDAO();
	}
	
	public UserAccount validateUser(String username, String password) {
		List<UserAccount> matchedUsers = getDAO().findUser(username);
		if (!matchedUsers.isEmpty()) {
			UserAccount user = matchedUsers.get(0);
			if (user.getPassword().equals(password)) {
				return user;
			}
						
		} 
		return null;
		
		
	}
	
	public UserAccount addUser(UserAccount t) {
		return getDAO().saveOrUpdate(t);
	}
	
	public List<UserAccount> findUser(String user){
		return getDAO().findUser(user);
		
	}
	public List<UserAccount> findAll(){
		return getDAO().findAll();
	}

}
