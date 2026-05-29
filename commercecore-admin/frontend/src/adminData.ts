import type { AdminDashboardData } from './types';

export const demoData: AdminDashboardData = {
  kpis: [
    { label: 'Monthly revenue', value: '$48.2K', trend: '+14.8%' },
    { label: 'Open orders', value: '186', trend: '+22 today' },
    { label: 'Low stock SKUs', value: '12', trend: 'needs review' },
    { label: 'Active customers', value: '2,418', trend: '+7.4%' },
  ],

  revenueSeries: [
    { month: 'Jan', revenue: 28000 },
    { month: 'Feb', revenue: 34000 },
    { month: 'Mar', revenue: 31000 },
    { month: 'Apr', revenue: 42000 },
    { month: 'May', revenue: 48200 },
  ],

  products: [
    { sku: 'CC-KB-001', name: 'Mechanical Keyboard', category: 'Electronics', stock: 18, status: 'Healthy' },
    { sku: 'CC-HD-014', name: 'Studio Headphones', category: 'Audio', stock: 4, status: 'Low stock' },
    { sku: 'CC-CH-220', name: 'Ergonomic Chair', category: 'Office', stock: 9, status: 'Monitor' },
    { sku: 'CC-MN-088', name: '4K Monitor', category: 'Displays', stock: 2, status: 'Critical' },
  ],

  orders: [
    { id: 'ORD-8421', customer: 'Aylin Demir', total: '$249.90', status: 'Processing' },
    { id: 'ORD-8420', customer: 'Mert Kaya', total: '$89.50', status: 'Paid' },
    { id: 'ORD-8419', customer: 'Selin Aras', total: '$1,240.00', status: 'Shipped' },
  ],

  customers: [
    { name: 'Aylin Demir', email: 'aylin@example.com', orders: '8', value: '$1,830' },
    { name: 'Mert Kaya', email: 'mert@example.com', orders: '3', value: '$420' },
    { name: 'Selin Aras', email: 'selin@example.com', orders: '12', value: '$4,120' },
  ],

  stockMovements: [
    { product: '4K Monitor', type: 'OUT', quantity: 3, note: 'Order fulfillment' },
    { product: 'Studio Headphones', type: 'IN', quantity: 12, note: 'Supplier restock' },
    { product: 'Mechanical Keyboard', type: 'ADJUSTMENT', quantity: -1, note: 'Inventory audit' },
  ],
};
