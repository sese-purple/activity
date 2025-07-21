import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import { connectDB, disconnectDB } from '../database/database.js';
import Todo from '../models/todo.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Todo API', () => {
  before(async () => {
    await connectDB(); // Establish connection
  });

  beforeEach(async () => {
    await Todo.deleteMany({}); // Clean collection
  });

  after(async () => {
    await disconnectDB(); // Close connection
  });

  it('GET /home - should return welcome message', (done) => {
    chai.request(app)
      .get('/home')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});