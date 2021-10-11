const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// const { requireAuth } = require("../utils")

const { csrfProtection, asyncHandler } = require('../../utils/general');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { userId, title, contents } = req.body;

		const validatorErrors = validationResult(req);
		if (validatorErrors.isEmpty()) {

			const newNote = await db.Notes.create({
				userId,
                // noteBooksId,
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
