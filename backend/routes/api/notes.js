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
		const noteId = req.params.id;

		const note = await db.Notes.findByPk(noteId, { include: { model: db.Notebooks } });

		let notebooks;

		let userId;
		if (req.user.id) {
			userId = req.user.id;

			notebooks = await db.Notebooks.findAll({
				where: {
					userId,
				},
				include: db.Note,
			});
		} else {
			notebooks = [];
		}

	// 	let inToolbox = false;
	// 	let toolboxId;
	// 	let toolboxName;

	// 	for (const box of toolboxes) {
	// 		if (!inToolbox) {
	// 			const apis = box.Apis;
	// 			for (const api of apis) {
	// 				if (!inToolbox) {
	// 					if (api.id === Number(api_id)) {
	// 						inToolbox = true;
	// 						toolboxId = box.id;
	// 						toolboxName = box.name;
	// 						break;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}

	// 	const toolboxInfo = { inToolbox, toolboxId, toolboxName };

	// 	const reviews = await db.Review.findAll({
	// 		where: {
	// 			api_id,
	// 		},
	// 		order: [['updatedAt', 'DESC']],
	// 		include: { model: db.User },
	// 	});

	// 	const avgNumber = await reviewAvgRating(api_id);

	// 	if (api) {
	// 		return res.render('api', {
	// 			title: `Ace API - ${api.name}`,
	// 			api,
	// 			toolboxes,
	// 			avgRating: avgNumber,
	// 			reviews,
	// 			user_id,
	// 			toolboxInfo,
	// 		});
	// 	} else {
	// 		next();
	// 	}
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


module.exports = router;
