import { useEffect, useState } from "react";
import "./style.css";

function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [tables, setTables] = useState([]);

    const [formData, setFormData] = useState({
        customer_id: "",
        table_id: "",
        reservation_date: "",
        reservation_time: "",
        number_of_people: "",
        status:""

    });


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const formatTime = (time) => {
        return time ? time.slice(0, 5) : "";
    };


    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Load all reservations
    const loadReservations = async () => {
        try {
            const [resResponse, custResponse, tabResponse] = await Promise.all([
                fetch("http://localhost:5000/api/reservations"),
                fetch("http://localhost:5000/api/customers"),
                fetch("http://localhost:5000/api/restables")
            ]);

            if (!resResponse.ok || !custResponse.ok || !tabResponse.ok) {
                throw new Error("Unable to load dashboard data");
            }

            const reservationsData = await resResponse.json();
            const customersData = await custResponse.json();
            const tablesData = await tabResponse.json();

            setReservations(reservationsData);
            setCustomers(customersData);
            setTables(tablesData);
        } catch (error) {
            console.error(error);
            setError("Unable to load reservations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadReservations();
    }, []);

    // Update form values
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            customer_id: "",
            table_id: "",
            reservation_date: "",
            reservation_time: "",
            number_of_people: "",
            status: ""
        });

        setEditingId(null);
        setShowForm(false);
    };

    // Add or update customer
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (
            !formData.customer_id ||
            !formData.table_id ||
            !formData.reservation_date.trim() ||
            !formData.reservation_time.trim() ||
            !formData.number_of_people ||
            !formData.status
        ) {
            setError("Please complete all reservation fields.");
            return;
        }

        try {
            let response;

            if (editingId) {
                response = await fetch(
                    `http://localhost:5000/api/reservations/${editingId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );
            } else {
                response = await fetch(
                    "http://localhost:5000/api/reservations",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );
            }

            if (!response.ok) {
                throw new Error("Unable to save reservation");
            }

            if (editingId) {
                setMessage("Reservation updated successfully.");
            } else {
                setMessage("Reservation added successfully.");
            }

            resetForm();
            loadReservations();

        } catch (error) {
            console.error(error);
            setError("Unable to save reservation.");
        }
    };

    // Prepare reservation for editing
    const handleEdit = (reservation) => {
        setFormData({
            customer_id: reservation.customer_id,
            table_id: reservation.table_id,
            reservation_date: reservation.reservation_date,
            reservation_time: reservation.reservation_time,
            number_of_people: reservation.number_of_people,
            status: reservation.status
        });

        setEditingId(reservation.reservation_id);
        setShowForm(true);
        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete customer
    const handleDelete = async (reservationId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this reservation?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/reservations/${reservationId}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
               const data = await response.json();
               throw new Error(
                  data.message || "Unable to delete reservation"
               );
           }

            setMessage("Reservation deleted successfully.");
            setError("");

            loadReservations();

        } catch (error) {
             console.error(error);
             setError(error.message);
        }
    };

    return (
        <div className="tm-page">
            <div className="tm-container">

                <div className="tm-header">
                    <div>
                        <p className="tm-brand">
                            TableMate
                        </p>

                        <h1>Reservations</h1>

                        <p className="tm-subtitle">
                            Manage your restaurant reservation records.
                        </p>
                    </div>

                    <button
                        className="tm-add-btn"
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                            setError("");
                            setMessage("");
                        }}
                    >
                        Add Reservation
                    </button>
                </div>

                {message && (
                    <div className="tm-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="tm-error">
                        {error}
                    </div>
                )}

                {showForm && (
                    <div className="tm-form-card">

                        <div className="tm-form-heading">
                            <div>
                                <h2>
                                    {editingId
                                        ? "Edit Reservation"
                                        : "Add Reservation"}
                                </h2>

                                <p>
                                    {editingId
                                        ? "Update the reservation's information."
                                        : "Enter the reservation's information below."}
                                </p>
                            </div>
                        </div>

                        <form
                            className="tm-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="tm-form-group">
                                <label htmlFor="customer_id">
                                    Customer
                                </label>

                                <select
                                    type="text"
                                    id="customer_id"
                                    name="customer_id"
                                    value={formData.customer_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select customer</option>
                                    {customers.map((cust) => (
                                        <option key={cust.customer_id} value={cust.customer_id}>
                                            {cust.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="table_id">
                                    Table
                                </label>

                                <select
                                    type="text"
                                    id="table_id"
                                    name="table_id"
                                    value={formData.table_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select table</option>
                                    {tables.map((tab) => (
                                        <option key={tab.table_id} value={tab.table_id}>
                                            Table {tab.table_number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="reservation_date">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    id="reservation_date"
                                    name="reservation_date"
                                    value={formData.reservation_date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="reservation_time">
                                    Time
                                </label>

                                <input
                                    type="time"
                                    id="reservation_time"
                                    name="reservation_time"
                                    value={formData.reservation_time}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="number_of_people">
                                    Number of People
                                </label>

                                <input
                                    type="number"
                                    id="number_of_people"
                                    name="number_of_people"
                                    value={formData.number_of_people}
                                    onChange={handleChange}
                                    placeholder="Enter number of guests"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="status">
                                    Status
                                </label>

                                <select
                                    type="text"
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Select status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="tm-form-actions">
                                <button
                                    type="submit"
                                    className="tm-save-btn"
                                >
                                    {editingId
                                        ? "Update Reservation"
                                        : "Save Reservation"}
                                </button>

                                <button
                                    type="button"
                                    className="tm-cancel-btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                )}

                <div className="tm-list-card">

                    <div className="tm-list-heading">
                        <div>
                            <h2>Reservation Directory</h2>

                            <p>
                                {reservations.length} registered reservation
                                {reservations.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="tm-loading">
                            Loading reservations...
                        </div>
                    ) : (
                        <div className="table-responsive">

                            <table className="tm-table">

                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Table</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Guests</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {reservations.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="tm-empty"
                                            >
                                                No reservations available.
                                            </td>
                                        </tr>
                                    ) : (
                                        reservations.map((reservation) => (
                                            <tr
                                                key={reservation.reservation_id}
                                            >
                                                <td className="tm-cell-name">
                                                    {reservation.customer_name}
                                                </td>

                                                <td>
                                                    Table {reservation.table_number}
                                                </td>

                                                <td>
                                                    {formatDate(reservation.reservation_date)}
                                                </td>

                                                <td>
                                                    {formatTime(reservation.reservation_time)}
                                                </td>

                                                <td>
                                                    {reservation.number_of_people}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`status ${
                                                            reservation.status === "Confirmed"
                                                                ? "status-confirmed"
                                                                : reservation.status === "Cancelled"
                                                                    ? "status-cancelled"
                                                                    : reservation.status === "Completed"
                                                                        ? "status-completed"
                                                                        : "status-pending"
                                                        }`}
                                                    >
                                                        {reservation.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="tm-cell-actions">

                                                        <button
                                                            className="tm-edit-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    reservation
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="tm-delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    reservation.reservation_id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Reservation;