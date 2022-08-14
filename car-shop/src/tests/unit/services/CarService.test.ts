import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import {
  validCarToCreate,
  createdValidCar,
  invalidCarToCreate,
  validUpdate,
  updatedValidCar,
} from '../../../mocks';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';

chai.use(chaiHttp);

const { expect } = chai;

describe('/car - Testando o Service', () => {
  const model = new CarModel();
  const service = new CarService(model);

  describe('ao chamar a função "create" de service', () => {
    describe('com um objeto válido', () => {
      before(async () => {
        sinon.stub(model, 'create').resolves(createdValidCar);
      });

      after(() => {
        sinon.restore();
      });

      it('retorna um objeto', async () => {
        const result = await service.create(validCarToCreate);
        expect(result).to.be.an('object');
      });

      it('o objeto contém a propriedade "_id"', async () => {
        const result = await service.create(validCarToCreate);
        expect(result).to.have.property('_id');
      });

      it('o resto do objeto tem os mesmos valores do que o corpo passado', async () => {
        const result = await service.create(validCarToCreate);
        expect(result).to.be.deep.equal(createdValidCar);
      });
    });

    describe('com um objeto inválido', () => {
      before(async () => {
        sinon.stub(model, 'create').resolves();
      });
  
      after(() => {
        sinon.restore();
      });

      it('retorna um objeto', async () => {
        const result = await service.create(invalidCarToCreate);
        expect(result).to.be.an('object');
      });

      it('o objeto contém o parametro "error"', async () => {
        const result = await service.create(invalidCarToCreate);
        expect(result).to.have.property('error');
      });
    });
  });

  describe('ao chamar a função "update" de service', () => {
    describe('com os parâmetros corretos válido', () => {
      before(async () => {
        sinon.stub(model, 'update').resolves(updatedValidCar);
      });

      after(() => {
        sinon.restore();
      });

      it('retorna um objeto', async () => {
        const result = await service.update(validUpdate.id, validUpdate.obj);
        expect(result).to.be.an('object');
      });

      it('o resto do objeto tem os mesmos valores do que o corpo passado', async () => {
        const result = await service.update(validUpdate.id, validUpdate.obj);
        expect(result).to.be.deep.equal(updatedValidCar);
      });
    });
  });
});
