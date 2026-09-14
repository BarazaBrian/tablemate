const Customer = require("../models/customerModel");

const getAllCustomers = (req, res) => {
    Customer.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving customers"
            });
        }

        res.json(results);
    });
};

const getCustomerById = (req, res) => {
    const id = req.params.id;

    Customer.getById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving customer"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json(results[0]);
    });
};


const createCustomer = (req, res) => {
    const newCustomer = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    };

    Customer.create(newCustomer, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error creating customer"
            });
        }

        res.status(201).json({
            message: "Customer created successfully",
            customer_id: result.insertId
        });
    });
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer
};