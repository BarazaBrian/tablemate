import { useEffect, useState } from "react";
import "./style.css";

function ResTables() {
    const [tables, setTables] = useState([]);

    const [formData, setFormData] = useState({
        table_number: "",
        capacity: "",
        status: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Load all restaurant tables
    const loadTables = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/restables"
            );

            if (!response.ok) {
                throw new Error("Unable to load tables");
            }

            const data = await response.json();
            setTables(data);
        } catch (error) {
            console.error(error);
            setError("Unable to load tables.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTables();
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
            table_number: "",
            capacity: "",
            status: ""
        });

        setEditingId(null);
        setShowForm(false);
    };

    // Add or update table
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (
            !formData.table_number &&
            !formData.capacity &&
            !formData.status
        ) {
            setError("Please complete all table fields.");
            return;
        }

        try {
            let response;

            if (editingId) {
                response = await fetch(
                    `http://localhost:5000/api/restables/${editingId}`,
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
                    "http://localhost:5000/api/restables",
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
                throw new Error("Unable to save table");
            }

            if (editingId) {
                setMessage("Table updated successfully.");
            } else {
                setMessage("Table added successfully.");
            }

            resetForm();
            loadTables();

        } catch (error) {
            console.error(error);
            setError("Unable to save table.");
        }
    };

    // Prepare table for editing
    const handleEdit = (table) => {
        setFormData({
            table_number: table.table_number,
            capacity: table.capacity,
            status: table.status
        });

        setEditingId(table.table_id);
        setShowForm(true);
        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete table
    const handleDelete = async (tableId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this table?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/restables/${tableId}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
               const data = await response.json();
               throw new Error(
                  data.message || "Unable to delete table"
               );
           }

            setMessage("Table deleted successfully.");
            setError("");

            loadTables();

        } catch (error) {
             console.error(error);
             setError(error.message);
        }
    };

    // Status badge class helper
    const getStatusClass = (status) => {
        if (status === "Available") {
            return "status-available";
        }

        if (status === "Unavailable") {
            return "status-unavailable";
        }

        return "status-pending";
    };

    return (
        <div className="tm-page">
            <div className="tm-container">

                <div className="tm-header">
                    <div>
                        <p className="tm-brand">
                            TableMate
                        </p>

                        <h1>Restaurant Tables</h1>

                        <p className="tm-subtitle">
                            Manage your restaurant table inventory.
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
                        Add Table
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
                                        ? "Edit Table"
                                        : "Add Table"}
                                </h2>

                                <p>
                                    {editingId
                                        ? "Update the table's information."
                                        : "Enter the table's information below."}
                                </p>
                            </div>
                        </div>

                        <form
                            className="tm-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="tm-form-group">
                                <label htmlFor="table_number">
                                    Table Number
                                </label>

                                <input
                                    type="number"
                                    id="table_number"
                                    name="table_number"
                                    value={formData.table_number}
                                    onChange={handleChange}
                                    placeholder="e.g. 6"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="capacity">
                                    Capacity
                                </label>

                                <input
                                    type="number"
                                    id="capacity"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    placeholder="e.g. 4"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="status">
                                    Status
                                </label>

                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Select status</option>
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>

                            <div className="tm-form-actions">
                                <button
                                    type="submit"
                                    className="tm-save-btn"
                                >
                                    {editingId
                                        ? "Update Table"
                                        : "Save Table"}
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
                            <h2>Table Inventory</h2>

                            <p>
                                {tables.length} registered table
                                {tables.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="tm-loading">
                            Loading tables...
                        </div>
                    ) : (
                        <div className="table-responsive">

                            <table className="tm-table">

                                <thead>
                                    <tr>
                                        <th>Table Number</th>
                                        <th>Capacity</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {tables.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="tm-empty"
                                            >
                                                No tables available.
                                            </td>
                                        </tr>
                                    ) : (
                                        tables.map((table) => (
                                            <tr
                                                key={table.table_id}
                                            >
                                                <td className="tm-cell-name">
                                                    {table.table_number}
                                                </td>

                                                <td>
                                                    {table.capacity}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`status ${
                                                            getStatusClass(table.status)
                                                        }`}
                                                    >
                                                        {table.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="tm-cell-actions">

                                                        <button
                                                            className="tm-edit-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    table
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="tm-delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    table.table_id
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

export default ResTables;
