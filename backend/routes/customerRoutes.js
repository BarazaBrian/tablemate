const express = require("express");
const router = express.Router();

const {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");


/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieves all customers stored in the TableMate database.
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *       500:
 *         description: Server error
 */


router.get("/", getAllCustomers);


/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getCustomerById);


/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Brian Baraza
 *               phone:
 *                 type: string
 *                 example: "57001234"
 *               email:
 *                 type: string
 *                 example: brian@email.com
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid customer data
 *       500:
 *         description: Server error
 */
router.post("/", createCustomer);


/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Brian Baraza
 *               phone:
 *                 type: string
 *                 example: "57001234"
 *               email:
 *                 type: string
 *                 example: brian@email.com
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateCustomer);


/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       409:
 *         description: Customer cannot be deleted because existing reservations reference the customer
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteCustomer);

module.exports = router;