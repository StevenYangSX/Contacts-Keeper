const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    get all users' contacts.
// @access  Private. 
router.get('/',(req, res) =>{
    res.send('Get all contacts.')
});

// @route   post api/contacts
// @desc    add new contacts
// @access  Private.
router.post('/',(req, res) =>{
    res.send('Add contact.')
});

// @route   post api/contacts/:id
// @desc    add new contacts
// @access  Private.
router.put('/:id',(req, res) =>{
    res.send('Update contact.')
});

// @route   Delete api/contacts/:id
// @desc    Delete  contacts
// @access  Private.
router.delete('/:id',(req, res) =>{
    res.send('Delete contact.')
});

module.exports = router;