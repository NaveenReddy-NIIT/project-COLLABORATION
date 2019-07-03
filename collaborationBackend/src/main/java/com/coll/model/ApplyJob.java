package com.coll.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class ApplyJob {

    @Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="applyjobid")
	@SequenceGenerator(name="applyjobid",allocationSize=1,sequenceName="applyjobid_seq")
	private int applyJobId;
	private int jobId;
	private String username;
	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

}
