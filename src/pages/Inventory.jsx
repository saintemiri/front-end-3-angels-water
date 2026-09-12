import "./Inventory.css";

const products = [
  {
    name: "Water Dispenser (Rounded Gallon)",
    size: "1 Gallon",
    category: "Consumable",
    stock: 80,
    status: "In Stock",
    price: "₱2000.00",
    icon: "▣",
  },
  {
    name: "Regular Gallon",
    size: "1 Gallon",
    category: "Consumable",
    stock: 120,
    status: "In Stock",
    price: "₱3000.00",
    icon: "◇",
  },
];

function Inventory() {
  return (
    <div className="inventory-page">
      {/* Sidebar */}
      <aside className="inventory-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">A</div>
          <div>
            <h2>Admin Portal</h2>
            <span>3 ANGELS WATER STATION</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <span>⌂</span>
            Home Feed
          </a>

          <a href="#" className="nav-item active">
            <span>◉</span>
            Inventory
          </a>

          <a href="#" className="nav-item">
            <span>🛒</span>
            Orders
          </a>

          <a href="#" className="nav-item">
            <span>♧</span>
            Suppliers
          </a>

          <a href="#" className="nav-item">
            <span>▥</span>
            Analytics
          </a>

          <a href="#" className="nav-item">
            <span>⚙</span>
            Settings
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#" className="nav-item">
            <span>?</span>
            Support
          </a>

          <a href="#" className="nav-item">
            <span>↪</span>
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="inventory-main">
        {/* Header */}
        <header className="inventory-header">
          <div>
            <h1>Inventory Management</h1>
            <p>Track, manage and optimize your product stock levels.</p>
          </div>

          <div className="header-actions">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search inventory..."
              />
            </div>

            <button className="add-product-btn">
              <span>+</span>
              Add Product
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="summary-cards">
          <div className="summary-card">
            <div className="card-top">
              <span>Total Products</span>
              <div className="card-icon blue">▣</div>
            </div>

            <strong>200</strong>

            <small className="positive">
              ↑12% <span>vs last month</span>
            </small>
          </div>

          <div className="summary-card">
            <div className="card-top">
              <span>Low Stock Items</span>
              <div className="card-icon purple">△</div>
            </div>

            <strong>0</strong>

            <small className="positive">
              ↑4% <span>vs last month</span>
            </small>
          </div>

          <div className="summary-card">
            <div className="card-top">
              <span>Out of Stock</span>
              <div className="card-icon blue">╱</div>
            </div>

            <strong>0</strong>

            <small className="negative">
              ↓1% <span>vs last month</span>
            </small>
          </div>

          <div className="summary-card">
            <div className="card-top">
              <span>Total Valuation</span>
              <div className="card-icon blue">▤</div>
            </div>

            <strong>₱5000.00</strong>

            <small className="positive">
              ↑8% <span>vs last month</span>
            </small>
          </div>
        </section>

        {/* Products */}
        <section className="products-section">
          <div className="products-header">
            <h3>All Products</h3>

            <div className="filters">
              <button>
                Category: All <span>⌄</span>
              </button>

              <button>
                Status: All <span>⌄</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="products-table">
            <div className="table-head">
              <div>PRODUCT DETAILS</div>
              <div>CATEGORY</div>
              <div>STOCK</div>
              <div>STATUS</div>
              <div>UNIT PRICE</div>
            </div>

            {products.map((product, index) => (
              <div className="table-row" key={index}>
                <div className="product-info">
                  <div className="product-icon">
                    {product.icon}
                  </div>

                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.size}</span>
                  </div>
                </div>

                <div>{product.category}</div>

                <div>{product.stock} units</div>

                <div>
                  <span className="status-badge">
                    {product.status}
                  </span>
                </div>

                <div className="unit-price">
                  {product.price}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="products-footer">
            <span>Showing 1 to 2 of 2 products</span>

            <div className="pagination">
              <button disabled>‹</button>
              <button>›</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Inventory;
