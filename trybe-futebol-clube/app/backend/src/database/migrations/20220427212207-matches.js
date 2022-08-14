'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      home_team: Sequelize.INTEGER,
      home_team_goals: Sequelize.INTEGER,
      away_team: Sequelize.INTEGER,
      away_team_goals: Sequelize.INTEGER,
      in_progress: Sequelize.BOOLEAN
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
