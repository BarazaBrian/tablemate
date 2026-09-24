import { useEffect, useState } from "react";
import "./style.css";

function Customers() {
    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Load all customers
    const loadCustomers = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/customers"
            );

        if (!response.ok) {
            throw new Error("Unable to load customers");
        }

            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error(error);
            setError("Unable to load customers.");
        } finally {
            setLoading(false);
        }
    };

   useEffect(() => {
    fetch("http://localhost:5000/api/customers")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to load customers");
            }

            return response.json();
        })
        .then((data) => {

            setCustomers(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setError("Unable to load customers.");
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
            phone: "",
            email: ""
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
            !formData.name.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim()
        ) {
            setError("Please complete all customer fields.");
            return;
        }

        try {
            let response;

            if (editingId) {
                response = await fetch(
                    `http://localhost:5000/api/customers/${editingId}`,
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
                    "http://localhost:5000/api/customers",
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
                throw new Error("Unable to save customer");
            }

            if (editingId) {
                setMessage("Customer updated successfully.");
            } else {
                setMessage("Customer added successfully.");
            }

            resetForm();
            loadCustomers();

        } catch (error) {
            console.error(error);
            setError("Unable to save customer.");
        }
    };

    // Prepare customer for editing
    const handleEdit = (customer) => {
        setFormData({
            name: customer.name,
            phone: customer.phone,
            email: customer.email
        });

        setEditingId(customer.customer_id);
        setShowForm(true);
        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete customer
    const handleDelete = async (customerId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/customers/${customerId}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
               const data = await response.json();
               throw new Error(
                  data.message || "Unable to delete customer"
               );
           }

            setMessage("Customer deleted successfully.");
            setError("");

            loadCustomers();

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

                        <h1>Customers</h1>

                        <p className="tm-subtitle">
                            Manage your restaurant customer records.
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
                        Add Customer
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
                                        ? "Edit Customer"
                                        : "Add Customer"}
                                </h2>

                                <p>
                                    {editingId
                                        ? "Update the customer's information."
                                        : "Enter the customer's information below."}
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
                                    placeholder="Enter customer name"
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
                                        ? "Update Customer"
                                        : "Save Customer"}
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
                            <h2>Customer Directory</h2>

                            <p>
                                {customers.length} registered customer
                                {customers.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="tm-loading">
                            Loading customers...
                        </div>
                    ) : (
                        <div className="table-responsive">

                            <table className="tm-table">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {customers.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="tm-empty"
                                            >
                                                No customers available.
                                            </td>
                                        </tr>
                                    ) : (
                                        customers.map((customer) => (
                                            <tr
                                                key={customer.customer_id}
                                            >
                                                <td className="tm-cell-name">
                                                    {customer.name}
                                                </td>

                                                <td>
                                                    {customer.phone}
                                                </td>

                                                <td>
                                                    {customer.email}
                                                </td>

                                                <td>
                                                    <div className="tm-cell-actions">

                                                        <button
                                                            className="tm-edit-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    customer
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="tm-delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    customer.customer_id
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

export default Customers;
