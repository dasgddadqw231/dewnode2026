import { nanoid } from 'nanoid';
const providedImage = 'https://images.unsplash.com/photo-1705948731485-6e4c6c180d0d?q=80&w=1000&auto=format&fit=crop';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  detailImages?: string[];
  description?: string;
  details?: string;
  shippingInfo?: string;
  tags?: string[];
  stock: number;
  isSoldOut: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  productName: string;
  productImage: string;
}

export interface Order {
  id: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'COMPLETED' | 'TvCancelled';
  createdAt: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  trackingNumber?: string;
}

export interface Collection {
  id: string;
  image: string;
  row: number;
  col: number;
}

export interface HeroImage {
  id: string;
  image: string;
  title?: string;
  order: number;
}

// Initial Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'STAINLESS PLATE 240',
    price: 48000,
    image: providedImage,
    stock: 10,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'BRUSHED METAL BOWL',
    price: 36000,
    image: 'https://images.unsplash.com/photo-1705948731485-6e4c6c180d0d?q=80&w=1000&auto=format&fit=crop',
    stock: 15,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'INDUSTRIAL CUTLERY SET',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1616447194074-200c22166a5e?q=80&w=1000&auto=format&fit=crop',
    stock: 20,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'CYLINDRICAL STORAGE 01',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1699349360395-58ae635530f8?q=80&w=1000&auto=format&fit=crop',
    stock: 8,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'METAL TRAY LARGE',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1658472326330-2e7bea174f75?q=80&w=1000&auto=format&fit=crop',
    stock: 5,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'PRECISION FORK',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1699484477621-1f6ecb1d153f?q=80&w=1000&auto=format&fit=crop',
    stock: 50,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'MINIMAL STEEL CUP',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1676496220014-43540212ef5b?q=80&w=1000&auto=format&fit=crop',
    stock: 30,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'STAINLESS PLATE 180',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1705948731485-6e4c6c180d0d?q=80&w=1000&auto=format&fit=crop',
    stock: 12,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'METAL STORAGE JAR S',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1699349360395-58ae635530f8?q=80&w=1000&auto=format&fit=crop',
    stock: 18,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'INDUSTRIAL SPOON',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1699484477621-1f6ecb1d153f?q=80&w=1000&auto=format&fit=crop',
    stock: 45,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'STEEL BREAD TRAY',
    price: 64000,
    image: 'https://images.unsplash.com/photo-1658472326330-2e7bea174f75?q=80&w=1000&auto=format&fit=crop',
    stock: 7,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'MINIMAL CARAFE METAL',
    price: 92000,
    image: 'https://images.unsplash.com/photo-1676496220014-43540212ef5b?q=80&w=1000&auto=format&fit=crop',
    stock: 4,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '13',
    name: 'PRECISION KNIFE',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1616447194074-200c22166a5e?q=80&w=1000&auto=format&fit=crop',
    stock: 25,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '14',
    name: 'METAL BASE STAND',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1699349360395-58ae635530f8?q=80&w=1000&auto=format&fit=crop',
    stock: 3,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '15',
    name: 'STAINLESS PLATE SET',
    price: 145000,
    image: providedImage,
    stock: 6,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  }
];

const INITIAL_HERO_IMAGES: HeroImage[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1616447194074-200c22166a5e?q=80&w=2000&auto=format&fit=crop',
    order: 0,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1699484477621-1f6ecb1d153f?q=80&w=2000&auto=format&fit=crop',
    order: 1,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1658472326330-2e7bea174f75?q=80&w=2000&auto=format&fit=crop',
    order: 2,
  }
];

const INITIAL_COLLECTIONS: Collection[] = [];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_001',
    email: 'kim@example.com',
    items: [
      {
        productId: '1',
        quantity: 2,
        priceAtPurchase: 48000,
        productName: 'STAINLESS PLATE 240',
        productImage: providedImage
      },
      {
        productId: '7',
        quantity: 1,
        priceAtPurchase: 24000,
        productName: 'MINIMAL STEEL CUP',
        productImage: 'https://images.unsplash.com/photo-1676496220014-43540212ef5b?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    totalAmount: 120000,
    status: 'PAID',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    customerName: 'Minji Kim',
    customerAddress: 'Seoul, Gangnam-gu',
    customerPhone: '010-1234-5678'
  },
  {
    id: 'ord_002',
    email: 'lee@example.com',
    items: [
      {
        productId: '5',
        quantity: 1,
        priceAtPurchase: 85000,
        productName: 'METAL TRAY LARGE',
        productImage: 'https://images.unsplash.com/photo-1658472326330-2e7bea174f75?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    totalAmount: 85000,
    status: 'SHIPPED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    customerName: 'Sujin Lee',
    customerAddress: 'Busan, Haeundae-gu',
    customerPhone: '010-9876-5432'
  },
  {
    id: 'ord_003',
    email: 'park@example.com',
    items: [
      {
        productId: '1',
        quantity: 4,
        priceAtPurchase: 48000,
        productName: 'STAINLESS PLATE 240',
        productImage: providedImage
      }
    ],
    totalAmount: 192000,
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    customerName: 'Junho Park',
    customerAddress: 'Incheon, Yeonsu-gu',
    customerPhone: '010-5555-4444'
  }
];

// IN-MEMORY STORAGE
// We use in-memory storage instead of localStorage to avoid QuotaExceededError
// when storing large base64 image strings.
const STORAGE: Record<string, any> = {
  products: INITIAL_PRODUCTS,
  orders: INITIAL_ORDERS,
  collections: INITIAL_COLLECTIONS,
  hero: INITIAL_HERO_IMAGES
};

// DB Interface
export const db = {
  products: {
    getAll: () => STORAGE.products as Product[],
    getById: (id: string) => (STORAGE.products as Product[]).find(p => p.id === id),
    add: (product: Omit<Product, 'id' | 'createdAt'>) => {
      const newProduct = { ...product, id: nanoid(), createdAt: new Date().toISOString() };
      STORAGE.products = [newProduct, ...STORAGE.products];
      return newProduct;
    },
    update: (id: string, updates: Partial<Product>) => {
      STORAGE.products = STORAGE.products.map((p: Product) => p.id === id ? { ...p, ...updates } : p);
    },
    delete: (id: string) => {
      STORAGE.products = STORAGE.products.filter((p: Product) => p.id !== id);
    }
  },
  orders: {
    getAll: () => STORAGE.orders as Order[],
    getByEmail: (email: string) => (STORAGE.orders as Order[]).filter(o => o.email === email),
    create: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
      const newOrder: Order = {
        ...order,
        id: nanoid(),
        createdAt: new Date().toISOString(),
        status: 'PENDING'
      };
      STORAGE.orders = [newOrder, ...STORAGE.orders];
      return newOrder;
    },
    updateStatus: (id: string, status: Order['status']) => {
      STORAGE.orders = STORAGE.orders.map((o: Order) => o.id === id ? { ...o, status } : o);
    }
  },
  collections: {
    getAll: () => STORAGE.collections as Collection[],
    add: (col: Omit<Collection, 'id'>) => {
      // Remove existing item at same position if any
      STORAGE.collections = STORAGE.collections.filter((c: Collection) => c.row !== col.row || c.col !== col.col);

      const newCol = { ...col, id: nanoid() };
      STORAGE.collections = [...STORAGE.collections, newCol];
    },
    delete: (id: string) => {
      STORAGE.collections = STORAGE.collections.filter((c: Collection) => c.id !== id);
    }
  },
  hero: {
    getAll: () => STORAGE.hero as HeroImage[],
    add: (img: string, title?: string) => {
      const newImg = { id: nanoid(), image: img, title, order: STORAGE.hero.length };
      STORAGE.hero = [...STORAGE.hero, newImg];
    },
    update: (id: string, updates: Partial<HeroImage>) => {
      STORAGE.hero = STORAGE.hero.map((h: HeroImage) => h.id === id ? { ...h, ...updates } : h);
    },
    delete: (id: string) => {
      STORAGE.hero = STORAGE.hero.filter((i: HeroImage) => i.id !== id);
    }
  }
};