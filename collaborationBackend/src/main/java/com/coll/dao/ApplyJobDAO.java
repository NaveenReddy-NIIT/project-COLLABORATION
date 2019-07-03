package com.coll.dao;

import java.util.List;

import com.coll.model.ApplyJob;

public interface ApplyJobDAO {

	public boolean addApplyJob(ApplyJob applyJob);
	public List<ApplyJob> getApplyJobs(String username);
}

