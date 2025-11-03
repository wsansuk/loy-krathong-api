const express = require('express');
const router = express.Router();
const { createKrathong, getKrathongs } = require('../controllers/krathong.controller');

router.post('/krathong', createKrathong);
router.get('/krathong', getKrathongs);

module.exports = router;
