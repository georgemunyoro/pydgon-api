import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

import { User } from '../../models/user';

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /", () => {
    beforeEach(function(): Promise<void> {
      return new Promise(async function (resolve) {
        await User.sync();
        resolve();
      });
    });

    // Test to get all users
    it("should get all users", (done) => {
      chai.request(app).get('/api/v1/users').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
  });
});
