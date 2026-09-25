const express = require("express");
const router = express.Router();

const {
    getDashboardSummary
} = require("../controllers/dashboardController");


/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     description: Retrieves summary statistics for the TableMate dashboard.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCustomers:
 *                   type: integer
 *                   example: 5
 *                 totalTables:
 *                   type: integer
 *                   example: 5
 *                 availableTables:
 *                   type: integer
 *                   example: 4
 *                 totalReservations:
 *                   type: integer
 *                   example: 5
 *                 totalStaff:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Server error
 */
router.get("/", getDashboardSummary);


module.exports = router;