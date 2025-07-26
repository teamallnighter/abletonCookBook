module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'recipes',
                        'genre',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'categories',
                      'parentId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'categories',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'categories',
                        'parentId',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'recipes',
                      'genre',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Electronic','HipHop','Rock','Jazz','Classical'],

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
