const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');

const { csrfProtection, asyncHandler } = require('../utils');
const db = require('../db/models');

const router = express.Router();


router.post(
	'/',
	csrfProtection,
	errorValidators,
	asyncHandler(async (req, res, next) => {
		const {  } = req.body;
		const { userId } = req.session.auth;

		const validatorErrors = validationResult(req);
		if (validatorErrors.isEmpty()) {
			const newNote = await db.Note.create({
				user_id: userId,
                noteBooksId,
                title,
                contents
			});
			return res.redirect(``);
        }
		// } else {
		// 	const api = await db.Api.findByPk(api_id);
		// 	const errors = validatorErrors.array().map((error) => error.msg);
		// 	res.render('reviews', {
		// 		title: 'AceAPI Submit Review',
		// 		csrfToken: req.csrfToken(),
		// 		api,
		// 		errors,
		// 	});
		// }
	})
);
