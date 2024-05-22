const express = require('express');
const router = express.Router();
const { createMatter, updateMatter, deleteMatter } = require('../../controllers/matterControllers');

router.post('/matters', createMatter);
router.put('/matters/:id', updateMatter);
router.delete('/matters/:id', deleteMatter);

module.exports = router;