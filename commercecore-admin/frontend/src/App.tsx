import { useEffect, useState, type FormEvent } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { demoData } from './adminData';
import {
  createCategory,
  createCustomer,
  createOrder,
  createProduct,
  createStockMovement,
  deleteCategory,
  deleteCustomer,
  deleteProduct,
  getProductExportUrl,
  loadCommerceCoreData,
  updateCategory,
  updateCustomer,
  updateOrderStatus,
  updateProduct,
} from './services/api';
import type {
  AdminDashboardData,
  CategoryRequest,
  CategoryResponse,
  CustomerResponse,
  OrderResponse,
  OrderStatus,
  ProductRequest,
  ProductResponse,
  StockMovementResponse,
  StockMovementType,
} from './types';

type ApiState = 'loading' | 'live' | 'fallback';

type ProductFormState = {
  sku: string;
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
  lowStockThreshold: string;
  active: boolean;
  categoryId: string;
};

type CategoryFormState = {
  name: string;
  slug: string;
  description: string;
  active: boolean;
};

type CustomerFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type OrderFormState = {
  customerId: string;
  productId: string;
  quantity: string;
};

type StockMovementFormState = {
  productId: string;
  type: StockMovementType;
  quantity: string;
  note: string;
};

const EMPTY_PRODUCT_FORM: ProductFormState = {
  sku: '',
  name: '',
  description: '',
  price: '',
  stockQuantity: '',
  lowStockThreshold: '5',
  active: true,
  categoryId: '',
};

const EMPTY_CATEGORY_FORM: CategoryFormState = {
  name: '',
  slug: '',
  description: '',
  active: true,
};

const EMPTY_CUSTOMER_FORM: CustomerFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const EMPTY_ORDER_FORM: OrderFormState = {
  customerId: '',
  productId: '',
  quantity: '1',
};

const EMPTY_STOCK_MOVEMENT_FORM: StockMovementFormState = {
  productId: '',
  type: 'IN',
  quantity: '1',
  note: '',
};

const ORDER_STATUSES: OrderStatus[] = ['DRAFT', 'PAID', 'FULFILLED', 'CANCELLED'];
const STOCK_MOVEMENT_TYPES: StockMovementType[] = ['IN', 'OUT', 'ADJUSTMENT'];

function App() {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData>(demoData);
  const [apiState, setApiState] = useState<ApiState>('loading');
  const [notice, setNotice] = useState('Connecting to CommerceCore API...');
  const [isSaving, setIsSaving] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<ProductFormState>(EMPTY_PRODUCT_FORM);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(EMPTY_CATEGORY_FORM);
  const [customerForm, setCustomerForm] = useState<CustomerFormState>(EMPTY_CUSTOMER_FORM);
  const [orderForm, setOrderForm] = useState<OrderFormState>(EMPTY_ORDER_FORM);
  const [stockMovementForm, setStockMovementForm] = useState<StockMovementFormState>(EMPTY_STOCK_MOVEMENT_FORM);

  useEffect(() => {
    let shouldUpdate = true;

    refreshDashboard(() => shouldUpdate);

    return () => {
      shouldUpdate = false;
    };
  }, []);

  const refreshDashboard = async (shouldUpdate: () => boolean = () => true) => {
    try {
      const data = await loadCommerceCoreData();

      if (!shouldUpdate()) {
        return;
      }

      setDashboardData(data);
      setApiState('live');
      setNotice('Live API data loaded from the Spring Boot backend.');
    } catch {
      if (!shouldUpdate()) {
        return;
      }

      setDashboardData(demoData);
      setApiState('fallback');
      setNotice('Backend is unavailable, so the UI is showing demo fallback data.');
    }
  };

  const { kpis, revenueSeries, products, orders, customers, stockMovements, categories } = dashboardData;
  const canMutate = apiState === 'live' && !isSaving;

  const handleProductSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canMutate) {
      return;
    }

    setIsSaving(true);
    try {
      const request = toProductRequest(productForm);
      if (editingProductId === null) {
        await createProduct(request);
        setNotice('Product created and dashboard data refreshed.');
      } else {
        await updateProduct(editingProductId, request);
        setNotice('Product updated and dashboard data refreshed.');
      }
      setProductForm(EMPTY_PRODUCT_FORM);
      setEditingProductId(null);
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Product operation failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProductEdit = (product: ProductResponse) => {
    setEditingProductId(product.id);
    setProductForm({
      sku: product.sku,
      name: product.name,
      description: product.description ?? '',
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
      lowStockThreshold: product.lowStockThreshold.toString(),
      active: product.active,
      categoryId: product.categoryId?.toString() ?? '',
    });
  };

  const handleProductDelete = async (product: ProductResponse) => {
    if (!canMutate || !window.confirm(`Delete ${product.name}?`)) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteProduct(product.id);
      setNotice('Product deleted and dashboard data refreshed.');
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Product delete failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCategorySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canMutate) {
      return;
    }

    setIsSaving(true);
    try {
      const request = toCategoryRequest(categoryForm);
      if (editingCategoryId === null) {
        await createCategory(request);
        setNotice('Category created and selectors refreshed.');
      } else {
        await updateCategory(editingCategoryId, request);
        setNotice('Category updated and product selectors refreshed.');
      }
      setCategoryForm(EMPTY_CATEGORY_FORM);
      setEditingCategoryId(null);
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Category operation failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCategoryEdit = (category: CategoryResponse) => {
    setEditingCategoryId(category.id);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description ?? '',
      active: category.active,
    });
  };

  const handleCategoryDelete = async (category: CategoryResponse) => {
    if (!canMutate || !window.confirm(`Delete ${category.name}?`)) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteCategory(category.id);
      setNotice('Category deleted and product selectors refreshed.');
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Category delete failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCustomerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canMutate) {
      return;
    }

    setIsSaving(true);
    try {
      if (editingCustomerId === null) {
        await createCustomer(customerForm);
        setNotice('Customer created and dashboard data refreshed.');
      } else {
        await updateCustomer(editingCustomerId, customerForm);
        setNotice('Customer updated and dashboard data refreshed.');
      }
      setCustomerForm(EMPTY_CUSTOMER_FORM);
      setEditingCustomerId(null);
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Customer operation failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCustomerEdit = (customer: CustomerResponse) => {
    setEditingCustomerId(customer.id);
    setCustomerForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone ?? '',
    });
  };

  const handleCustomerDelete = async (customer: CustomerResponse) => {
    if (!canMutate || !window.confirm(`Delete ${customer.firstName} ${customer.lastName}?`)) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteCustomer(customer.id);
      setNotice('Customer deleted and dashboard data refreshed.');
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Customer delete failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOrderSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canMutate) {
      return;
    }

    setIsSaving(true);
    try {
      await createOrder({
        customerId: Number(orderForm.customerId),
        items: [{ productId: Number(orderForm.productId), quantity: Number(orderForm.quantity) }],
      });
      setOrderForm(EMPTY_ORDER_FORM);
      setNotice('Order created and dashboard data refreshed.');
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Order create failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOrderStatusChange = async (order: OrderResponse, status: OrderStatus) => {
    if (!canMutate || status === order.status) {
      return;
    }

    setIsSaving(true);
    try {
      await updateOrderStatus(order.id, status);
      setNotice(`Order ${order.orderNumber} moved to ${formatStatus(status)}.`);
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Order status update failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStockMovementSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canMutate) {
      return;
    }

    setIsSaving(true);
    try {
      await createStockMovement({
        productId: Number(stockMovementForm.productId),
        type: stockMovementForm.type,
        quantity: Number(stockMovementForm.quantity),
        note: stockMovementForm.note,
      });
      setStockMovementForm(EMPTY_STOCK_MOVEMENT_FORM);
      setNotice('Stock movement recorded and inventory refreshed.');
      await refreshDashboard();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Stock movement failed.');
    } finally {
      setIsSaving(false);
    }
  };

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
          <a href="#categories">Categories</a>
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
              V1 now supports live product CRUD, category management, customer workflows, order creation,
              status updates, and dashboard refreshes against the Spring Boot API.
            </p>
          </div>
          <div className="status-card">
            <span>Backend API</span>
            <strong>/api/v1</strong>
            <small>Products, customers, orders, stock, dashboard</small>
            <ApiStatus state={apiState} />
          </div>
        </header>

        <section className="notice-bar" role="status">
          {notice}
        </section>

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

        <section className="management-grid" id="products">
          <ProductForm
            canMutate={canMutate}
            categories={categories}
            editingProductId={editingProductId}
            form={productForm}
            isSaving={isSaving}
            onCancel={() => {
              setEditingProductId(null);
              setProductForm(EMPTY_PRODUCT_FORM);
            }}
            onChange={setProductForm}
            onSubmit={handleProductSubmit}
          />
          <ProductTable
            canMutate={canMutate}
            exportUrl={apiState === 'live' ? getProductExportUrl() : null}
            onDelete={handleProductDelete}
            onEdit={handleProductEdit}
            products={products}
          />
        </section>

        <section className="grid-two" id="categories">
          <CategoryForm
            canMutate={canMutate}
            editingCategoryId={editingCategoryId}
            form={categoryForm}
            isSaving={isSaving}
            onCancel={() => {
              setEditingCategoryId(null);
              setCategoryForm(EMPTY_CATEGORY_FORM);
            }}
            onChange={setCategoryForm}
            onSubmit={handleCategorySubmit}
          />
          <CategoryTable
            canMutate={canMutate}
            categories={categories}
            onDelete={handleCategoryDelete}
            onEdit={handleCategoryEdit}
          />
        </section>

        <section className="grid-two" id="customers">
          <CustomerForm
            canMutate={canMutate}
            editingCustomerId={editingCustomerId}
            form={customerForm}
            isSaving={isSaving}
            onCancel={() => {
              setEditingCustomerId(null);
              setCustomerForm(EMPTY_CUSTOMER_FORM);
            }}
            onChange={setCustomerForm}
            onSubmit={handleCustomerSubmit}
          />
          <CustomerTable
            canMutate={canMutate}
            customers={customers}
            onDelete={handleCustomerDelete}
            onEdit={handleCustomerEdit}
          />
        </section>

        <section className="grid-two" id="orders">
          <OrderForm
            canMutate={canMutate}
            customers={customers}
            form={orderForm}
            isSaving={isSaving}
            onChange={setOrderForm}
            onSubmit={handleOrderSubmit}
            products={products}
          />
          <OrderTable canMutate={canMutate} onStatusChange={handleOrderStatusChange} orders={orders} />
        </section>

        <section className="grid-two" id="stock">
          <StockMovementForm
            canMutate={canMutate}
            form={stockMovementForm}
            isSaving={isSaving}
            onChange={setStockMovementForm}
            onSubmit={handleStockMovementSubmit}
            products={products}
          />
          <StockTable movements={stockMovements} />
        </section>
      </section>
    </main>
  );
}

function ProductForm({
  canMutate,
  categories,
  editingProductId,
  form,
  isSaving,
  onCancel,
  onChange,
  onSubmit,
}: {
  canMutate: boolean;
  categories: CategoryResponse[];
  editingProductId: number | null;
  form: ProductFormState;
  isSaving: boolean;
  onCancel: () => void;
  onChange: (value: ProductFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <article className="panel form-panel">
      <div className="panel-heading">
        <p className="eyebrow">Product management</p>
        <h3>{editingProductId === null ? 'Create product' : 'Edit product'}</h3>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          SKU
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, sku: event.target.value })}
            required
            value={form.sku}
          />
        </label>
        <label>
          Name
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, name: event.target.value })}
            required
            value={form.name}
          />
        </label>
        <label className="span-two">
          Description
          <textarea
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, description: event.target.value })}
            value={form.description}
          />
        </label>
        <label>
          Price
          <input
            disabled={!canMutate}
            min="0"
            onChange={(event) => onChange({ ...form, price: event.target.value })}
            required
            step="0.01"
            type="number"
            value={form.price}
          />
        </label>
        <label>
          Category
          <select
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, categoryId: event.target.value })}
            value={form.categoryId}
          >
            <option value="">Uncategorized</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Stock
          <input
            disabled={!canMutate}
            min="0"
            onChange={(event) => onChange({ ...form, stockQuantity: event.target.value })}
            required
            type="number"
            value={form.stockQuantity}
          />
        </label>
        <label>
          Low stock threshold
          <input
            disabled={!canMutate}
            min="0"
            onChange={(event) => onChange({ ...form, lowStockThreshold: event.target.value })}
            required
            type="number"
            value={form.lowStockThreshold}
          />
        </label>
        <label className="checkbox-row span-two">
          <input
            checked={form.active}
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, active: event.target.checked })}
            type="checkbox"
          />
          Active product
        </label>
        <div className="form-actions span-two">
          <button disabled={!canMutate} type="submit">
            {isSaving ? 'Saving...' : editingProductId === null ? 'Create product' : 'Update product'}
          </button>
          {editingProductId !== null && (
            <button className="button-secondary" onClick={onCancel} type="button">
              Cancel edit
            </button>
          )}
        </div>
      </form>
    </article>
  );
}

function ProductTable({
  canMutate,
  exportUrl,
  onDelete,
  onEdit,
  products,
}: {
  canMutate: boolean;
  exportUrl: string | null;
  onDelete: (product: ProductResponse) => void;
  onEdit: (product: ProductResponse) => void;
  products: ProductResponse[];
}) {
  return (
    <article className="panel table-panel">
      <div className="panel-heading">
        <p className="eyebrow">Inventory</p>
        <div className="heading-row">
          <h3>Products</h3>
          {exportUrl && (
            <a className="export-link" download href={exportUrl}>
              Export CSV
            </a>
          )}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.categoryName ?? 'Uncategorized'}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <span className={`badge badge-${getStockStatus(product).tone}`}>{getStockStatus(product).label}</span>
                  {!product.active && <span className="badge badge-muted">Inactive</span>}
                </td>
                <td className="action-cell">
                  <button className="table-button" disabled={!canMutate} onClick={() => onEdit(product)} type="button">
                    Edit
                  </button>
                  <button
                    className="table-button danger"
                    disabled={!canMutate}
                    onClick={() => onDelete(product)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function CategoryForm({
  canMutate,
  editingCategoryId,
  form,
  isSaving,
  onCancel,
  onChange,
  onSubmit,
}: {
  canMutate: boolean;
  editingCategoryId: number | null;
  form: CategoryFormState;
  isSaving: boolean;
  onCancel: () => void;
  onChange: (value: CategoryFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <article className="panel form-panel">
      <div className="panel-heading">
        <p className="eyebrow">Category management</p>
        <h3>{editingCategoryId === null ? 'Create category' : 'Edit category'}</h3>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Name
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, name: event.target.value, slug: slugify(event.target.value) })}
            required
            value={form.name}
          />
        </label>
        <label>
          Slug
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, slug: event.target.value })}
            required
            value={form.slug}
          />
        </label>
        <label className="span-two">
          Description
          <textarea
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, description: event.target.value })}
            value={form.description}
          />
        </label>
        <label className="checkbox-row span-two">
          <input
            checked={form.active}
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, active: event.target.checked })}
            type="checkbox"
          />
          Active category
        </label>
        <div className="form-actions span-two">
          <button disabled={!canMutate} type="submit">
            {isSaving ? 'Saving...' : editingCategoryId === null ? 'Create category' : 'Update category'}
          </button>
          {editingCategoryId !== null && (
            <button className="button-secondary" onClick={onCancel} type="button">
              Cancel edit
            </button>
          )}
        </div>
      </form>
    </article>
  );
}

function CategoryTable({
  canMutate,
  categories,
  onDelete,
  onEdit,
}: {
  canMutate: boolean;
  categories: CategoryResponse[];
  onDelete: (category: CategoryResponse) => void;
  onEdit: (category: CategoryResponse) => void;
}) {
  return (
    <article className="panel table-panel">
      <div className="panel-heading">
        <p className="eyebrow">Catalog taxonomy</p>
        <h3>Categories</h3>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <span className={`badge ${category.active ? 'badge-success' : 'badge-muted'}`}>
                    {category.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="table-button" disabled={!canMutate} onClick={() => onEdit(category)} type="button">
                    Edit
                  </button>
                  <button
                    className="table-button danger"
                    disabled={!canMutate}
                    onClick={() => onDelete(category)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function CustomerForm({
  canMutate,
  editingCustomerId,
  form,
  isSaving,
  onCancel,
  onChange,
  onSubmit,
}: {
  canMutate: boolean;
  editingCustomerId: number | null;
  form: CustomerFormState;
  isSaving: boolean;
  onCancel: () => void;
  onChange: (value: CustomerFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <article className="panel form-panel">
      <div className="panel-heading">
        <p className="eyebrow">Customer management</p>
        <h3>{editingCustomerId === null ? 'Create customer' : 'Edit customer'}</h3>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          First name
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, firstName: event.target.value })}
            required
            value={form.firstName}
          />
        </label>
        <label>
          Last name
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, lastName: event.target.value })}
            required
            value={form.lastName}
          />
        </label>
        <label>
          Email
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, email: event.target.value })}
            required
            type="email"
            value={form.email}
          />
        </label>
        <label>
          Phone
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, phone: event.target.value })}
            value={form.phone}
          />
        </label>
        <div className="form-actions span-two">
          <button disabled={!canMutate} type="submit">
            {isSaving ? 'Saving...' : editingCustomerId === null ? 'Create customer' : 'Update customer'}
          </button>
          {editingCustomerId !== null && (
            <button className="button-secondary" onClick={onCancel} type="button">
              Cancel edit
            </button>
          )}
        </div>
      </form>
    </article>
  );
}

function CustomerTable({
  canMutate,
  customers,
  onDelete,
  onEdit,
}: {
  canMutate: boolean;
  customers: CustomerResponse[];
  onDelete: (customer: CustomerResponse) => void;
  onEdit: (customer: CustomerResponse) => void;
}) {
  return (
    <article className="panel table-panel">
      <div className="panel-heading">
        <p className="eyebrow">Accounts</p>
        <h3>Customers</h3>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone ?? 'Not provided'}</td>
                <td className="action-cell">
                  <button className="table-button" disabled={!canMutate} onClick={() => onEdit(customer)} type="button">
                    Edit
                  </button>
                  <button
                    className="table-button danger"
                    disabled={!canMutate}
                    onClick={() => onDelete(customer)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function OrderForm({
  canMutate,
  customers,
  form,
  isSaving,
  onChange,
  onSubmit,
  products,
}: {
  canMutate: boolean;
  customers: CustomerResponse[];
  form: OrderFormState;
  isSaving: boolean;
  onChange: (value: OrderFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  products: ProductResponse[];
}) {
  return (
    <article className="panel form-panel">
      <div className="panel-heading">
        <p className="eyebrow">Order management</p>
        <h3>Create order</h3>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Customer
          <select
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, customerId: event.target.value })}
            required
            value={form.customerId}
          >
            <option value="">Select customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Product
          <select
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, productId: event.target.value })}
            required
            value={form.productId}
          >
            <option value="">Select product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity
          <input
            disabled={!canMutate}
            min="1"
            onChange={(event) => onChange({ ...form, quantity: event.target.value })}
            required
            type="number"
            value={form.quantity}
          />
        </label>
        <div className="form-actions">
          <button disabled={!canMutate} type="submit">
            {isSaving ? 'Saving...' : 'Create order'}
          </button>
        </div>
      </form>
    </article>
  );
}

function OrderTable({
  canMutate,
  onStatusChange,
  orders,
}: {
  canMutate: boolean;
  onStatusChange: (order: OrderResponse, status: OrderStatus) => void;
  orders: OrderResponse[];
}) {
  return (
    <article className="panel table-panel">
      <div className="panel-heading">
        <p className="eyebrow">Fulfillment</p>
        <h3>Orders</h3>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td>{formatCurrency(order.totalAmount)}</td>
                <td>{order.items.map((item) => `${item.quantity}x ${item.productName}`).join(', ')}</td>
                <td>
                  <select
                    className="status-select"
                    disabled={!canMutate}
                    onChange={(event) => onStatusChange(order, event.target.value as OrderStatus)}
                    value={order.status}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {formatStatus(status)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function StockMovementForm({
  canMutate,
  form,
  isSaving,
  onChange,
  onSubmit,
  products,
}: {
  canMutate: boolean;
  form: StockMovementFormState;
  isSaving: boolean;
  onChange: (value: StockMovementFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  products: ProductResponse[];
}) {
  return (
    <article className="panel form-panel">
      <div className="panel-heading">
        <p className="eyebrow">Inventory control</p>
        <h3>Record stock movement</h3>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Product
          <select
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, productId: event.target.value })}
            required
            value={form.productId}
          >
            <option value="">Select product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.stockQuantity} in stock)
              </option>
            ))}
          </select>
        </label>
        <label>
          Movement type
          <select
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, type: event.target.value as StockMovementType })}
            value={form.type}
          >
            {STOCK_MOVEMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {formatStockMovementType(type)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity
          <input
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, quantity: event.target.value })}
            required
            type="number"
            value={form.quantity}
          />
        </label>
        <label className="span-two">
          Note
          <textarea
            disabled={!canMutate}
            onChange={(event) => onChange({ ...form, note: event.target.value })}
            placeholder="Supplier restock, inventory audit, damaged stock..."
            value={form.note}
          />
        </label>
        <div className="form-actions span-two">
          <button disabled={!canMutate} type="submit">
            {isSaving ? 'Saving...' : 'Record movement'}
          </button>
        </div>
      </form>
    </article>
  );
}

function StockTable({ movements }: { movements: StockMovementResponse[] }) {
  return (
    <article className="panel table-panel">
      <div className="panel-heading">
        <p className="eyebrow">Inventory audit</p>
        <h3>Stock movements</h3>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{movement.productName}</td>
                <td><span className={`badge badge-${getMovementTone(movement.type)}`}>{movement.type}</span></td>
                <td>{movement.quantity}</td>
                <td>{movement.note ?? 'No note'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function ApiStatus({ state }: { state: ApiState }) {
  const label = {
    loading: 'Connecting to API',
    live: 'Live API data',
    fallback: 'Demo data fallback',
  }[state];

  return <span className={`api-state api-state-${state}`}>{label}</span>;
}

function toProductRequest(form: ProductFormState): ProductRequest {
  return {
    sku: form.sku,
    name: form.name,
    description: form.description,
    price: Number(form.price),
    stockQuantity: Number(form.stockQuantity),
    lowStockThreshold: Number(form.lowStockThreshold),
    active: form.active,
    categoryId: form.categoryId ? Number(form.categoryId) : null,
  };
}

function toCategoryRequest(form: CategoryFormState): CategoryRequest {
  return {
    name: form.name,
    slug: form.slug || slugify(form.name),
    description: form.description,
    active: form.active,
  };
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getStockStatus(product: ProductResponse): { label: string; tone: string } {
  if (product.stockQuantity <= 2) {
    return { label: 'Critical', tone: 'danger' };
  }

  if (product.stockQuantity <= product.lowStockThreshold) {
    return { label: 'Low stock', tone: 'warning' };
  }

  return { label: 'Healthy', tone: 'success' };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function formatStatus(value: OrderStatus): string {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatStockMovementType(value: StockMovementType): string {
  return value === 'IN' ? 'Stock in' : value === 'OUT' ? 'Stock out' : 'Adjustment';
}

function getMovementTone(value: StockMovementType): string {
  if (value === 'IN') {
    return 'success';
  }

  if (value === 'OUT') {
    return 'warning';
  }

  return 'muted';
}

export default App;
