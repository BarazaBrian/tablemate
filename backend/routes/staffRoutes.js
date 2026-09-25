const express = require("express");
const router = express.Router();

const {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
} = require("../controllers/staffController");



/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Get all staff members
 *     description: Retrieves all restaurant staff members.
 *     tags:
 *       - Staff
 *     responses:
 *       200:
 *         description: Staff retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getAllStaff);


/**
 * @swagger
 * /api/staff/{id}:
 *   get:
 *     summary: Get staff member by ID
 *     tags:
 *       - Staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Staff member retrieved successfully
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getStaffById);


/**
 * @swagger
 * /api/staff:
 *   post:
 *     summary: Create a new staff member
 *     tags:
 *       - Staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - phone
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Emma Lewis
 *               role:
 *                 type: string
 *                 example: Manager
 *               phone:
 *                 type: string
 *                 example: "57001234"
 *               email:
 *                 type: string
 *                 example: emma@email.com
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *       400:
 *         description: Invalid staff data
 *       500:
 *         description: Server error
 */
router.post("/", createStaff);


/**
 * @swagger
 * /api/staff/{id}:
 *   put:
 *     summary: Update a staff member
 *     tags:
 *       - Staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Emma Lewis
 *               role:
 *                 type: string
 *                 example: Manager
 *               phone:
 *                 type: string
 *                 example: "57001234"
 *               email:
 *                 type: string
 *                 example: emma@email.com
 *     responses:
 *       200:
 *         description: Staff member updated successfully
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateStaff);


/**
 * @swagger
 * /api/staff/{id}:
 *   delete:
 *     summary: Delete a staff member
 *     tags:
 *       - Staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Staff member deleted successfully
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteStaff);

module.exports = router;