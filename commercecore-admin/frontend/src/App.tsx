import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { customers, kpis, orders, products, revenueSeries, stockMovements } from './adminData';

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">CommerceCore</p>
          <h1>Admin Ops</h1>
        </div>
        <nav aria-label="Admin sections">
          <a href="#dashboard">Dashboard</a>
          <a href="#products">Products</a>
          <a href="#customers">Customers</a>
          <a href="#orders">Orders</a>
          <a href="#stock">Stock</a>
        </nav>
      </aside>

      <section className="workspace">
        <header className="hero" id="dashboard">
          <div>
            <p className="eyebrow">Business control center</p>
            <h2>E-commerce admin dashboard for operational decisions.</h2>
            <p>
              V1 focuses on table-first workflows, inventory visibility, and a Spring Boot API surface
              that can grow into a production-style business system.
            </p>
          </div>
          <div className="status-card">
            <span>Backend API</span>
            <strong>/api/v1</strong>
            <small>Products, customers, orders, stock, dashboard</small>
          </div>
        </header>

        <section className="kpi-grid" aria-label="Key metrics">
          {kpis.map((kpi) => (
            <article className="kpi-card" key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.trend}</small>
            </article>
          ))}
        </section>

        <section className="panel chart-panel">
          <div>
            <p className="eyebrow">Revenue trend</p>
            <h3>Monthly sales overview</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueSeries}>
              <defs>
                <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#36d1dc" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#5b86e5" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#20304a" strokeDasharray="4 6" />
              <XAxis dataKey="month" stroke="#7f8da8" />
              <YAxis stroke="#7f8da8" />
              <Tooltip
                contentStyle={{ background: '#0c1324', border: '1px solid #223350', color: '#f4f7fb' }}
              />
              <Area dataKey="revenue" stroke="#36d1dc" strokeWidth={3} fill="url(#revenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        <section className="grid-two">
          <DataTable
            id="products"
            title="Product inventory"
            columns={['SKU', 'Name', 'Category', 'Stock', 'Status']}
            rows={products.map((product) => [
              product.sku,
              product.name,
              product.category,
              product.stock.toString(),
              product.status,
            ])}
          />
          <DataTable
            id="orders"
            title="Recent orders"
            columns={['Order', 'Customer', 'Total', 'Status']}
            rows={orders.map((order) => [order.id, order.customer, order.total, order.status])}
          />
        </section>

        <section className="grid-two">
          <DataTable
            id="customers"
            title="Customer value"
            columns={['Customer', 'Email', 'Orders', 'Value']}
            rows={customers.map((customer) => [
              customer.name,
              customer.email,
              customer.orders.toString(),
              customer.value,
            ])}
          />
          <DataTable
            id="stock"
            title="Stock movements"
            columns={['Product', 'Type', 'Qty', 'Note']}
            rows={stockMovements.map((movement) => [
              movement.product,
              movement.type,
              movement.quantity.toString(),
              movement.note,
            ])}
          />
        </section>
      </section>
    </main>
  );
}

type DataTableProps = {
  id: string;
  title: string;
  columns: string[];
  rows: string[][];
};

function DataTable({ id, title, columns, rows }: DataTableProps) {
  return (
    <article className="panel table-panel" id={id}>
      <div className="panel-heading">
        <p className="eyebrow">Module</p>
        <h3>{title}</h3>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {columns.map((column, cellIndex) => (
                  <td key={column}>{row[cellIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export default App;
