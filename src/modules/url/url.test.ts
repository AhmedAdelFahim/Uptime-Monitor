import request from "supertest";
import app from "../../../app"

import { UnauthorizedUserToken, VerifiedUserToken} from "../../test/user-helper";
import {getURL, URLInserted, URLToDeleted, URLToInsert, URLToUpdated} from "../../test/url-helper";
import {expect} from "chai";
import {buildRequestConfig} from "./url.service";

describe("URL APIs Testing", function () {
  it("Should create url.", function (done) {
    request(app)
      .post("/api/v1/urls")
      .set({"authorization": `Bearer ${VerifiedUserToken}`})
      .send(URLToInsert)
      .expect(
        201
      ).end(done);
  });

  it("Should update url.", function (done) {
    request(app)
      .put(`/api/v1/urls/${URLToUpdated._id}`)
      .set({"authorization": `Bearer ${VerifiedUserToken}`})
      .send({...URLToUpdated.data, name: "url-4"})
      .expect(
        200
      ).expect(function (res) {
      return getURL(URLToUpdated._id)
        .then((url: any) => {
          expect(url.name).equal("url-4");
        }).catch(done)
    }).end(done);

  });

  it("Should delete url.", function (done) {
    request(app)
      .delete(`/api/v1/urls/${URLToDeleted._id}`)
      .set({"authorization": `Bearer ${VerifiedUserToken}`})
      .expect(
        200
      ).expect(function (res) {
      return getURL(URLToDeleted._id)
        .then((url: any) => {
          expect(url).equal(null);
        }).catch(done)
    }).end(done);
  });

  it("Should not delete url, owned by other users.", function (done) {
    request(app)
      .delete(`/api/v1/urls/${URLToDeleted._id}`)
      .set({"authorization": `Bearer ${UnauthorizedUserToken}`})
      .expect(
        404
      ).end(done);
  });
})

describe("Test url services", function () {
  it("Should prepare request configuration.", function (done) {
    getURL(URLInserted._id)
      .then((url: any) => {
        expect(buildRequestConfig(url)).deep.contains({
          method: 'get',
          url: "https://google.com/",
          timeout: url.timeout * 1000,
          headers: {
            ...url.httpHeaders
          },
        })

        done()

      }).catch(done)
  });


})