import supertest from 'supertest'
import { Express } from 'express-serve-static-core'
import { createHash } from 'crypto'

import { User } from '../../models/user'

import app from '../../../index'

const request = supertest(app)


describe("Auth", () => {
  beforeAll(async () => {
	await User.sync({ alter: { drop: false } });
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

  });

  describe("Login", () => {
	test("Login successfullly with valid existing user", async () => {
	  const correctUserLoginCredentials = {
		email: "john.doe@domain.tld",
		password: "password321",
	  };

	  const res = await request.post("/api/v1/auth/login").send(correctUserLoginCredentials)
	  expect(res.status).toBe(200)
	  expect(Object.keys(res.body.data)).toContain("token")
	});

	test("Fail login with incorrect password", async () => {
	  const incorrectUserLoginCredentials = {
		email: "john.doe@domain.tld",
		password: "incorrectPassword",
	  };

	  const res = await request.post("/api/v1/auth/login").send(incorrectUserLoginCredentials)
	  expect(res.status).toBe(200)
	  expect(Object.keys(res.body.data)).toContain("errors")
	});
  });

  // 
  //   describe("Register", () => {
  //     it("should register with test user details", (done) => {
  //       const testUserCredentials = {
  //         firstname: "Mary",
  //         lastname: "Jane",
  //         email: "mary.jane@domain.tld",
  //         password: "password@123",
  //         confirmPassword: "password@123",
  //         username: "maryjane",
  //       };
  // 
  //       chai
  //         .request(app)
  //         .post("/api/v1/auth/register")
  //         .send(testUserCredentials)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a("object");
  //           res.body.message.should.be.eql("Created User");
  //           res.body.data.should.have.property("createdUser");
  //           res.body.data.createdUser.email.should.eql(testUserCredentials.email);
  //           res.body.data.createdUser.password.should.not.eql(testUserCredentials.password);
  //           res.body.data.createdUser.should.have.property("uuid");
  //           done();
  //         });
  //     });
  //   });
});

