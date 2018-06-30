const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load Validation
const validateParticipantInput = require('../../validation/participant');


// Load Participant Model
const Participant = require('../../models/Participant');


// @route   GET api/participant/all
// @desc    Get all Participants
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Participant.find()
  .sort({ date: -1 })
    .then(participants => {
      if (!participants) {
        errors.noparticipants = 'There are no participants';
        return res.status(404).json(errors);
      }
      res.json(participants);
    })
    .catch(err => res.status(404).json({ participants: 'There are no participants' }));
});

// @route   POST api/participant
// @desc    Create  participant
// @access  Private
router.post(
  '/',
  (req, res) => {
    const { errors, isValid } = validateParticipantInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const participantFields = {};
    if (req.body.name) participantFields.name = req.body.name;
    if (req.body.email) participantFields.email = req.body.email;
    if (req.body.phone) participantFields.phone = req.body.phone;
        // Check if email exists
        Participant.findOne({ email: participantFields.email }).then(participant => {
          if (participant) {
            errors.email = 'That Participant email already exists';
            res.status(400).json(errors);
          }else{
          // Save participant
          new Participant(participantFields).save().then(participant => res.json(participant));
          }
        });
      }
 
);
// @route   POST api/participant/:participant_id
// @desc   Edit  participant
// @access  Private
router.post(
  '/:participant_id',
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateParticipantInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const participantFields = {};
    if (req.body.name) participantFields.name = req.body.name;
    if (req.body.email) participantFields.email = req.body.email;
    if (req.body.phone) participantFields.phone = req.body.phone;
 

    Participant.findOne({ _id: req.params.participant_id }).then(participant => {
      if (participant) {
        // Update
         // Check if email exists
         Participant.findOne({ email: participantFields.email }).then(participant => {
          if (participant) {
            errors.email = 'That Participant email already exists';
            res.status(400).json(errors);
          }else{
          // Update participant
          Participant.findOneAndUpdate(
            { _id: req.params.participant_id },
            { $set: participantFields },
            { new: true }
          ).then(participant => res.json(participant));
          }
        });  
      } 
    });
  }
);

// @route   DELETE api/participant/participant_id
// @desc    delete participant
// @access  Private
router.delete(
  '/:participant_id',
  (req, res) => {
    Participant.findOneAndRemove({ _id: req.params.participant_id })
  .then(()=>res.json({success:true}))
  }
);

module.exports = router;
