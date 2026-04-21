export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "listings", label: "My Listings", icon: "📚" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "earnings", label: "Earnings", icon: "💰" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-avatar">RK</div>
        <div>
          <p className="sidebar-name">Rahul Kumar</p>
          <p className="sidebar-email">rahul@example.com</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
