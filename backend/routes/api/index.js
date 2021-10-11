const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const notesRouter = require('./notes')

const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth")
const { requireAuth } = require("../../utils/auth")

router.use('/session',sessionRouter);
router.use('/users', usersRouter);
router.use('/NotesForm',notesRouter);

// router.post('/test',(req,res) => {
//     res.json({requestBody:req.body});
// })

// //GET /set-token-cookie test
// router.get('/set-token-cookie', asyncHandler(async (req,res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         },
//     })
//     setTokenCookie(res,user);
//     return res.json({user})
// }))

// //GET /api/restore-user test
// router.get(
//     '/restore-user',
//     restoreUser,
//     (req,res) => {
//         return res.json(req.user)
//     }
// );

// //GET /api/require-auth test
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req,res) => {
//         return res.json(req,user)
//     }
// )

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
