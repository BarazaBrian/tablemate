const db = require("../config/database");

const Reservation = {
    getAll: (callback) => {
        const sql = `
            SELECT 
                reservations.reservation_id,
                reservations.customer_id,
                customers.name AS customer_name,
                reservations.table_id,
                restaurant_tables.table_number,
                reservations.reservation_date,
                reservations.reservation_time,
                reservations.number_of_people,
                reservations.status
            FROM reservations
            JOIN customers
                ON reservations.customer_id = customers.customer_id
            JOIN restaurant_tables
                ON reservations.table_id = restaurant_tables.table_id
        `;

        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = `
            SELECT 
                reservations.reservation_id,
                reservations.customer_id,
                customers.name AS customer_name,
                reservations.table_id,
                restaurant_tables.table_number,
                reservations.reservation_date,
                reservations.reservation_time,
                reservations.number_of_people,
                reservations.status
            FROM reservations
            JOIN customers
                ON reservations.customer_id = customers.customer_id
            JOIN restaurant_tables
                ON reservations.table_id = restaurant_tables.table_id
            WHERE reservations.reservation_id = ?
        `;

        db.query(sql, [id], callback);
    },

    create: (reservation, callback) => {
        const sql = `
            INSERT INTO reservations
            (
                customer_id,
                table_id,
                reservation_date,
                reservation_time,
                number_of_people,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                reservation.customer_id,
                reservation.table_id,
                reservation.reservation_date,
                reservation.reservation_time,
                reservation.number_of_people,
                reservation.status
            ],
            callback
        );
    },

    update: (id, reservation, callback) => {
        const sql = `
            UPDATE reservations
            SET
                customer_id = ?,
                table_id = ?,
                reservation_date = ?,
                reservation_time = ?,
                number_of_people = ?,
                status = ?
            WHERE reservation_id = ?
        `;

        db.query(
            sql,
            [
                reservation.customer_id,
                reservation.table_id,
                reservation.reservation_date,
                reservation.reservation_time,
                reservation.number_of_people,
                reservation.status,
                id
            ],
            callback
        );
    },

    delete: (id, callback) => {
        const sql = `
            DELETE FROM reservations
            WHERE reservation_id = ?
        `;

        db.query(sql, [id], callback);
    }
};

module.exports = Reservation;