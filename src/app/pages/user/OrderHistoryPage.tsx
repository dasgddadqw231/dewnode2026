import { useState } from "react";
import { dbService } from "../../../utils/supabase/service";
import { Order } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { WireframePlaceholder } from "../../components/WireframePlaceholder";
import { toast } from "sonner";
import { supabase } from "../../../../utils/supabase/client";

export function OrderHistoryPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [searched, setSearched] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("PLEASE ENTER A VALID EMAIL");
      return;
    }

    setIsSending(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) throw error;

      setIsOtpSent(true);
      toast.success("VERIFICATION CODE SENT TO EMAIL");
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error("FAILED TO SEND VERIFICATION CODE");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      toast.error("PLEASE ENTER VALID CODE");
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      setIsVerified(true);

      // Load orders
      const found = await dbService.orders.getByEmail(email);
      setOrders(found);
      setSearched(true);
      toast.success("VERIFICATION SUCCESSFUL");
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error("INVALID VERIFICATION CODE");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-24 min-h-[70vh] bg-brand-black">
      <h1 className="text-lg md:text-xl font-light tracking-[0.4em] text-center mb-8 md:mb-16 uppercase text-brand-light">ORDER HISTORY</h1>

      {!searched ? (
        <div className="space-y-10 max-w-sm mx-auto">
          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none h-14 bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest focus-visible:ring-brand-cyan placeholder:text-brand-light/20"
                />
              </div>
              <Button disabled={isSending} type="submit" className="w-full h-14 rounded-none bg-brand-cyan text-brand-black text-[18px] font-light tracking-[0.25em] uppercase hover:bg-brand-light transition-colors disabled:opacity-50" style={{ fontFamily: "'Univers 39', sans-serif" }}>
                {isSending ? "SENDING..." : "SEND CODE"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
              <div className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="rounded-none h-14 bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest opacity-50"
                />
                <Input
                  type="text"
                  placeholder="VERIFICATION CODE"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={8}
                  className="rounded-none h-14 bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest focus-visible:ring-brand-cyan placeholder:text-brand-light/20"
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={() => setIsOtpSent(false)} variant="outline" className="flex-1 h-14 rounded-none border-brand-gray text-brand-light text-[11px] tracking-[0.2em] uppercase hover:bg-brand-gray">
                  Cancel
                </Button>
                <Button onClick={handleVerifyOtp} className="flex-[2] h-14 rounded-none bg-brand-cyan text-brand-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-brand-light transition-colors">
                  Verify
                </Button>
              </div>
              <p className="text-[10px] text-brand-cyan text-center tracking-widest uppercase animate-pulse">
                Verification code sent to email
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-16">
          <div className="flex justify-between items-center pb-6 border-b border-brand-gray">
            <span className="text-[11px] uppercase tracking-widest text-brand-light/40">Orders for {email}</span>
          </div>

          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="border border-brand-gray p-4 md:p-8 space-y-6 md:space-y-8 bg-brand-gray/5">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Order ID: {order.id}</p>
                    <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <div className="pt-2">
                      <p className="text-[10px] text-brand-light/60 uppercase tracking-widest">{order.customerAddress}</p>
                      <p className="text-[10px] text-brand-light/60 uppercase tracking-widest">{order.customerPhone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 border border-brand-cyan text-brand-cyan text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em]">
                      {order.status === 'PENDING' ? 'PAYMENT PENDING' :
                        order.status === 'PAID' ? 'PROCESSING' :
                          order.status === 'SHIPPED' ? 'SHIPPED' :
                            order.status === 'COMPLETED' ? 'DELIVERED' :
                              order.status === 'TvCancelled' ? 'CANCELLED' :
                                order.status}
                    </span>
                    <div className="flex flex-col items-end gap-0.5">
                      <p className="text-[10px] text-brand-light/60 tracking-widest uppercase text-right">
                        {order.deliveryCompany && order.deliveryCompany}
                        {order.deliveryCompany && order.trackingNumber && <span className="mx-1">/</span>}
                        {order.trackingNumber && <span>{order.trackingNumber}</span>}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="w-20 h-24 flex-shrink-0 bg-brand-gray/5 border border-brand-gray relative overflow-hidden">
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover grayscale opacity-80"
                          />
                        ) : (
                          <WireframePlaceholder label="NO IMAGE" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-[12px] font-medium uppercase tracking-widest text-brand-light">{item.productName}</p>
                        <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                        <p className="text-[11px] text-brand-light/60 tracking-wider">{item.priceAtPurchase.toLocaleString()} KRW</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-brand-gray flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                  <div className="flex gap-4 items-center w-full md:w-auto justify-between md:justify-start">
                    <span className="text-[11px] uppercase tracking-widest text-brand-light/40">Total</span>
                    <span className="text-base font-medium tracking-widest text-brand-cyan md:hidden">{order.totalAmount.toLocaleString()} KRW</span>
                  </div>

                  <div className="flex justify-between items-center w-full md:w-auto">
                    {(order.status === 'PENDING' || order.status === 'PAID') && (
                      <button
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to cancel this order?')) {
                            try {
                              await dbService.orders.updateStatus(order.id, 'TvCancelled');
                              // 새로고침을 위해 상태 업데이트
                              const updated = await dbService.orders.getByEmail(email);
                              setOrders(updated);
                            } catch (error) {
                              console.error(error);
                              toast.error("Failed to cancel order");
                            }
                          }
                        }}
                        className="text-[9px] text-brand-light/20 hover:text-brand-cyan transition-colors uppercase tracking-[0.2em] underline underline-offset-4 cursor-pointer"
                      >
                        CANCEL ORDER
                      </button>
                    )}

                    <span className="text-base font-medium tracking-widest text-brand-cyan hidden md:block ml-8">{order.totalAmount.toLocaleString()} KRW</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-brand-light/20 text-[11px] uppercase tracking-[0.3em]">
              No orders found for this email.
            </div>
          )}
        </div>
      )}
    </div>
  );
}