import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

describe('2. Testando a rota "/teams"', () => {
  describe('ao fazer um GET no endpoint "/teams"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
    });

    it('retorna o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('retorna um array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('o array contém objetos dentro', () => {
      expect(chaiHttpResponse.body[0]).to.be.an('object');
    });

    it('os itens do array tem as propriedades "id" e "teamName"', () => {
      expect(chaiHttpResponse.body[0]).to.include.all.keys('id', 'teamName');
    });

		describe('ao fazer um GET no endpoint "/teams/:id"', () => {
			let chaiHttpResponse: Response;
	
			before(async () => {
				chaiHttpResponse = await chai.request(app).get('/teams/1');
			});
	
			it('retorna o status 200', () => {
				expect(chaiHttpResponse).to.have.status(200);
			});
	
			it('retorna um objeto', () => {
				expect(chaiHttpResponse.body).to.be.an('object');
			});
	
			it('o objeto tem as propriedades "id" e "teamName"', () => {
				expect(chaiHttpResponse.body).to.include.all.keys('id', 'teamName');
			});
		});
  });
});
