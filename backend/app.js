const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const customerRoutes = require("./routes/customerRoutes");
const staffRoutes = require("./routes/staffRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/reservations", reservationRoutes);
app.get("/", (req, res) => {
    res.send("TableMate backend is running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});