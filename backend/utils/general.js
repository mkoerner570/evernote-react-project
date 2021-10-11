const csrfProtection = csrf({ cookie: true });
const db = require('./db/models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { User, Note, Notebook } = require('./db/models');

const asyncHandler = (handler) => (req, res, next) =>
	handler(req, res, next).catch(next);

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


const noteBuilder = async (id, title) => {
        const toolbox = await db.Note.create({
            user_id: id,
            name: title,
        });
        return toolbox;
};


async function searchNotes(box) {
	const results = await Notes.findAll({
		where: {
			description: {
				[Op.iLike]: `%${box}%`,
			},
		},
		include: {
			model: Notebook,
		},
	});
	return results;
}
