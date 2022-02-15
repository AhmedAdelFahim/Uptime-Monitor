import {getURL, URLInserted} from "../../test/url-helper";
import JobScheduler from "./job-scheduler";
import {expect} from "chai";
import {convertIntervalToCronFormat} from "./job-helper";


describe("Job Scheduler Testing", function () {
  it("Should add job to queue and remove it", function (done) {
    getURL(URLInserted._id)
      .then((url:any)=>{
      return JobScheduler.addJob(url);
    }).then((job)=>{
      expect(job?.opts?.repeat?.jobId).equal(URLInserted._id)
      return JobScheduler.removeJob(URLInserted._id);
    }).then((job)=>{
      expect(job?.id).equal(URLInserted._id)
      done()
    }).catch(done)
  });

  it("Should format interval", function (done) {
    expect(convertIntervalToCronFormat("01m")).equal("*/1 * * * *");
    done()
  });

})