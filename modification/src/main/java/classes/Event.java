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

	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}

	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * @return the users
	 */
	public List<User> getUsers() {
		return users;
	}

	/**
	 * @param users the users to set
	 */
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

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the beginDate
	 */
	public Date getBeginDate() {
		return beginDate;
	}

	/**
	 * @param beginDate the beginDate to set
	 */
	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}
}


