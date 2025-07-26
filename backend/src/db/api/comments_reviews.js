
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Comments_reviewsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const comments_reviews = await db.comments_reviews.create(
            {
                id: data.id || undefined,

        content: data.content
        ||
        null
            ,

        rating: data.rating
        ||
        null
            ,

        timestamp: data.timestamp
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return comments_reviews;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const comments_reviewsData = data.map((item, index) => ({
                id: item.id || undefined,

                content: item.content
            ||
            null
            ,

                rating: item.rating
            ||
            null
            ,

                timestamp: item.timestamp
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const comments_reviews = await db.comments_reviews.bulkCreate(comments_reviewsData, { transaction });

        return comments_reviews;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const comments_reviews = await db.comments_reviews.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.content !== undefined) updatePayload.content = data.content;

        if (data.rating !== undefined) updatePayload.rating = data.rating;

        if (data.timestamp !== undefined) updatePayload.timestamp = data.timestamp;

        updatePayload.updatedById = currentUser.id;

        await comments_reviews.update(updatePayload, {transaction});

        return comments_reviews;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const comments_reviews = await db.comments_reviews.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of comments_reviews) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of comments_reviews) {
                await record.destroy({transaction});
            }
        });

        return comments_reviews;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const comments_reviews = await db.comments_reviews.findByPk(id, options);

        await comments_reviews.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await comments_reviews.destroy({
            transaction
        });

        return comments_reviews;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const comments_reviews = await db.comments_reviews.findOne(
            { where },
            { transaction },
        );

        if (!comments_reviews) {
            return comments_reviews;
        }

        const output = comments_reviews.get({plain: true});

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

                if (filter.content) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'comments_reviews',
                            'content',
                            filter.content,
                        ),
                    };
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

            if (filter.timestampRange) {
                const [start, end] = filter.timestampRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    timestamp: {
                    ...where.timestamp,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    timestamp: {
                    ...where.timestamp,
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
            const { rows, count } = await db.comments_reviews.findAndCountAll(queryOptions);

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
                        'comments_reviews',
                        'content',
                        query,
                    ),
                ],
            };
        }

        const records = await db.comments_reviews.findAll({
            attributes: [ 'id', 'content' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['content', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.content,
        }));
    }

};

