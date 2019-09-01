package DAO;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import Hibernate.HibernateUtil;

/**
 * @author Jonathan Duque
 *  
 *  */
public abstract class GenericHibernateDAO<T, ID extends Serializable> {
	private Class<T> persistentClass;
	private Session session;
	
	@SuppressWarnings("unchecked")
	public GenericHibernateDAO() {
		this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}
	
	
	public Class<T> getPersistentClass(){
		return persistentClass;
	}
	
	
	public List<T> findAll() {
		List<T> objects = null;
		Transaction tx = null;
		
		try {
			session = HibernateUtil.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			Query query = session.createQuery("from "+ persistentClass.getName());
			objects = query.list();
			tx.commit();
			
		} catch (HibernateException e){
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			return null;
			
		} finally {
			
		}
		
		return objects;
	}
	
	
	public T saveOrUpdate(T entity) {
		Transaction tx = null;
		
		try {
			session = HibernateUtil.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			session.saveOrUpdate(entity);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			return null;
		} finally {
			
		}
		return entity;
	}
	
	
	
	

}
