import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { myListings } from "../data/books";

function MyListings() {
  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <h2>My Listings</h2>
        <button className="btn-primary btn-sm">+ Add New</button>
      </div>
      <div className="listings-table-wrap">
        <table className="listings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myListings.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>₹{item.price}</td>
                <td>
                  <span className={`status-badge ${item.sold ? "status-sold" : "status-active"}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn edit-btn">Edit</button>
                  <button className="action-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Orders() {
  const orders = [
    { id: "#ORD001", book: "To Kill a Mockingbird", buyer: "Sneha R.", date: "Apr 10, 2025", amount: 220 },
    { id: "#ORD002", book: "NCERT Physics Class 11", buyer: "Arjun D.", date: "Apr 14, 2025", amount: 100 },
  ];

  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <h2>Orders</h2>
      </div>
      {orders.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📦</p>
          <h3>No orders yet</h3>
          <p>Your completed sales will appear here</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <p className="order-id">{order.id}</p>
                <p className="order-book">{order.book}</p>
                <p className="order-buyer">Buyer: {order.buyer}</p>
              </div>
              <div className="order-right">
                <p className="order-date">{order.date}</p>
                <p className="order-amount">₹{order.amount}</p>
                <span className="status-badge status-active">Completed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Earnings() {
  const stats = [
    { label: "Total Earnings", value: "₹1,280", icon: "💰", color: "#D1FAE5", text: "#065F46" },
    { label: "Books Sold", value: "4", icon: "📚", color: "#DBEAFE", text: "#1D4ED8" },
    { label: "Active Listings", value: "3", icon: "📋", color: "#FEF3C7", text: "#92400E" },
    { label: "Pending Payout", value: "₹580", icon: "⏳", color: "#FCE7F3", text: "#9D174D" },
  ];

  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <h2>Earnings Overview</h2>
      </div>
      <div className="earnings-grid">
        {stats.map((s) => (
          <div
            key={s.label}
            className="earnings-card"
            style={{ background: s.color, color: s.text }}
          >
            <span className="earnings-icon">{s.icon}</span>
            <div>
              <p className="earnings-value">{s.value}</p>
              <p className="earnings-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="payout-info">
        <h3>Payout Method</h3>
        <p>Connect your bank account to receive payouts directly.</p>
        <button className="btn-outline btn-sm">Connect Bank Account</button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("listings");

  const tabContent = {
    listings: <MyListings />,
    orders: <Orders />,
    earnings: <Earnings />,
  };

  return (
    <main className="dashboard-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-main">{tabContent[activeTab]}</div>
    </main>
  );
}
