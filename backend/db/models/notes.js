'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    userId: DataTypes.INTEGER,
    noteBookId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    contents: DataTypes.TEXT
  }, {});
  Notes.associate = function(models) {
    // associations can be defined here
    Notes.belongsTo(models.User, {foreignKey: "userId"})
    Notes.belongsTo(models.Notebook, {foreignKey: "userId"})
  };
  return Notes;
};
