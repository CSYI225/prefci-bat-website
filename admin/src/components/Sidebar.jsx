export default function Sidebar({ items, activeTab, onSelect }) {
  return (
    <aside className="sidebar">
      <h2>PREFCI Admin</h2>
      {items.map((item) => (
        <button
          key={item}
          className={`menu-item ${activeTab === item ? "active" : ""}`}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </aside>
  );
}
