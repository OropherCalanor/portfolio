import { demoData } from '../adminData';
import type {
  AdminDashboardData,
  CategoryRequest,
  CategoryResponse,
  CreateOrderRequest,
  CustomerRequest,
  CustomerResponse,
  DashboardSummaryResponse,
  OrderResponse,
  OrderStatus,
  ProductRequest,
  ProductResponse,
  StockMovementRequest,
  StockMovementResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8090/api/v1';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export async function loadCommerceCoreData(): Promise<AdminDashboardData> {
  const [summary, categories, products, orders, customers, stockMovements] = await Promise.all([
    get<DashboardSummaryResponse>('/dashboard/summary'),
    get<CategoryResponse[]>('/categories'),
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
    categories,
    products,
    orders,
    customers,
    stockMovements,
  };
}

export function createProduct(request: ProductRequest): Promise<ProductResponse> {
  return post<ProductRequest, ProductResponse>('/products', request);
}

export function createCategory(request: CategoryRequest): Promise<CategoryResponse> {
  return post<CategoryRequest, CategoryResponse>('/categories', request);
}

export function updateCategory(id: number, request: CategoryRequest): Promise<CategoryResponse> {
  return put<CategoryRequest, CategoryResponse>(`/categories/${id}`, request);
}

export function deleteCategory(id: number): Promise<void> {
  return del(`/categories/${id}`);
}

export function updateProduct(id: number, request: ProductRequest): Promise<ProductResponse> {
  return put<ProductRequest, ProductResponse>(`/products/${id}`, request);
}

export function deleteProduct(id: number): Promise<void> {
  return del(`/products/${id}`);
}

export function createCustomer(request: CustomerRequest): Promise<CustomerResponse> {
  return post<CustomerRequest, CustomerResponse>('/customers', request);
}

export function updateCustomer(id: number, request: CustomerRequest): Promise<CustomerResponse> {
  return put<CustomerRequest, CustomerResponse>(`/customers/${id}`, request);
}

export function deleteCustomer(id: number): Promise<void> {
  return del(`/customers/${id}`);
}

export function createOrder(request: CreateOrderRequest): Promise<OrderResponse> {
  return post<CreateOrderRequest, OrderResponse>('/orders', request);
}

export function updateOrderStatus(id: number, status: OrderStatus): Promise<OrderResponse> {
  return put<{ status: OrderStatus }, OrderResponse>(`/orders/${id}`, { status });
}

export function createStockMovement(request: StockMovementRequest): Promise<StockMovementResponse> {
  return post<StockMovementRequest, StockMovementResponse>('/stock/movements', request);
}

async function get<T>(path: string): Promise<T> {
  return request<T>(path);
}

async function post<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
  return request<TResponse>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

async function put<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
  return request<TResponse>(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

async function del(path: string): Promise<void> {
  await request<null>(path, { method: 'DELETE' });
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const body = (await response.json()) as ApiResponse<T>;

  if (!body.success) {
    throw new Error(body.message);
  }

  return body.data;
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message ?? `CommerceCore API request failed: ${response.status}`;
  } catch {
    return `CommerceCore API request failed: ${response.status}`;
  }
}
