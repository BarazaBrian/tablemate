const Reservation = require("../models/reservationModel");

const getAllReservations = (req, res) => {
    Reservation.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving reservations"
            });
        }

        res.json(results);
    });
};

const getReservationById = (req, res) => {
    const id = req.params.id;

    Reservation.getById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving reservation"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.json(results[0]);
    });
};

const createReservation = (req, res) => {
    const newReservation = {
        customer_id: req.body.customer_id,
        table_id: req.body.table_id,
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        number_of_people: req.body.number_of_people,
        status: req.body.status
    };

    Reservation.create(newReservation, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error creating reservation"
            });
        }

        res.status(201).json({
            message: "Reservation created successfully",
            reservation_id: result.insertId
        });
    });
};

const updateReservation = (req, res) => {
    const id = req.params.id;

    const updatedReservation = {
        customer_id: req.body.customer_id,
        table_id: req.body.table_id,
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        number_of_people: req.body.number_of_people,
        status: req.body.status
    };

    Reservation.update(id, updatedReservation, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error updating reservation"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.json({
            message: "Reservation updated successfully"
        });
    });
};

const deleteReservation = (req, res) => {
    const id = req.params.id;

    Reservation.delete(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error deleting reservation"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.json({
            message: "Reservation deleted successfully"
        });
    });
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};