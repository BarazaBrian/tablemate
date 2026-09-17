const db = require("../config/database");

const Staff = {
    getAll: (callback) => {
        const sql = "SELECT * FROM restaurant_staff";
        db.query(sql, callback);
    },

    getById: (id, callback) => {
    const sql = "SELECT * FROM restaurant_staff WHERE staff_id = ?";
    db.query(sql, [id], callback);
    },


    create: (staff, callback) => {
        const sql = `
            INSERT INTO restaurant_staff (name, role, phone, email)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [staff.name, staff.role, staff.phone, staff.email],
            callback
        );
    },


    update: (id, staff, callback) => {
        const sql = `
            UPDATE restaurant_staff
            SET name = ?, role = ?, phone = ?, email = ?
            WHERE staff_id = ?
        `;

        db.query(
            sql,
            [staff.name, staff.role, staff.phone, staff.email, id],
            callback
        );
    },
    

    delete: (id, callback) => {
        const sql = "DELETE FROM restaurant_staff WHERE staff_id = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Staff;