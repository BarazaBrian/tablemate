const express = require("express");
const router = express.Router();

const {
    getallTables, 
    getTableById, 
    createResTable, 
    updateResTable, 
    deletedResTable
} = require("../controllers/resTableController");

router.get("/", getallTables);
router.get("/:id", getTableById);
router.post("/", createResTable);
router.put("/:id", updateResTable);
router.delete("/:id", deletedResTable);

module.exports = router;