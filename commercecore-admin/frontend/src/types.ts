export type Kpi = {
  label: string;
  value: string;
  trend: string;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
};

export type ProductRow = {
  sku: string;
  name: string;
  category: string;
  stock: number;
  status: string;
};

export type OrderRow = {
  id: string;
  customer: string;
  total: string;
  status: string;
};

export type CustomerRow = {
  name: string;
  email: string;
  orders: string;
  value: string;
};

export type StockMovementRow = {
  product: string;
  type: string;
  quantity: number;
  note: string;
};

export type AdminDashboardData = {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  products: ProductRow[];
  orders: OrderRow[];
  customers: CustomerRow[];
  stockMovements: StockMovementRow[];
};
