import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';
import { Response } from 'superagent';
import { IMappedMatchObject } from '../interfaces/matches';

const MATCH_FINISH_SUCCESS = 'Match has been successfully finished';
const MATCH_UPDATE_SUCCESS = 'Match has been successfully updated';

chai.use(chaiHttp);

describe('3. Testando a rota "/matches"', () => {
  describe('ao fazer um GET no endpoint "/matches"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
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

    it('os itens do array tem as propriedades "id" e "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals", "inProgress", "teamHome" e "teamAway"', () => {
      expect(chaiHttpResponse.body[0]).to.include.all.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
        'teamHome',
        'teamAway'
      );
    });
  });

  describe('ao fazer um GET no endpoint "/matches" com a query "?inProgress=true', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: true });
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

    it('os itens do array tem as propriedades "id" e "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals", "inProgress", "teamHome" e "teamAway"', () => {
      expect(chaiHttpResponse.body[0]).to.include.all.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
        'teamHome',
        'teamAway'
      );
    });

    it('as chaves "inProgress" dos itens do array são iguais à "true"', () => {
      const inProgressValuesAreAllTrue = Object.values(
        chaiHttpResponse.body.map(
          (match: IMappedMatchObject) => match.inProgress
        )
      ).filter((value) => value !== true);
      expect(inProgressValuesAreAllTrue).to.deep.equal([]);
    });
  });
});

describe('ao fazer um GET no endpoint "/matches" com a query "?inProgress=false', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({ inProgress: false });
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

  it('os itens do array tem as propriedades "id" e "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals", "inProgress", "teamHome" e "teamAway"', () => {
    expect(chaiHttpResponse.body[0]).to.include.all.keys(
      'id',
      'homeTeam',
      'homeTeamGoals',
      'awayTeam',
      'awayTeamGoals',
      'inProgress',
      'teamHome',
      'teamAway'
    );
  });

  it('as chaves "inProgress" dos itens do array são iguais à "false"', () => {
    const inProgressValuesAreAllTrue = Object.values(
      chaiHttpResponse.body.map((match: IMappedMatchObject) => match.inProgress)
    ).filter((value) => value !== false);
    expect(inProgressValuesAreAllTrue).to.deep.equal([]);
  });

  describe('ao fazer um POST no endpoint "/matches"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      });
    });

    it('retorna o status 201', () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('o objeto tem as propriedades "id" e "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals" e "inProgress"', () => {
      expect(chaiHttpResponse.body).to.include.all.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress'
      );
    });
  });

  describe('ao fazer um PATCH no endpoint "/matches/:id/finish"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
    });

    it('retorna o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('o objeto tem a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.include.keys('message');
    });

    it('a mensagem contém a string correta', () => {
      expect(chaiHttpResponse.body.message).to.be.equals(MATCH_FINISH_SUCCESS);
    });
  });

  describe('ao fazer um PATCH no endpoint "/matches/:id"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1').send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      });
    });

    it('retorna o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('o objeto tem a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.include.keys('message');
    });

    it('a mensagem contém a string correta', () => {
      expect(chaiHttpResponse.body.message).to.be.equals(MATCH_UPDATE_SUCCESS);
    });
  });
});
