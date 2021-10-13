const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// const { requireAuth } = require("../utils")

const { csrfProtection, asyncHandler } = require('../../utils/general');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get(
	'/:id(\\d+)',
	asyncHandler(async (req, res, next) => {
		const user_Id = req.params.id;

		const note = await db.Notes.findAll({where: {"userId":user_Id}});
	return res.json(note)
	})
);

router.post(
	'/',
	csrfProtection,
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { title, contents } = req.body;
		const userId = req.user.id;
		console.log(userId)

		const validatorErrors = validationResult(req);
		if (validatorErrors.isEmpty()) {

			const newNote = await db.Notes.create({
				userId: userId,
                // noteBooksId,
                title,
                contents
			});
			return res.json({
				newNote,
			});
        }
	})
);

router.delete(
	'/:id(\\d+)',
	asyncHandler(async (req, res, next) => {
		const findnote = await db.Note.findByPk(req.params.id);
		console.log("77777777777777777777777777777",findnote)
		if (findnote) {
			const note = await findnote.destroy();
			res.status(204).end();
		} else {
			next();
		}
	})
);


module.exports = router;
