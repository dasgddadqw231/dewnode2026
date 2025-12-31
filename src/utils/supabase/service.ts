
import { supabase } from '../../../utils/supabase/client';
import { Product, Order, OrderItem, Collection, HeroImage } from '../../app/utils/mockDb';

// Re-export types for convenience
export type { Product, Order, OrderItem, Collection, HeroImage };

export const dbService = {
    products: {
        getAll: async (): Promise<Product[]> => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Supabase Error (products.getAll):", error);
                throw error;
            }

            console.log("Supabase Data (products.getAll):", data);

            // Map columns if needed (e.g. detail_images -> detailImages)
            return data.map((p: any) => ({
                ...p,
                detailImages: p.detail_images,
                isSoldOut: p.is_sold_out,
                shippingInfo: p.shipping_info,
                createdAt: p.created_at
            }));
        },

        getById: async (id: string): Promise<Product | undefined> => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return undefined;

            return {
                ...data,
                detailImages: data.detail_images,
                isSoldOut: data.is_sold_out,
                shippingInfo: data.shipping_info,
                createdAt: data.created_at
            } as Product;
        },

        add: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
            // Convert camelCase to snake_case for DB
            const dbProduct = {
                name: product.name,
                price: product.price,
                image: product.image,
                detail_images: product.detailImages,
                description: product.description,
                details: product.details,
                shipping_info: product.shippingInfo,
                tags: product.tags,
                stock: product.stock,
                is_sold_out: product.isSoldOut
            };

            const { data, error } = await supabase
                .from('products')
                .insert(dbProduct)
                .select()
                .single();

            if (error) throw error;

            return {
                ...data,
                detailImages: data.detail_images,
                isSoldOut: data.is_sold_out,
                shippingInfo: data.shipping_info,
                createdAt: data.created_at
            } as Product;
        },

        update: async (id: string, updates: Partial<Product>) => {
            const dbUpdates: any = {};
            if (updates.name !== undefined) dbUpdates.name = updates.name;
            if (updates.price !== undefined) dbUpdates.price = updates.price;
            if (updates.image !== undefined) dbUpdates.image = updates.image;
            if (updates.detailImages !== undefined) dbUpdates.detail_images = updates.detailImages;
            if (updates.description !== undefined) dbUpdates.description = updates.description;
            if (updates.details !== undefined) dbUpdates.details = updates.details;
            if (updates.shippingInfo !== undefined) dbUpdates.shipping_info = updates.shippingInfo;
            if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
            if (updates.stock !== undefined) dbUpdates.stock = updates.stock;
            if (updates.isSoldOut !== undefined) dbUpdates.is_sold_out = updates.isSoldOut;

            const { error } = await supabase.from('products').update(dbUpdates).eq('id', id);
            if (error) throw error;
        },

        delete: async (id: string) => {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
        }
    },

    orders: {
        getAll: async (): Promise<Order[]> => {
            // We need to fetch orders and their items
            // Supabase join query
            const { data: orders, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items (*)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return orders.map((o: any) => ({
                id: o.id,
                email: o.email,
                totalAmount: o.total_amount,
                status: o.status,
                customerName: o.customer_name,
                customerAddress: o.customer_address,
                customerPhone: o.customer_phone,
                createdAt: o.created_at,
                items: o.order_items.map((i: any) => ({
                    productId: i.product_id,
                    quantity: i.quantity,
                    priceAtPurchase: i.price_at_purchase,
                    productName: i.product_name,
                    productImage: i.product_image
                }))
            }));
        },

        getByEmail: async (email: string): Promise<Order[]> => {
            const { data: orders, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items (*)
        `)
                .eq('email', email)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return orders.map((o: any) => ({
                id: o.id,
                email: o.email,
                totalAmount: o.total_amount,
                status: o.status,
                customerName: o.customer_name,
                customerAddress: o.customer_address,
                customerPhone: o.customer_phone,
                createdAt: o.created_at,
                items: o.order_items.map((i: any) => ({
                    productId: i.product_id,
                    quantity: i.quantity,
                    priceAtPurchase: i.price_at_purchase,
                    productName: i.product_name,
                    productImage: i.product_image
                }))
            }));
        },

        create: async (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
            // 1. Create Order
            const newOrder = {
                id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                email: order.email,
                total_amount: order.totalAmount,
                status: 'PENDING',
                customer_name: order.customerName,
                customer_address: order.customerAddress,
                customer_phone: order.customerPhone
            };

            const { error: orderError } = await supabase.from('orders').insert(newOrder);
            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = order.items.map(item => ({
                order_id: newOrder.id,
                product_id: item.productId,
                quantity: item.quantity,
                price_at_purchase: item.priceAtPurchase,
                product_name: item.productName,
                product_image: item.productImage
            }));

            const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
            if (itemsError) throw itemsError;

            return newOrder;
        },

        updateStatus: async (id: string, status: Order['status']) => {
            const { error } = await supabase.from('orders').update({ status }).eq('id', id);
            if (error) throw error;
        }
    },

    collections: {
        getAll: async (): Promise<Collection[]> => {
            const { data, error } = await supabase.from('collections').select('*');
            if (error) throw error;
            return data as Collection[];
        },

        add: async (col: Omit<Collection, 'id'>) => {
            // Delete existing at position logic could be handled here or in UI.
            // For simplicity, just insert.
            const { error } = await supabase.from('collections').insert(col);
            if (error) throw error;
        },

        delete: async (id: string) => {
            const { error } = await supabase.from('collections').delete().eq('id', id);
            if (error) throw error;
        }
    },

    hero: {
        getAll: async (): Promise<HeroImage[]> => {
            const { data, error } = await supabase.from('hero_images').select('*').order('display_order', { ascending: true });
            if (error) throw error;

            return data.map((h: any) => ({
                id: h.id,
                image: h.image,
                title: h.title,
                order: h.display_order
            }));
        },

        add: async (img: string, title?: string) => {
            // Get max order
            // For simple add, just append.
            const { error } = await supabase.from('hero_images').insert({
                image: img,
                title,
                display_order: 999
            });
            if (error) throw error;
        },

        update: async (id: string, updates: Partial<HeroImage>) => {
            const dbUpdates: any = {};
            if (updates.image) dbUpdates.image = updates.image;
            if (updates.title) dbUpdates.title = updates.title;
            if (updates.order !== undefined) dbUpdates.display_order = updates.order;

            const { error } = await supabase.from('hero_images').update(dbUpdates).eq('id', id);
            if (error) throw error;
        },

        delete: async (id: string) => {
            const { error } = await supabase.from('hero_images').delete().eq('id', id);
            if (error) throw error;
        }
    }
};
