'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Notes', [
        {
        userId:1,
        noteBookId:1,
        title: "Example Note",
        contents: "Testing, testing, testing, testing"
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notes', null, {});
  }
};
