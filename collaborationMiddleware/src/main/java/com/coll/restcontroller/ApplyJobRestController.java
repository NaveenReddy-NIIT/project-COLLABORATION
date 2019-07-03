package com.coll.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coll.dao.ApplyJobDAO;
import com.coll.model.ApplyJob;


@RestController
public class ApplyJobRestController {


	@Autowired 
	ApplyJobDAO applyJobDAO;
	
	@GetMapping("/getApplyJobs/{username}") 
	public ResponseEntity<List<ApplyJob>> getApplyJobs(@PathVariable("username") String username) 
	{
		List<ApplyJob> listApplyJobs=applyJobDAO.getApplyJobs(username);
		if(listApplyJobs.size()>0) {
			return new ResponseEntity<List<ApplyJob>>(listApplyJobs,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<List<ApplyJob>>(listApplyJobs,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value="/addApplyJob",produces=MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> addApplyJob(@RequestBody ApplyJob applyJob)
	{
		if(applyJobDAO.addApplyJob(applyJob))
		{
			return new ResponseEntity<String>("Applying Job added",HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<String>("Error while adding applyjob",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
