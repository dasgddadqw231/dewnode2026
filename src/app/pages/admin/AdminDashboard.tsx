<<<<<<< HEAD
import { useState, useEffect } from "react";
import { dbService } from "../../../utils/supabase/service";

export function AdminDashboard() {
  const [stats, setStats] = useState({ sales: 0, orders: 0, products: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const orders = await dbService.orders.getAll();
        const products = await dbService.products.getAll();

        const sales = orders.reduce((acc, order) => {
          if (['PAID', 'SHIPPED', 'COMPLETED'].includes(order.status)) {
            return acc + order.totalAmount;
          }
          return acc;
        }, 0);

        setStats({
          sales,
          orders: orders.length,
          products: products.length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

=======
export function AdminDashboard() {
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">DASHBOARD</h1>
        <p className="text-[11px] text-brand-light/40 uppercase tracking-widest leading-relaxed">
          Welcome to DEW&ODE administration. Overview of your store performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Total Sales</p>
<<<<<<< HEAD
          <p className="text-2xl font-light tracking-widest text-brand-cyan">{stats.sales.toLocaleString()} KRW</p>
        </div>
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Total Orders</p>
          <p className="text-2xl font-light tracking-widest text-brand-cyan">{stats.orders}</p>
        </div>
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Active Products</p>
          <p className="text-2xl font-light tracking-widest text-brand-cyan">{stats.products}</p>
=======
          <p className="text-2xl font-light tracking-widest text-brand-cyan">0 KRW</p>
        </div>
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Total Orders</p>
          <p className="text-2xl font-light tracking-widest text-brand-cyan">0</p>
        </div>
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Active Products</p>
          <p className="text-2xl font-light tracking-widest text-brand-cyan">4</p>
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
        </div>
      </div>
    </div>
  );
}