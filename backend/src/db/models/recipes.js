const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const recipes = sequelize.define(
    'recipes',
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

genre: {
        type: DataTypes.ENUM,

        values: [

"Electronic",

"HipHop",

"Rock",

"Jazz",

"Classical"

        ],

      },

difficulty_level: {
        type: DataTypes.ENUM,

        values: [

"Beginner",

"Intermediate",

"Advanced"

        ],

      },

upload_date: {
        type: DataTypes.DATE,

      },

rating: {
        type: DataTypes.DECIMAL,

      },

download_count: {
        type: DataTypes.INTEGER,

      },

license_type: {
        type: DataTypes.ENUM,

        values: [

"CreativeCommons",

"Commercial",

"Personal"

        ],

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

  recipes.associate = (db) => {

    db.recipes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.recipes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return recipes;
};

