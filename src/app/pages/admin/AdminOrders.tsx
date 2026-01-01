import { useState, useEffect } from "react";
import { dbService } from "../../../utils/supabase/service";
import { Order } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { Search, CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { format, subDays, startOfMonth, endOfMonth, startOfToday } from "date-fns";
import { cn } from "../../../lib/utils";

export function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);

    // UI States (Input values)
    const [statusInput, setStatusInput] = useState<string>("ALL");
    const [startDateInput, setStartDateInput] = useState<string>("");
    const [endDateInput, setEndDateInput] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [isMobile, setIsMobile] = useState(false);

    // Applied Filters (Used for filtering logic)
    const [activeFilters, setActiveFilters] = useState({
        status: "ALL",
        startDate: "",
        endDate: "",
        search: ""
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await dbService.orders.getAll();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const updateStatus = async (id: string, status: Order['status']) => {
        try {
            await dbService.orders.updateStatus(id, status);
            const updated = await dbService.orders.getAll();
            setOrders(updated);
            toast.success(`Status updated to ${status}`, {
                style: { backgroundColor: '#383838', color: '#00E2E3', borderRadius: '0', border: '1px solid #00E2E3', textTransform: 'uppercase', fontSize: '10px' }
            });
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Failed to update status");
        }
    };

    const updateTrackingNumber = async (id: string, trackingNumber: string) => {
        try {
            await dbService.orders.updateTracking(id, trackingNumber);
            setOrders(prev => prev.map(o => o.id === id ? { ...o, trackingNumber } : o));
            toast.success("Tracking number updated");
        } catch (error) {
            console.error("Failed to update tracking number", error);
            toast.error("Failed to update tracking number");
        }
    };

    const applyFilters = () => {
        setActiveFilters({
            status: statusInput,
            startDate: startDateInput,
            endDate: endDateInput,
            search: searchInput
        });
    };

    const setPreset = (days: number | 'month') => {
        const today = startOfToday();
        let start, end;

        if (days === 'month') {
            start = startOfMonth(today);
            end = endOfMonth(today);
        } else {
            end = today;
            start = subDays(today, days);
        }

        setStartDateInput(format(start, "yyyy-MM-dd"));
        setEndDateInput(format(end, "yyyy-MM-dd"));
    };

    // Filter Logic
    const filteredOrders = orders.filter(order => {
        // 1. Status Filter
        if (activeFilters.status !== 'ALL' && order.status !== activeFilters.status) return false;

        // 2. Date Filter
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);

        if (activeFilters.startDate) {
            const start = new Date(activeFilters.startDate);
            start.setHours(0, 0, 0, 0);
            if (orderDate < start) return false;
        }
        if (activeFilters.endDate) {
            const end = new Date(activeFilters.endDate);
            end.setHours(0, 0, 0, 0);
            if (orderDate > end) return false;
        }

        // 3. Search Filter
        if (activeFilters.search) {
            const query = activeFilters.search.toLowerCase();
            const matchName = order.customerName?.toLowerCase().includes(query);
            const matchEmail = order.email?.toLowerCase().includes(query);
            const matchId = order.id.toLowerCase().includes(query);
            if (!matchName && !matchEmail && !matchId) return false;
        }

        return true;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-8">
                <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">ORDERS</h1>

                {/* Filters Toolbar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-brand-gray/5 p-4 md:p-6 border border-brand-gray">

                    {/* Status (2 cols) */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Status</label>
                        <div className="relative w-full">
                            <select
                                value={statusInput}
                                onChange={(e) => setStatusInput(e.target.value)}
                                className="w-full bg-brand-black border border-brand-gray text-brand-light text-[11px] tracking-widest pl-3 pr-10 py-2 rounded-none focus:outline-none focus:border-brand-cyan h-10 appearance-none"
                            >
                                <option value="ALL">ALL STATUS</option>
                                <option value="PENDING">PENDING</option>
                                <option value="PAID">PAID</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="TvCancelled">CANCELLED</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-light/50 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    {/* Date Range (3 cols) */}
                    <div className="md:col-span-3 space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Date Range</label>
                        <div className="grid gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-brand-black border-brand-gray text-brand-light text-[10px] tracking-wide rounded-none h-10 uppercase hover:bg-brand-gray/10 hover:text-brand-light px-3",
                                            !startDateInput && "text-brand-light/40"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-3 w-3" />
                                        {startDateInput ? (
                                            endDateInput ? (
                                                <>
                                                    {format(new Date(startDateInput), "LLL dd, y")} -{" "}
                                                    {format(new Date(endDateInput), "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(new Date(startDateInput), "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 border-brand-gray" align="start">
                                    <div className="flex flex-col md:flex-row bg-brand-black max-h-[80vh] overflow-y-auto md:overflow-visible">
                                        <div className="flex md:flex-col gap-2 p-2 border-b md:border-b-0 md:border-r border-brand-gray bg-brand-gray/5 w-full md:w-[140px] overflow-x-auto md:overflow-visible">
                                            <div className="hidden md:block px-2 py-1 text-[10px] font-medium text-brand-light/40 uppercase tracking-widest mb-1">
                                                Presets
                                            </div>
                                            <Button variant="ghost" className="justify-start h-8 text-[11px] font-normal uppercase tracking-wider hover:bg-brand-gray/20 hover:text-brand-cyan whitespace-nowrap" onClick={() => setPreset(0)}>
                                                Today
                                            </Button>
                                            <Button variant="ghost" className="justify-start h-8 text-[11px] font-normal uppercase tracking-wider hover:bg-brand-gray/20 hover:text-brand-cyan whitespace-nowrap" onClick={() => setPreset(7)}>
                                                Last 7 Days
                                            </Button>
                                            <Button variant="ghost" className="justify-start h-8 text-[11px] font-normal uppercase tracking-wider hover:bg-brand-gray/20 hover:text-brand-cyan whitespace-nowrap" onClick={() => setPreset(30)}>
                                                Last 30 Days
                                            </Button>
                                            <Button variant="ghost" className="justify-start h-8 text-[11px] font-normal uppercase tracking-wider hover:bg-brand-gray/20 hover:text-brand-cyan whitespace-nowrap" onClick={() => setPreset('month')}>
                                                This Month
                                            </Button>
                                        </div>
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={startDateInput ? new Date(startDateInput) : undefined}
                                            selected={{
                                                from: startDateInput ? new Date(startDateInput) : undefined,
                                                to: endDateInput ? new Date(endDateInput) : undefined,
                                            }}
                                            onSelect={(range) => {
                                                setStartDateInput(range?.from ? format(range.from, "yyyy-MM-dd") : "");
                                                setEndDateInput(range?.to ? format(range.to, "yyyy-MM-dd") : "");
                                            }}
                                            numberOfMonths={isMobile ? 1 : 2}
                                            classNames={{
                                                day_range_middle: "bg-brand-gray text-brand-cyan rounded-none hover:bg-brand-gray hover:text-brand-cyan",
                                                day_selected: "bg-brand-cyan text-brand-black hover:bg-brand-cyan hover:text-brand-black focus:bg-brand-cyan focus:text-brand-black rounded-none",
                                                day_today: "bg-brand-gray/20 text-brand-light rounded-none",
                                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-none hover:bg-brand-gray hover:text-brand-light"
                                            }}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Search (4 cols) */}
                    <div className="md:col-span-4 space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/40" size={14} />
                            <Input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                                placeholder="NAME, EMAIL OR ID"
                                className="pl-9 bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-10 placeholder:text-brand-light/20"
                            />
                        </div>
                    </div>

                    {/* Apply Button (3 cols) */}
                    <div className="md:col-span-3">
                        <Button
                            onClick={applyFilters}
                            className="w-full h-10 bg-brand-cyan text-brand-black rounded-none hover:bg-brand-cyan/80 text-[11px] tracking-widest font-bold uppercase"
                        >
                            APPLY
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border border-brand-gray bg-brand-gray/5 w-full overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-[11px] tracking-wider text-left uppercase min-w-[800px]">
                        <thead className="border-b border-brand-gray">
                            <tr>
                                <th className="p-4 md:p-6 font-medium text-brand-light/40">Order ID</th>
                                <th className="p-4 md:p-6 font-medium text-brand-light/40">Customer</th>
                                <th className="p-4 md:p-6 font-medium text-brand-light/40">Items</th>
                                <th className="p-4 md:p-6 font-medium text-brand-light/40">Total</th>
                                <th className="p-4 md:p-6 font-medium text-brand-light/40">Status</th>
                                <th className="p-4 md:p-6 font-medium text-brand-light/40">Tracking No</th>
                                <th className="p-4 md:p-6 font-medium text-brand-light/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-gray">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-brand-gray/10 transition-colors">
                                        <td className="p-4 md:p-6 font-mono text-[10px] text-brand-light/40">{order.id}</td>
                                        <td className="p-4 md:p-6">
                                            <div className="font-medium text-brand-light">{order.customerName}</div>
                                            <div className="text-[10px] text-brand-light/40">{order.email}</div>
                                            <div className="text-[10px] text-brand-light/40 mt-1">{order.customerAddress}</div>
                                            <div className="text-[10px] text-brand-light/40">{order.customerPhone}</div>
                                        </td>
                                        <td className="p-4 md:p-6 text-brand-light/60">
                                            <div className="space-y-2">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex flex-col">
                                                        <span className="text-brand-light text-[10px]">{item.productName}</span>
                                                        <span className="text-[9px] text-brand-light/40">Qty: {item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 md:p-6 text-brand-light/60">{order.totalAmount.toLocaleString()}</td>
                                        <td className="p-4 md:p-6">
                                            <span className={`px-3 py-1 border text-[9px] font-bold ${order.status === 'PENDING' ? 'border-yellow-500/30 text-yellow-500' :
                                                order.status === 'PAID' ? 'border-brand-cyan/30 text-brand-cyan' :
                                                    order.status === 'SHIPPED' ? 'border-blue-500/30 text-blue-500' :
                                                        order.status === 'COMPLETED' ? 'border-green-500/30 text-green-500' :
                                                            'border-red-500/30 text-red-500'
                                                }`}>
                                                {order.status === 'TvCancelled' ? 'CANCELLED' : order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 md:p-6">
                                            <Input
                                                defaultValue={order.trackingNumber || ''}
                                                placeholder="TRACKING NO"
                                                className="h-8 text-[10px] bg-brand-black border-brand-gray tracking-wider w-32 rounded-none focus:border-brand-cyan"
                                                onBlur={(e) => {
                                                    if (e.target.value !== (order.trackingNumber || '')) {
                                                        updateTrackingNumber(order.id, e.target.value);
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.currentTarget.blur();
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td className="p-4 md:p-6 text-right">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value as any)}
                                                className="bg-brand-black border border-brand-gray text-brand-light text-[10px] tracking-widest p-2 rounded-none focus:outline-none focus:border-brand-cyan cursor-pointer"
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="PAID">PAID</option>
                                                <option value="SHIPPED">SHIPPED</option>
                                                <option value="COMPLETED">COMPLETED</option>
                                                <option value="TvCancelled">CANCELLED</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-brand-light/40 text-[11px] tracking-widest">
                                        No orders found
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