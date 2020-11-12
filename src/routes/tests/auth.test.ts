import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import { assert } from "console";

import { createHash } from "crypto";
import app from "../../../index";
import { User } from "../../models/user";

chai.use(chaiHttp);

describe("Auth", () => {
  beforeEach(function () {
    return new Promise(async function (resolve) {
      await User.create({
        username: "johndoe",
        firstname: "john",
        lastname: "doe",
        email: "john.doe@domain.tld",
        password: createHash("sha256").update("password321").digest("base64"),
      });

      await User.destroy({
        where: {
          email: "mary.jane@domain.tld",
        },
      });

      resolve();
    });
  });

  describe("Login", () => {
    it("should login with test user", (done) => {
      const correctUserLoginCredentials = {
        email: "john.doe@domain.tld",
        password: "password321",
      };

      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(correctUserLoginCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.message.should.be.eql("User Login");
          res.body.data.should.have.property("token");
          done();
        });
    });
  });

  describe("Register", function () {
    it("should register with test user details", (done) => {
      const testUserCredentials = {
        firstname: "Mary",
        lastname: "Jane",
        email: "mary.jane@domain.tld",
        password: "password@123",
        confirmPassword: "password@123",
        username: "maryjane",
      };

      chai
        .request(app)
        .post("/api/v1/auth/register")
        .send(testUserCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.message.should.be.eql("Created User");
          res.body.data.should.have.property("createdUser");
          res.body.data.createdUser.email.should.eql(testUserCredentials.email);
          res.body.data.createdUser.password.should.not.eql(testUserCredentials.password);
          res.body.data.createdUser.should.have.property("uuid");
          done();
        });
    });
  });
});
