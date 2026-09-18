const Dashboard = require("../models/dashboardModel");

const getDashboardSummary = (req, res) => {
    Dashboard.getSummary((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving dashboard data"
            });
        }

        res.json(results[0]);
    });
};

module.exports = {
    getDashboardSummary
};