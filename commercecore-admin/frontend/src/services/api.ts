import { demoData } from '../adminData';
import type {
  AdminDashboardData,
  CustomerRow,
  OrderRow,
  ProductRow,
  StockMovementRow,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8090/api/v1';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

type DashboardSummaryResponse = {
  productCount: number;
  customerCount: number;
  orderCount: number;
  lowStockProductCount: number;
};

type ProductResponse = {
  sku: string;
  name: string;
  stockQuantity: number;
  lowStockThreshold: number;
  categoryName: string | null;
};

type OrderResponse = {
  orderNumber: string;
  status: string;
  totalAmount: number;
  customerName: string;
};

type CustomerResponse = {
  firstName: string;
  lastName: string;
  email: string;
};

type StockMovementResponse = {
  productName: string;
  type: string;
  quantity: number;
  note: string;
};

export async function loadCommerceCoreData(): Promise<AdminDashboardData> {
  const [summary, products, orders, customers, stockMovements] = await Promise.all([
    get<DashboardSummaryResponse>('/dashboard/summary'),
    get<ProductResponse[]>('/products'),
    get<OrderResponse[]>('/orders'),
    get<CustomerResponse[]>('/customers'),
    get<StockMovementResponse[]>('/stock/movements'),
  ]);

  return {
    kpis: [
      { label: 'Products', value: summary.productCount.toString(), trend: 'from live API' },
      { label: 'Orders', value: summary.orderCount.toString(), trend: 'tracked records' },
      { label: 'Low stock SKUs', value: summary.lowStockProductCount.toString(), trend: 'needs review' },
      { label: 'Customers', value: summary.customerCount.toString(), trend: 'active accounts' },
    ],
    revenueSeries: demoData.revenueSeries,
    products: products.map(toProductRow),
    orders: orders.map(toOrderRow),
    customers: customers.map(toCustomerRow),
    stockMovements: stockMovements.map(toStockMovementRow),
  };
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`CommerceCore API request failed: ${response.status}`);
  }

  const body = (await response.json()) as ApiResponse<T>;

  if (!body.success) {
    throw new Error(body.message);
  }

  return body.data;
}

function toProductRow(product: ProductResponse): ProductRow {
  return {
    sku: product.sku,
    name: product.name,
    category: product.categoryName ?? 'Uncategorized',
    stock: product.stockQuantity,
    status: getStockStatus(product.stockQuantity, product.lowStockThreshold),
  };
}

function toOrderRow(order: OrderResponse): OrderRow {
  return {
    id: order.orderNumber,
    customer: order.customerName,
    total: formatCurrency(order.totalAmount),
    status: toTitleCase(order.status),
  };
}

function toCustomerRow(customer: CustomerResponse): CustomerRow {
  return {
    name: `${customer.firstName} ${customer.lastName}`,
    email: customer.email,
    orders: 'API linked',
    value: 'Coming soon',
  };
}

function toStockMovementRow(movement: StockMovementResponse): StockMovementRow {
  return {
    product: movement.productName,
    type: movement.type,
    quantity: movement.quantity,
    note: movement.note,
  };
}

function getStockStatus(stockQuantity: number, lowStockThreshold: number): string {
  if (stockQuantity <= 2) {
    return 'Critical';
  }

  if (stockQuantity <= lowStockThreshold) {
    return 'Low stock';
  }

  return 'Healthy';
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
