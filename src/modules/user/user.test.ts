import request from "supertest";
import app from "../../../app"
import {expect} from "chai";
import {
  initializeDatabase,
  ValidUserForSigningUp,
  teardown,
  VerifiedUser,
  NotVerifiedUser
} from "../../test/user-helper";

before(function (done) {
  initializeDatabase().then(() => {
    done()
  }).catch((err) => {
    done(err)
  })
});

after(function (done) {
  teardown().then(() => {
    done()
  }).catch((err) => {
    done(err)
  })
})

describe("User APIs Testing", function () {
  it("Should signup a new user.", function (done) {
    request(app)
      .post("/api/v1/users/signup")
      .send(ValidUserForSigningUp)
      .timeout(5000)
      .expect(
        201
      ).end(done);
  });

  it("Should not signup with existing user.", function (done) {
    request(app)
      .post("/api/v1/users/signup")
      .send({
        email: VerifiedUser.email,
        "password": "123456",
        "passwordConfirmation": "123456"
      })
      .timeout(5000)
      .expect(
        400
      ).end(done);
  });

  it("Should login to account.", function (done) {
    request(app)
      .post("/api/v1/users/login")
      .send({email: VerifiedUser.email, password: VerifiedUser.password})
      .expect(
        200,
      ).expect(function (res) {
      expect(res.body.data).to.not.equal({
        email: VerifiedUser.email,
        password: VerifiedUser.password,
        isVerified: true
      });

    }).end(done);
  });

  it("Should not login to unverified account.", function (done) {
    request(app)
      .post("/api/v1/users/login")
      .send({email: NotVerifiedUser.email, password: NotVerifiedUser.password})
      .expect(
        400,
      ).end(done);
  });
})