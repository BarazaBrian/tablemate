import { useEffect, useState } from "react";
import "./style.css";

function Staff() {
    const [staff, setStaff] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        phone: "",
        email: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Load all staff
    const loadStaff = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/staff"
            );

            if (!response.ok) {
                throw new Error("Unable to load staff");
            }

            const data = await response.json();
            setStaff(data);
        } catch (error) {
            console.error(error);
            setError("Unable to load staff.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/api/staff")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to load staff");
                }

                return response.json();
            })
            .then((data) => {
                setStaff(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load staff.");
                setLoading(false);
            });
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
            name: "",
            role: "",
            phone: "",
            email: ""
        });

        setEditingId(null);
        setShowForm(false);
    };

    // Add or update staff
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (
            !formData.name.trim() ||
            !formData.role.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim()
        ) {
            setError("Please complete all staff fields.");
            return;
        }

        try {
            let response;

            if (editingId) {
                response = await fetch(
                    `http://localhost:5000/api/staff/${editingId}`,
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
                    "http://localhost:5000/api/staff",
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
                throw new Error("Unable to save staff");
            }

            if (editingId) {
                setMessage("Staff member updated successfully.");
            } else {
                setMessage("Staff member added successfully.");
            }

            resetForm();
            loadStaff();

        } catch (error) {
            console.error(error);
            setError("Unable to save staff.");
        }
    };

    // Prepare staff for editing
    const handleEdit = (member) => {
        setFormData({
            name: member.name,
            role: member.role,
            phone: member.phone,
            email: member.email
        });

        setEditingId(member.staff_id);
        setShowForm(true);
        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete staff
    const handleDelete = async (staffId) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this staff member?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/staff/${staffId}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
               const data = await response.json();
               throw new Error(
                  data.message || "Unable to delete staff member"
               );
           }

            setMessage("Staff member removed successfully.");
            setError("");

            loadStaff();

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

                        <h1>Staff</h1>

                        <p className="tm-subtitle">
                            Manage your restaurant staff records.
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
                        Add Staff
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
                                        ? "Edit Staff Member"
                                        : "Add Staff Member"}
                                </h2>

                                <p>
                                    {editingId
                                        ? "Update the staff member's information."
                                        : "Enter the staff member's information below."}
                                </p>
                            </div>
                        </div>

                        <form
                            className="tm-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="tm-form-group">
                                <label htmlFor="name">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter staff name"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="role">
                                    Role / Position
                                </label>

                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g. Waiter, Chef, Manager"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="phone">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div className="tm-form-actions">
                                <button
                                    type="submit"
                                    className="tm-save-btn"
                                >
                                    {editingId
                                        ? "Update Staff Member"
                                        : "Save Staff Member"}
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
                            <h2>Staff Directory</h2>

                            <p>
                                {staff.length} registered staff member
                                {staff.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="tm-loading">
                            Loading staff...
                        </div>
                    ) : (
                        <div className="table-responsive">

                            <table className="tm-table">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {staff.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="tm-empty"
                                            >
                                                No staff members available.
                                            </td>
                                        </tr>
                                    ) : (
                                        staff.map((member) => (
                                            <tr
                                                key={member.staff_id}
                                            >
                                                <td className="tm-cell-name">
                                                    {member.name}
                                                </td>

                                                <td>
                                                    {member.role}
                                                </td>

                                                <td>
                                                    {member.phone}
                                                </td>

                                                <td>
                                                    {member.email}
                                                </td>

                                                <td>
                                                    <div className="tm-cell-actions">

                                                        <button
                                                            className="tm-edit-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    member
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="tm-delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    member.staff_id
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

export default Staff;