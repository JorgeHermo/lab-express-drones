const express = require('express');
const { findByIdAndDelete } = require('./../models/Drone.model');
const router = express.Router();

const Drone = require('./../models/Drone.model')

router.get('/drones', (req, res, next) => {
    // Iteration #2: List the drones
    Drone
        .find()
        .then(drones => {
            res.render('drones/list', { drones })
        })
        .catch(err => console.log(err))
});

router.get('/drones/create', (req, res, next) => {
    // Iteration #3: Add a new drone
    res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
    const { name, propellers, maxSpeed } = req.body

    Drone
        .create({ name, propellers, maxSpeed })
        .then(newDrone => {
            res.redirect('/drones')
        })
        .catch(err => console.log(err))
});

router.get('/drones/:id/edit', (req, res, next) => {
    // Iteration #4: Update the drone
    const { id } = req.params

    Drone
        .findById(id)
        .then(drone => {
            res.render('drones/update-form', drone)
        }).catch(err => console.log(err))
});

router.post('/drones/:id/edit', (req, res, next) => {
    // Iteration #4: Update the drone
    const { id } = req.params
    const { name, propellers, maxSpeed } = req.body

    Drone
        .findByIdAndUpdate(id, { name, propellers, maxSpeed })
        .then(drone => {
            res.redirect('/drones')
        })
        .catch(err => console.log(err))
});

router.post('/drones/:id/delete', (req, res, next) => {
    const { id } = req.params

    Drone
        .findByIdAndDelete(id)
        .then(() => res.redirect('/drones'))
        .catch(err => console.log(err))
});

module.exports = router;