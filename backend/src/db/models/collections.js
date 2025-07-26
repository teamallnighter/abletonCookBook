const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const collections = sequelize.define(
    'collections',
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

is_featured: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

creation_date: {
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

  collections.associate = (db) => {

    db.collections.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.collections.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return collections;
};

