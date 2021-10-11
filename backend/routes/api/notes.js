const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// const { requireAuth } = require("../utils")

const { csrfProtection, asyncHandler } = require('../../utils/general');
const db = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	csrfProtection,
	asyncHandler(async (req,res,next) => {
		return res.json({
			user,
		})
	})
)

router.post(
	'/',
	csrfProtection,
	// errorValidators,
	asyncHandler(async (req, res, next) => {
		const { title, contents } = req.body;
		const { userId } = req.session.auth;

		const validatorErrors = validationResult(req);
		if (validatorErrors.isEmpty()) {
			const newNote = await db.Note.create({
				user_id: userId,
                noteBooksId,
                title,
                contents
			});
			return res.json({
				user,
			});
        }
	})
);


module.exports = router;
