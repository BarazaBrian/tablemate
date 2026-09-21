const resTable = require("../models/tableModel");

const getallTables = (req, res) => {

    resTable.getallTables((err, results) => {
        // if there is an error, send message
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving customers"
            });
        };

        res.json(results);
    });
};

const getTableById = (req, res) => {

    resTable.getById((err, results) => {

        if (err) { 
            console.error(err);
            return res.status(500).json({
                message:"Error retrieving customer"
            });
        };

        res.json(results);
    })

}

