import { seedProducts, seedReviews } from "@/data/seed";

export interface Product {
  id: string;
  code?: string;
  name: string;
  shortDescription: string;
  description?: string;
  category: string;
  material?: string;
  finish?: string;
  style?: string;
  dimensions?: string;
  leadTime?: string;
  price: number;
  imageUrl: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  status: string;
  createdAt: string;
}

// Global in-memory storage for products and orders (persists across requests during server runtime)
declare global {
  var __pariharProducts: Product[] | undefined;
  var __pariharOrders: Order[] | undefined;
}

if (!globalThis.__pariharProducts) {
  globalThis.__pariharProducts = [...seedProducts];
}

if (!globalThis.__pariharOrders) {
  globalThis.__pariharOrders = [];
}

export const getProducts = () => globalThis.__pariharProducts!;

export const getProductById = (id: string) =>
  globalThis.__pariharProducts!.find((p) => p.id === id);

export const addProduct = (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  globalThis.__pariharProducts!.unshift(newProduct);
  return newProduct;
};

export const deleteProduct = (id: string) => {
  const idx = globalThis.__pariharProducts!.findIndex((p) => p.id === id);
  if (idx !== -1) {
    globalThis.__pariharProducts!.splice(idx, 1);
    return true;
  }
  return false;
};

export const getOrders = () => globalThis.__pariharOrders!;

export const addOrder = (orderData: Omit<Order, "id" | "status" | "createdAt">) => {
  const orderId = `PF-${Date.now().toString().slice(-6)}`;
  const order: Order = {
    ...orderData,
    id: orderId,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  globalThis.__pariharOrders!.unshift(order);
  return order;
};

export const getReviews = () => seedReviews;
