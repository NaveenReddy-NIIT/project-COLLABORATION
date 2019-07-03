package com.coll.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.coll.model.ApplyJob;

@Repository("applyJobDAO")
@Transactional
public class ApplyJobDAOImpl implements ApplyJobDAO {
	@Autowired 
	SessionFactory sessionFactory;

	@Override
	public boolean addApplyJob(ApplyJob applyJob) {
		
		try {
			sessionFactory.getCurrentSession().save(applyJob);
			return true;
		}
		catch(Exception e) {
		return false;
		}
	}


	@Override
	public List<ApplyJob> getApplyJobs(String username) {

		Session session=sessionFactory.openSession();
		Query query=session.createQuery("from ApplyJob where username=:uname");
		query.setParameter("uname",username);
		List<ApplyJob> listApplyJobs=query.list();
	    return listApplyJobs;
	}

}
