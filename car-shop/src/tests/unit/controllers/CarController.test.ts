// import * as sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import CarModel from '../../../models/CarModel';
// import server from '../../../server';
// import { validCarToCreate, invalidCarToCreate, createdValidCar } from '../../../mocks/';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('/car - Testando o Controller', () => {
//   const model = new CarModel();
//   const app = server.getApp();

//   describe('na rota POST em "/car"', () => {
//     describe('enviando uma requisição válida', async () => {
//       before(async () => {
//         sinon.stub(model, 'create').resolves(createdValidCar);
//       });

//       after(() => {
//         sinon.restore();
//       });

//       it('retorna o status 201', async () => {
//         const chaiHttpResponse = await chai
//           .request(server.getApp())
//           .post('/cars')
//           .send(validCarToCreate);
//         expect(chaiHttpResponse).to.have.status(201);
//       });
//     });

//     describe('enviando uma requisição inválida', async () => {
//       before(async () => {
//         sinon.stub(model, 'create').resolves(invalidCarToCreate);
//       });
//       after(() => {
//         sinon.restore();
//       });

//       it('retorna o status 400', async () => {
//         const chaiHttpResponse = await chai
//           .request(app)
//           .post('/cars')
//           .send(invalidCarToCreate);
//         expect(chaiHttpResponse).to.have.status(400);
//       });
//     });

//     describe('enviando uma requisição sem body', async () => {
//       before(async () => {
//         sinon.stub(model, 'create').resolves();
//       });
//       after(() => {
//         sinon.restore();
//       });

//       it('retorna o status 400', async () => {
//         const chaiHttpResponse = await chai.request(app).post('/cars').send();
//         expect(chaiHttpResponse).to.have.status(400);
//       });
//     });
//   });

//   describe('na rota GET em "/cars"', () => {
//     describe('enviando uma requisição válida', async () => {
//       before(async () => {
//         sinon.stub(model, 'read').resolves([]);
//       });

//       after(() => {
//         sinon.restore();
//       });

//       it('retorna o status 201', async () => {
//         const chaiHttpResponse = await chai.request(app).get('/cars');
//         expect(chaiHttpResponse).to.have.status(201);
//       });

//       it('retorna um array', async () => {
//         const chaiHttpResponse = await chai.request(app).get('/cars');
//         expect(chaiHttpResponse).to.be.an('array');
//       });

//       it('o array está vazio', async () => {
//         const chaiHttpResponse = await chai.request(app).get('/cars');
//         expect(chaiHttpResponse).to.be.empty;
//       });
//     });
//   });
// });
