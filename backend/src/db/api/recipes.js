
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class RecipesDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const recipes = await db.recipes.create(
            {
                id: data.id || undefined,

        title: data.title
        ||
        null
            ,

        description: data.description
        ||
        null
            ,

        genre: data.genre
        ||
        null
            ,

        difficulty_level: data.difficulty_level
        ||
        null
            ,

        upload_date: data.upload_date
        ||
        null
            ,

        rating: data.rating
        ||
        null
            ,

        download_count: data.download_count
        ||
        null
            ,

        license_type: data.license_type
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return recipes;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const recipesData = data.map((item, index) => ({
                id: item.id || undefined,

                title: item.title
            ||
            null
            ,

                description: item.description
            ||
            null
            ,

                genre: item.genre
            ||
            null
            ,

                difficulty_level: item.difficulty_level
            ||
            null
            ,

                upload_date: item.upload_date
            ||
            null
            ,

                rating: item.rating
            ||
            null
            ,

                download_count: item.download_count
            ||
            null
            ,

                license_type: item.license_type
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const recipes = await db.recipes.bulkCreate(recipesData, { transaction });

        return recipes;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const recipes = await db.recipes.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.title !== undefined) updatePayload.title = data.title;

        if (data.description !== undefined) updatePayload.description = data.description;

        if (data.genre !== undefined) updatePayload.genre = data.genre;

        if (data.difficulty_level !== undefined) updatePayload.difficulty_level = data.difficulty_level;

        if (data.upload_date !== undefined) updatePayload.upload_date = data.upload_date;

        if (data.rating !== undefined) updatePayload.rating = data.rating;

        if (data.download_count !== undefined) updatePayload.download_count = data.download_count;

        if (data.license_type !== undefined) updatePayload.license_type = data.license_type;

        updatePayload.updatedById = currentUser.id;

        await recipes.update(updatePayload, {transaction});

        return recipes;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const recipes = await db.recipes.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of recipes) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of recipes) {
                await record.destroy({transaction});
            }
        });

        return recipes;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const recipes = await db.recipes.findByPk(id, options);

        await recipes.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await recipes.destroy({
            transaction
        });

        return recipes;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const recipes = await db.recipes.findOne(
            { where },
            { transaction },
        );

        if (!recipes) {
            return recipes;
        }

        const output = recipes.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.title) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'recipes',
                            'title',
                            filter.title,
                        ),
                    };
                }

                if (filter.description) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'recipes',
                            'description',
                            filter.description,
                        ),
                    };
                }

            if (filter.upload_dateRange) {
                const [start, end] = filter.upload_dateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    upload_date: {
                    ...where.upload_date,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    upload_date: {
                    ...where.upload_date,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.ratingRange) {
                const [start, end] = filter.ratingRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    rating: {
                    ...where.rating,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    rating: {
                    ...where.rating,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.download_countRange) {
                const [start, end] = filter.download_countRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    download_count: {
                    ...where.download_count,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    download_count: {
                    ...where.download_count,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.genre) {
                where = {
                    ...where,
                genre: filter.genre,
            };
            }

            if (filter.difficulty_level) {
                where = {
                    ...where,
                difficulty_level: filter.difficulty_level,
            };
            }

            if (filter.license_type) {
                where = {
                    ...where,
                license_type: filter.license_type,
            };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.recipes.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'recipes',
                        'title',
                        query,
                    ),
                ],
            };
        }

        const records = await db.recipes.findAll({
            attributes: [ 'id', 'title' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['title', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.title,
        }));
    }

};

