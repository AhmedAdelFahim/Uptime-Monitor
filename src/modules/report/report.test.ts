import request from "supertest";
import app from "../../../app"

import {UnauthorizedUserToken, VerifiedUserToken} from "../../test/user-helper";
import {getURL, URLInserted, URLToDeleted, URLToInsert, URLToUpdated} from "../../test/url-helper";
import {expect} from "chai";
import {URL, URLToGetReportByTag} from "../../test/report-helper";

describe("Report APIs Testing", function () {
  it("Should get report by id.", function (done) {
    request(app)
      .post("/api/v1/reports")
      .set({"authorization": `Bearer ${VerifiedUserToken}`})
      .send({id: URL._id})
      .expect(
        200
      ).expect(function (res) {
        expect(res.body.data).deep.contains({
          uptime: 540,
          downtime: 180,
          outages: 1,
          availability: 75,
          responseTime:4
        })
    }).end(done);

  });

  it("Should get report by tag.", function (done) {
    request(app)
      .post("/api/v1/reports")
      .set({"authorization": `Bearer ${VerifiedUserToken}`})
      .send({tag: URLToGetReportByTag.tags[0]})
      .expect(
        200
      ).expect(function (res) {
      expect(res.body.data).deep.contains({
        uptime: 10800,
        downtime: 10800,
        outages: 1,
        availability: 50,
        responseTime:2.5
      })
    }).end(done);

  });

})

