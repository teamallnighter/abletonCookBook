const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const comments_reviews = sequelize.define(
    'comments_reviews',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

content: {
        type: DataTypes.TEXT,

      },

rating: {
        type: DataTypes.DECIMAL,

      },

timestamp: {
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

  comments_reviews.associate = (db) => {

    db.comments_reviews.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.comments_reviews.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return comments_reviews;
};

