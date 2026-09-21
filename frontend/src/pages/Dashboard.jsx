import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
    const [summary, setSummary] = useState({
        totalCustomers: 0,
        totalTables: 0,
        availableTables: 0,
        totalReservations: 0,
        totalStaff: 0
    });

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const summaryResponse = await fetch(
                    "http://localhost:5000/api/dashboard"
                );

                const reservationResponse = await fetch(
                    "http://localhost:5000/api/reservations"
                );

                if (!summaryResponse.ok || !reservationResponse.ok) {
                    throw new Error("Unable to load dashboard data");
                }

                const summaryData = await summaryResponse.json();
                const reservationData = await reservationResponse.json();

                setSummary(summaryData);
                setReservations(reservationData);
            } catch (error) {
                console.error("Dashboard error:", error);
                setError("Unable to load dashboard information.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const getStatusClass = (status) => {
        if (status === "Confirmed") {
            return "status-confirmed";
        }

        if (status === "Cancelled") {
            return "status-cancelled";
        }

        if (status === "Completed") {
            return "status-completed";
        }

        return "status-pending";
    };

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

    return (
        <div className="dashboard">
            <div className="dashboard-container">

                {/* Header */}
                <div className="dashboard-top">
                    <div>
                        <p className="dashboard-brand">
                            TableMate
                        </p>

                        <h1>Restaurant Overview</h1>

                        <p className="dashboard-subtitle">
                            A quick view of your restaurant activity.
                        </p>
                    </div>

                    <p className="dashboard-date">
                        {new Date().toLocaleDateString("en-GB", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="dashboard-error">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="dashboard-loading">
                        Loading dashboard...
                    </div>
                ) : (
                    <>
                        {/* Summary Cards */}
                        <div className="summary-grid">

                            <div className="summary-card">
                                <p className="summary-label">
                                    Customers
                                </p>

                                <h2>
                                    {summary.totalCustomers}
                                </h2>

                                <p className="summary-description">
                                    Registered customers
                                </p>
                            </div>

                            <div className="summary-card">
                                <p className="summary-label">
                                    Tables
                                </p>

                                <h2>
                                    {summary.totalTables}
                                </h2>

                                <p className="summary-description">
                                    Total restaurant tables
                                </p>
                            </div>

                            <div className="summary-card available-card">
                                <p className="summary-label">
                                    Available
                                </p>

                                <h2>
                                    {summary.availableTables}
                                </h2>

                                <p className="summary-description">
                                    Tables ready to book
                                </p>
                            </div>

                            <div className="summary-card">
                                <p className="summary-label">
                                    Reservations
                                </p>

                                <h2>
                                    {summary.totalReservations}
                                </h2>

                                <p className="summary-description">
                                    Total reservations
                                </p>
                            </div>

                            <div className="summary-card">
                                <p className="summary-label">
                                    Staff
                                </p>

                                <h2>
                                    {summary.totalStaff}
                                </h2>

                                <p className="summary-description">
                                    Team members
                                </p>
                            </div>

                        </div>

                        {/* Recent Reservations */}
                        <div className="reservation-card">

                            <div className="reservation-heading">
                                <div>
                                    <h2>
                                        Recent Reservations
                                    </h2>

                                    <p>
                                        Latest reservation activity
                                    </p>
                                </div>

                                <span className="view-all">
                                    View all reservations →
                                </span>
                            </div>

                            <div className="table-responsive">
                                <table className="reservation-table">

                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Table</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Guests</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {reservations.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="empty-row"
                                                >
                                                    No reservations available.
                                                </td>
                                            </tr>
                                        ) : (
                                            reservations
                                                .slice(0, 5)
                                                .map((reservation) => (
                                                    <tr
                                                        key={
                                                            reservation.reservation_id
                                                        }
                                                    >
                                                        <td className="customer-name">
                                                            {
                                                                reservation.customer_name
                                                            }
                                                        </td>

                                                        <td>
                                                            Table{" "}
                                                            {
                                                                reservation.table_number
                                                            }
                                                        </td>

                                                        <td>
                                                            {formatDate(
                                                                reservation.reservation_date
                                                            )}
                                                        </td>

                                                        <td>
                                                            {formatTime(
                                                                reservation.reservation_time
                                                            )}
                                                        </td>

                                                        <td>
                                                            {
                                                                reservation.number_of_people
                                                            }
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`status ${getStatusClass(
                                                                    reservation.status
                                                                )}`}
                                                            >
                                                                {
                                                                    reservation.status
                                                                }
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}

                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </>
                )}

            </div>
        </div>
    );
}

export default Dashboard;