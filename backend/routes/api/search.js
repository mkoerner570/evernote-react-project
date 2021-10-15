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
		const noteTitle = req.params.id;
		console.log("&&&&&&&&",note_id)

		const note = await db.Notes.findAll({where: {"title":noteTitle}});
		console.log("***********",note)
	return res.json(note)
	})
);

module.exports = router;
