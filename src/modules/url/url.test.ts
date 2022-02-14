import request from "supertest";
import app from "../../../app"

import {token} from "../../test/user-helper";
import {URLToInsert} from "../../test/url-helper";


describe("URL APIs Testing", function () {
  it("Should create url.", function (done) {
    request(app)
      .post("/api/v1/urls")
      .set({"authorization": `Bearer ${token}`})
      .send(URLToInsert)
      .expect(
        201
      ).end(done);
  });
})