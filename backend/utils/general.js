const csrf = require("csurf")
const csrfProtection = csrf({ cookie: true });
const db = require('../db/models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { User, Note, Notebook } = require('../db/models');


const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


const noteBuilder = async (id, name) => {
        const toolbox = await db.Notebook.create({
            userId: id,
            title: name,
        });
        return toolbox;
};


async function searchNotes(box) {
	const results = await Note.findAll({
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


module.exports = {
    csrfProtection,
    asyncHandler,
    noteBuilder,
    searchNotes
}
