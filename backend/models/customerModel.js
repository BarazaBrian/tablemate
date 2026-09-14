const db = require("../config/database");

const Customer = {
    getAll: (callback) => {
        const sql = "SELECT * FROM customers";
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = "SELECT * FROM customers WHERE customer_id = ?";
        db.query(sql, [id], callback);
    },

    create: (customer, callback) => {
       const sql = `
            INSERT INTO customers (name, phone, email)
            VALUES (?, ?, ?)
        `;

        db.query(
           sql,
           [customer.name, customer.phone, customer.email],
           callback
        );
    },


    update: (id, customer, callback) => {
    const sql = `
        UPDATE customers
        SET name = ?, phone = ?, email = ?
        WHERE customer_id = ?
    `;

    db.query(
        sql,
        [customer.name, customer.phone, customer.email, id],
        callback
    );
    },
    
    delete: (id, callback) => {
    const sql = "DELETE FROM customers WHERE customer_id = ?";
    db.query(sql, [id], callback);
    }
};

module.exports = Customer;