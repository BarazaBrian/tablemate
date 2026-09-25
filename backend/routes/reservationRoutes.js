const express = require("express");
const router = express.Router();

const {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} = require("../controllers/reservationController");


/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     description: Retrieves all restaurant reservations.
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getAllReservations);


/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation retrieved successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getReservationById);


/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - table_id
 *               - reservation_date
 *               - reservation_time
 *               - number_of_people
 *               - status
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               table_id:
 *                 type: integer
 *                 example: 2
 *               reservation_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-25"
 *               reservation_time:
 *                 type: string
 *                 example: "19:00:00"
 *               number_of_people:
 *                 type: integer
 *                 example: 4
 *               status:
 *                 type: string
 *                 example: Confirmed
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Invalid reservation data
 *       500:
 *         description: Server error
 */
router.post("/", createReservation);


/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               table_id:
 *                 type: integer
 *                 example: 2
 *               reservation_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-25"
 *               reservation_time:
 *                 type: string
 *                 example: "19:00:00"
 *               number_of_people:
 *                 type: integer
 *                 example: 4
 *               status:
 *                 type: string
 *                 example: Confirmed
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateReservation);


/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteReservation);

module.exports = router;