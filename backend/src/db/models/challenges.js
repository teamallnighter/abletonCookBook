const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const challenges = sequelize.define(
    'challenges',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

title: {
        type: DataTypes.TEXT,

      },

description: {
        type: DataTypes.TEXT,

      },

theme: {
        type: DataTypes.TEXT,

      },

start_date: {
        type: DataTypes.DATE,

      },

end_date: {
        type: DataTypes.DATE,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  challenges.associate = (db) => {

    db.challenges.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.challenges.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return challenges;
};

