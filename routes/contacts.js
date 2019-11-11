const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contacts');
// @route   GET api/contacts
// @desc    get all users' contacts.
// @access  Private. 
router.get('/', auth , async (req, res) =>{
    try {
        const contacts = await Contact.find({ user: req.user.id}).sort({ data: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   post api/contacts
// @desc    add new contacts
// @access  Private.
router.post('/',[auth,[
    check('name', 'Name is required').not().isEmpty(),
]], async (req, res) =>{
     //check if their is validaion errors using validationResult
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }

     const {name, email, phone, type} = req.body;

     try {
         const newContact = new Contact({
             name: name,
             email: email,
             phone: phone,
             type: type,
             user: req.user.id
         });

        const contact = await newContact.save();
        res.json(contact);
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }
});

// @route   post api/contacts/:id
// @desc    add new contacts
// @access  Private.
router.put('/:id',auth, async (req, res) =>{
    const {name, email, phone, type} = req.body;

    //build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found.'});

        //make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized.'})
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactFields}, 
            //if not exist, create a new one
            { new: true});
            res.json(contact);
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    }

});

// @route   Delete api/contacts/:id
// @desc    Delete  contacts
// @access  Private.
router.delete('/:id',auth, async (req, res) =>{
    
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found.'});

        //make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized.'})
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({msg: 'Contact Removed.'});
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    }

});

module.exports = router;