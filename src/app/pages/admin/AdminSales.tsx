import { useState, useEffect } from 'react';
import { dbService } from '../../../utils/supabase/service';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesData {
  productId: string;
  productName: string;
  totalRevenue: number;
  totalQuantity: number;
}

export function AdminSales() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const orders = await dbService.orders.getAll();
        const productStats: Record<string, SalesData> = {};

        orders.forEach(order => {
          // Filter out cancelled orders if necessary
          if (order.status === 'TvCancelled') return;

          order.items.forEach(item => {
            if (!productStats[item.productId]) {
              productStats[item.productId] = {
                productId: item.productId,
                productName: item.productName,
                totalRevenue: 0,
                totalQuantity: 0
              };
            }
            productStats[item.productId].totalRevenue += item.priceAtPurchase * item.quantity;
            productStats[item.productId].totalQuantity += item.quantity;
          });
        });

        // Convert to array and sort by revenue
        const statsArray = Object.values(productStats).sort((a, b) => b.totalRevenue - a.totalRevenue);
        setSalesData(statsArray);
      } catch (error) {
        console.error("Failed to fetch sales data", error);
      }
    };
    fetchSalesData();
  }, []);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">SALES ANALYTICS</h1>
        <p className="text-[11px] text-brand-light/40 uppercase tracking-widest leading-relaxed">
          Detailed breakdown of product performance and revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="border border-brand-gray bg-brand-gray/5 p-6 space-y-6">
          <h2 className="text-sm font-light tracking-widest text-brand-light uppercase">Revenue by Product</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="productName"
                  tick={{ fill: '#666', fontSize: 10 }}
                  axisLine={{ stroke: '#333' }}
                  tickLine={false}
                  interval={0}
                  angle={0}
                  textAnchor="middle"
                  height={40}
                />
                <YAxis
                  tick={{ fill: '#666', fontSize: 10 }}
                  axisLine={{ stroke: '#333' }}
                  tickLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#00E2E3' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  formatter={(value: number) => [`${value.toLocaleString()} KRW`, 'Revenue']}
                />
                <Bar dataKey="totalRevenue" fill="#00E2E3" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quantity Chart */}
        <div className="border border-brand-gray bg-brand-gray/5 p-6 space-y-6">
          <h2 className="text-sm font-light tracking-widest text-brand-light uppercase">Sales Volume by Product</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="productName"
                  tick={{ fill: '#666', fontSize: 10 }}
                  axisLine={{ stroke: '#333' }}
                  tickLine={false}
                  interval={0}
                  angle={0}
                  textAnchor="middle"
                  height={40}
                />
                <YAxis
                  tick={{ fill: '#666', fontSize: 10 }}
                  axisLine={{ stroke: '#333' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#E2E3E4' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  formatter={(value: number) => [value, 'Units Sold']}
                />
                <Bar dataKey="totalQuantity" fill="#E2E3E4" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="border border-brand-gray bg-brand-gray/5">
        <div className="p-6 border-b border-brand-gray">
          <h2 className="text-sm font-light tracking-widest text-brand-light uppercase">Product Performance Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-gray/50">
                <th className="p-4 text-[10px] uppercase tracking-widest text-brand-light/40 font-normal">Product Name</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-brand-light/40 font-normal text-right">Unit Price (Avg)</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-brand-light/40 font-normal text-right">Units Sold</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-brand-light/40 font-normal text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item) => (
                <tr key={item.productId} className="border-b border-brand-gray/20 hover:bg-brand-gray/10 transition-colors">
                  <td className="p-4 text-xs text-brand-light font-light tracking-wide">{item.productName}</td>
                  <td className="p-4 text-xs text-brand-light font-light tracking-wide text-right">
                    {(item.totalRevenue / item.totalQuantity).toLocaleString()} KRW
                  </td>
                  <td className="p-4 text-xs text-brand-light font-light tracking-wide text-right">
                    {item.totalQuantity}
                  </td>
                  <td className="p-4 text-xs text-brand-cyan font-light tracking-wide text-right">
                    {item.totalRevenue.toLocaleString()} KRW
                  </td>
                </tr>
              ))}
              {salesData.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-xs text-brand-light/40 uppercase tracking-widest">
                    No sales data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}