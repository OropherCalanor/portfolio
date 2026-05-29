export type OrderStatus = 'DRAFT' | 'PAID' | 'FULFILLED' | 'CANCELLED';

export type Kpi = {
  label: string;
  value: string;
  trend: string;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
};

export type CategoryResponse = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
};

export type ProductResponse = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  lowStockThreshold: number;
  active: boolean;
  categoryId: number | null;
  categoryName: string | null;
};

export type ProductRequest = {
  sku: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  lowStockThreshold: number;
  active: boolean;
  categoryId: number | null;
};

export type CustomerResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

export type CustomerRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type OrderItemResponse = {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderResponse = {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  customerId: number;
  customerName: string;
  items: OrderItemResponse[];
};

export type CreateOrderRequest = {
  customerId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
};

export type StockMovementResponse = {
  id: number;
  productId: number;
  productName: string;
  type: string;
  quantity: number;
  note: string | null;
};

export type DashboardSummaryResponse = {
  productCount: number;
  categoryCount: number;
  customerCount: number;
  orderCount: number;
  lowStockProductCount: number;
};

export type AdminDashboardData = {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  categories: CategoryResponse[];
  products: ProductResponse[];
  orders: OrderResponse[];
  customers: CustomerResponse[];
  stockMovements: StockMovementResponse[];
};
