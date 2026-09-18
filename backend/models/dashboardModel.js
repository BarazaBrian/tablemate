const db = require("../config/database");

const Dashboard = {
    getSummary: (callback) => {
        const sql = `
            SELECT
                (SELECT COUNT(*) FROM customers) AS totalCustomers,
                (SELECT COUNT(*) FROM restaurant_tables) AS totalTables,
                (SELECT COUNT(*) FROM restaurant_tables WHERE status = 'Available') AS availableTables,
                (SELECT COUNT(*) FROM reservations) AS totalReservations,
                (SELECT COUNT(*) FROM restaurant_staff) AS totalStaff
        `;

        db.query(sql, callback);
    }
};

module.exports = Dashboard;