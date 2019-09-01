package classes;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "events")
public class Event implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "event_name")
	private String name;

	@Column(name = "begin_date")
	private Date beginDate;
	
	@Column(name = "end_date")
	private Date endDate;

	
	@ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)  
	@JoinTable(name="events_has_users", joinColumns= {@JoinColumn(name ="events_id")}, inverseJoinColumns = { @JoinColumn(name = "users_id") })
	private List<User> users;

	public Date getEndDate() {
		return endDate;
	}

	
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	
	public List<User> getUsers() {
		return users;
	}

	
	public void setUsers(List<User> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", name=" + name + ", beginDate=" + beginDate + ", endDate=" + endDate + ", users="
				+ "user" + "]";
	}
	 

	public Event() {

	}
	

	public int getId() {
		return id;
	}

	
	public void setId(int id) {
		this.id = id;
	}

	
	public String getName() {
		return name;
	}

	
	public void setName(String name) {
		this.name = name;
	}

	
	public Date getBeginDate() {
		return beginDate;
	}

	
	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}
}


