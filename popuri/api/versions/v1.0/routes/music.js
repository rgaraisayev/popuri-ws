const router = require('express').Router();
// const router = require('express-promise-router')();
const MusicController = require('../controllers/music');
// const FilterController = require('../controllers/filters');
// const AuthMiddle = require('../../../general/middlewares/auth');

router.route('/filter')
    .get(MusicController.filteredMusics);

router.route('/next')
    .get(MusicController.nextMusic)
router.route('/next/force')
    .get(MusicController.nextMusicForced)
router.route('/userInfo')
    .get(MusicController.userInfo)

router.route('/')
    .get(MusicController.insertMusicsToDb)

module.exports = router;