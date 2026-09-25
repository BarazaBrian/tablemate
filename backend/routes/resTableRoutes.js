const express = require("express");
const router = express.Router();

const {
    getallTables, 
    getTableById, 
    createResTable, 
    updateResTable, 
    deletedResTable
} = require("../controllers/resTableController");


/**
 * @swagger
 * /api/restables:
 *   get:
 *     summary: Get all restaurant tables
 *     description: Retrieves all restaurant tables from the TableMate database.
 *     tags:
 *       - Restaurant Tables
 *     responses:
 *       200:
 *         description: Restaurant tables retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getallTables);


/**
 * @swagger
 * /api/restables/{id}:
 *   get:
 *     summary: Get restaurant table by ID
 *     tags:
 *       - Restaurant Tables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Restaurant table ID
 *     responses:
 *       200:
 *         description: Restaurant table retrieved successfully
 *       404:
 *         description: Restaurant table not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getTableById);


/**
 * @swagger
 * /api/restables:
 *   post:
 *     summary: Create a new restaurant table
 *     tags:
 *       - Restaurant Tables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - table_number
 *               - capacity
 *               - status
 *             properties:
 *               table_number:
 *                 type: integer
 *                 example: 6
 *               capacity:
 *                 type: integer
 *                 example: 4
 *               status:
 *                 type: string
 *                 example: Available
 *     responses:
 *       201:
 *         description: Restaurant table created successfully
 *       400:
 *         description: Invalid restaurant table data
 *       500:
 *         description: Server error
 */
router.post("/", createResTable);


/**
 * @swagger
 * /api/restables/{id}:
 *   put:
 *     summary: Update a restaurant table
 *     tags:
 *       - Restaurant Tables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Restaurant table ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table_number:
 *                 type: integer
 *                 example: 6
 *               capacity:
 *                 type: integer
 *                 example: 6
 *               status:
 *                 type: string
 *                 example: Available
 *     responses:
 *       200:
 *         description: Restaurant table updated successfully
 *       404:
 *         description: Restaurant table not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateResTable);


/**
 * @swagger
 * /api/restables/{id}:
 *   delete:
 *     summary: Delete a restaurant table
 *     tags:
 *       - Restaurant Tables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Restaurant table ID
 *     responses:
 *       200:
 *         description: Restaurant table deleted successfully
 *       404:
 *         description: Restaurant table not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deletedResTable);

module.exports = router;