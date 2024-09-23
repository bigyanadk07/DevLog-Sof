const express = require('express');
const router = express.Router();
const Devlog = require('../models/devModel');

// CREATE devlog
router.post('/', async (req, res) => {
    const { title, date, changes, tags } = req.body;
    try {
        const newDevlog = new Devlog({ title, date, changes, tags });
        await newDevlog.save();
        res.status(201).json(newDevlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all devlogs
router.get('/', async (req, res) => {
    try {
        const devlogs = await Devlog.find();
        res.json(devlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE devlog
router.delete('/:id', async (req, res) => {
    try {
        await Devlog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Devlog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
