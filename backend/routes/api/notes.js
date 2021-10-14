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
		const { title, contents, noteBookId } = req.body;
		const userId = req.user.id;

		const validatorErrors = validationResult(req);
		if (validatorErrors.isEmpty()) {

			const newNote = await db.Notes.create({
				userId: userId,
                noteBookId,
                title,
                contents
			});
			return res.json({
				newNote,
			});
        }
	})
);

router.put(
	`/:id(\\d+)`,
	csrfProtection,
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { id, title, contents } = req.body;

		const noteId = req.params.id;
		const editedNote = await db.Notes.findByPk(noteId);
		if (editedNote) {
			editedNote.title = title;
			editedNote.contents = contents;

			await editedNote.save();

			return res;
		}
	})
);

router.delete(
	'/:id(\\d+)',
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const noteId = req.params.id;
		const findnote = await db.Notes.findByPk(noteId);
		if (findnote) {
			const note = await findnote.destroy();
			res.status(204).end();
		} else {
			next();
		}
	})
);


module.exports = router;
