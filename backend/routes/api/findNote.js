const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// const { requireAuth } = require("../utils")

const { csrfProtection, asyncHandler } = require('../../utils/general');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get(
	'/:id',
	asyncHandler(async (req, res, next) => {
		const note_Id = req.params.id;

		const note = await db.Notes.findAll({where: {"noteBookId":note_Id}});
	return res.json(note)
	})
);

module.exports = router;
