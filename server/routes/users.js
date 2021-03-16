const express = require('express');
const router = express.Router();

const { User } = require('../models');

// Get all Users
router.get('/', (req, res) => {
    User.find({})
    .then(users => {
        return res.status(200).json(users);
    })
    .catch(err => {
        return res.status(400).json({ error: "Server error"})
    })
});

// Get User
router.get('/:id', (req, res) => {

    if (!req.params.id) {
        return res.status(400).json({msg: "Missing User ID in params"})
    }

    User.findById(req.params.id)
    .then(user => {
        return res.status(200).json(user);
    })
    .catch(err => {
        return res.status(400).json({ msg: "User not found"})
    })
});

// Create User 
router.post('/', (req, res) => {

    let newUser = new User({
        countryCode: req.body.countryCode ? req.body.countryCode : null,
    });

    console.log(req.body)
    newUser.save()
    .then(user => {
        return res.status(200).json({status: 1, results: user})
    })
    .catch(err => console.log(err))
});

// Update User
router.put('/:id', (req, res) => {

    if (!req.params.id) {
        return res.status(400).json({status: 0, msg: "Missing ID in params"})
    }

    User.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $set: req.body
    },
    {
        new: true
    })
    .then(user => {
        return res.status(200).json(user);
    })
    .catch(err => console.log(err));
});

// Delete User 
router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({status: 0, msg: "Missing User Id in params"})
    }

    User.findByIdAndDelete(req.params.id)
    .then(user => {
        return res.status(200).json({msg: "User deleted"});
    })
    .catch(err => res.status(400).json({msg: "User not found"}))
})

module.exports = router;