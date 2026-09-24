const resTable = require("../models/resTableModel");

const getallTables = (req, res) => {

    resTable.getAll((err, results) => {
        // if there is an error, send message
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving restaurant tables"
            });
        };

        res.json(results);
    });
};

const getTableById = (req, res) => {

    const tableId = req.params.id;


    resTable.getById(tableId, (err, results) => {

        if (err) { 
            console.error(err);
            return res.status(500).json({
                message:"Error retrieving restaurant tables"
            });
        };

        res.json(results);
    })

}

const createResTable = (req, res) => {
    const newResTable = {
        table_number: req.body.table_number,
        capacity: req.body.capacity,
        status: req.body.status
    };

    resTable.create(newResTable, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error creating restaurant table"
            });
        }

        res.status(201).json({
            message: "Restaurant Table created successfully",
            table_id: result.table_id
        });
    });
};

const updateResTable = (req, res) => {

    const tableId = req.params.id;

    const updatedResTable = {
        table_number: req.body.table_number,
        capacity: req.body.capacity,
        status: req.body.status
    };

resTable.update(tableId, updatedResTable, (err, result) => {
    if (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error updating restaurant table"
        })
    }

    if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Restaurant Table not found"
        });
    }

    res.json({
        message: "Restaurant table updated successfully"
    });
})
}

const deletedResTable = (req,res) => {
    const tableId = req.params.id;

    resTable.delete(tableId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error deleting restaurant ytable" 
            });
        }

        if (results.affectedRows === 0 ) {
            return res.status(404).json({
                message: "Restaurant Table not found"
            });
        }


        res.json({
            message: "Restaurant Table deleted successfully"
        });
    });
};

module.exports = {getallTables, getTableById, createResTable, updateResTable, deletedResTable}
