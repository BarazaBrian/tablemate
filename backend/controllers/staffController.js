const Staff = require("../models/staffModel");

const getAllStaff = (req, res) => {
    Staff.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving staff"
            });
        }

        res.json(results);
    });
};

const getStaffById = (req, res) => {
    const id = req.params.id;

    Staff.getById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving staff member"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Staff member not found"
            });
        }

        res.json(results[0]);
    });
};

const createStaff = (req, res) => {
    const newStaff = {
        name: req.body.name,
        role: req.body.role,
        phone: req.body.phone,
        email: req.body.email
    };

    Staff.create(newStaff, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error creating staff member"
            });
        }

        res.status(201).json({
            message: "Staff member created successfully",
            staff_id: result.insertId
        });
    });
};

const updateStaff = (req, res) => {
    const id = req.params.id;

    const updatedStaff = {
        name: req.body.name,
        role: req.body.role,
        phone: req.body.phone,
        email: req.body.email
    };

    Staff.update(id, updatedStaff, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error updating staff member"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Staff member not found"
            });
        }

        res.json({
            message: "Staff member updated successfully"
        });
    });
};

const deleteStaff = (req, res) => {
    const id = req.params.id;

    Staff.delete(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error deleting staff member"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Staff member not found"
            });
        }

        res.json({
            message: "Staff member deleted successfully"
        });
    });
};

module.exports = {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
};