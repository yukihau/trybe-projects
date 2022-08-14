import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { validCarToCreate, createdValidCar } from '../../../mocks';
import CarModel from '../../../models/CarModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('/car - Testando o Model', () => {
  const model = new CarModel();

  describe('ao chamar a função "create" de model', () => {
    before(async () => {
      sinon.stub(model, 'create').resolves(createdValidCar);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const result = await model.create(validCarToCreate);
      expect(result).to.be.an('object');
    });

    it('o objeto contém a propriedade "_id"', async () => {
      const result = await model.create(validCarToCreate);
      expect(result).to.have.property('_id');
    });

    it('o resto do objeto tem os mesmos valores do que o corpo passado', async () => {
      const result = await model.create(validCarToCreate);
      expect(result).to.be.deep.equal(createdValidCar);
    });
  });
});
