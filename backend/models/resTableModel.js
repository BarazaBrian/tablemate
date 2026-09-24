const db = require("../config/database");

const resTable = {

    //getting all tables (restaurant tables)
    getAll: (callback) => {
        //prepareing sql
        const sql = "SELECT * FROM restaurant_tables";
        //executing the sql query
        db.query(sql, callback);
    },

    getById: (id, callback) => {

        const sql = "SELECT * FROM restaurant_tables where table_id = ?";
        db.query(sql, [id], callback);

    },

    create: (resTable, callback) => {

        const sql = "INSERT INTO restaurant_tables (table_number, capacity, status) VALUES (?,?,?) ";
        db.query(sql, [resTable.table_number, resTable.capacity, resTable.status], callback );

    },

    update: (id, resTable ,callback) => { 

        const sql = "UPDATE restaurant_tables SET table_number = ?, capacity = ?, status = ? WHERE table_id = ?";
        db.query(sql, [resTable.table_number, resTable.capacity, resTable.status, id], callback);

    },

    delete: (id, callback) => {
    const sql = "DELETE FROM restaurant_tables WHERE table_id = ?";
    db.query(sql, [id], callback);
    }

}

module.exports = resTable;