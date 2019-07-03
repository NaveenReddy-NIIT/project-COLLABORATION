package com.coll.daotest;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.coll.dao.ApplyJobDAO;
import com.coll.model.ApplyJob;

public class ApplyJobDAOTest {
static ApplyJobDAO applyJobDAO;
	
	@BeforeClass
	public static void executefirst() {
		AnnotationConfigApplicationContext context=new AnnotationConfigApplicationContext();
		context.scan("com.coll");
		context.refresh();
		applyJobDAO=(ApplyJobDAO)context.getBean("applyJobDAO");
	}
	
	@Test
	public void addapplyjobtest() {
		ApplyJob applyJob=new ApplyJob();
		applyJob.setJobId(501);
		applyJob.setUsername("naveen");
		assertTrue("problem in adding blog",applyJobDAO.addApplyJob(applyJob));
	}
	
	@Test
	public void listblogtest() {
		List<ApplyJob> listApplyJobs=applyJobDAO.getApplyJobs("naveen");
		for(ApplyJob applyJob:listApplyJobs) {
			System.out.println("id:"+applyJob.getJobId());
		}
	}
}
