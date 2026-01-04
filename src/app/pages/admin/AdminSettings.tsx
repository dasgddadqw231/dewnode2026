import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { dbService, Settings } from "../../../utils/supabase/service";
import { Loader2 } from "lucide-react";

export function AdminSettings() {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [saving, setSaving] = useState(false);

    // Form States
    const [adminId, setAdminId] = useState("");
    const [adminPw, setAdminPw] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const data = await dbService.settings.get();
            setSettings(data);

            // Initialize form
            if (data) {
                setAdminId(data.admin_auth.id);
                setAdminPw(data.admin_auth.password || "");
                setBankName(data.bank_info.bank);
                setAccountNumber(data.bank_info.account);
                setAccountHolder(data.bank_info.holder);
            }
        } catch (error) {
            console.error("Failed to load settings:", error);
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAuth = async () => {
        if (!settings) return;

        try {
            setSaving(true);
            await dbService.settings.update({
                admin_auth: {
                    ...settings.admin_auth,
                    id: adminId,
                    password: adminPw
                }
            });
            toast.success("Admin Credential updated");

            // Refresh settings
            loadSettings();
        } catch (error: any) {
            console.error("Failed to save auth settings:", error);
            toast.error("Failed to update Admin Access: " + (error.message || "Database Error"));
        } finally {
            setSaving(false);
        }
    };

    const handleSaveBank = async () => {
        if (!settings) return;

        try {
            setSaving(true);
            await dbService.settings.update({
                bank_info: {
                    bank: bankName,
                    account: accountNumber,
                    holder: accountHolder
                }
            });
            toast.success("Bank info updated");

            // Refresh settings
            loadSettings();
        } catch (error: any) {
            console.error("Failed to save bank settings:", error);
            toast.error("Failed to update Bank info: " + (error.message || "Database Error"));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-brand-light/50">
                <Loader2 className="animate-spin mr-2" /> Loading settings...
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-4xl animate-in fade-in duration-500">
            <div>
                <h1 className="text-[20px] font-light tracking-[0.2em] mb-2 uppercase text-brand-light">Settings</h1>
                <p className="text-[11px] text-brand-light/40 tracking-widest uppercase">
                    Manage Admin Access and Store Information
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Admin Auth Section */}
                <div className="space-y-6">
                    <div className="border-b border-brand-gray/30 pb-4 mb-6">
                        <h2 className="text-[14px] font-medium tracking-[0.15em] text-brand-cyan uppercase">Admin Access</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] text-brand-light/60 tracking-widest uppercase">Admin ID</label>
                            <Input
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                className="bg-brand-black border-brand-gray/50 text-brand-light text-[11px] h-12 tracking-widest uppercase focus:border-brand-cyan"
                            />
                            <p className="text-[9px] text-brand-light/30 tracking-wider">
                                Current ID: {settings?.admin_auth.id}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-brand-light/60 tracking-widest uppercase">Admin Password</label>
                            <Input
                                type="text"
                                value={adminPw}
                                onChange={(e) => setAdminPw(e.target.value)}
                                className="bg-brand-black border-brand-gray/50 text-brand-light text-[11px] h-12 tracking-widest uppercase focus:border-brand-cyan"
                            />
                        </div>

                        <Button
                            onClick={handleSaveAuth}
                            disabled={saving}
                            className="w-full bg-brand-cyan text-brand-black hover:bg-brand-light text-[10px] tracking-widest uppercase h-10 mt-4"
                        >
                            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : "Update Admin Access"}
                        </Button>
                    </div>
                </div>

                {/* Bank Info Section */}
                <div className="space-y-6">
                    <div className="border-b border-brand-gray/30 pb-4 mb-6">
                        <h2 className="text-[14px] font-medium tracking-[0.15em] text-brand-cyan uppercase">Bank Transfer Info</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] text-brand-light/60 tracking-widest uppercase">Bank Name</label>
                            <Input
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                placeholder="e.g. WOORI BANK"
                                className="bg-brand-black border-brand-gray/50 text-brand-light text-[11px] h-12 tracking-widest uppercase focus:border-brand-cyan"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-brand-light/60 tracking-widest uppercase">Account Number</label>
                            <Input
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="e.g. 1002-000-000000"
                                className="bg-brand-black border-brand-gray/50 text-brand-light text-[11px] h-12 tracking-widest uppercase focus:border-brand-cyan"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-brand-light/60 tracking-widest uppercase">Account Holder</label>
                            <Input
                                value={accountHolder}
                                onChange={(e) => setAccountHolder(e.target.value)}
                                placeholder="e.g. DEW&ODE"
                                className="bg-brand-black border-brand-gray/50 text-brand-light text-[11px] h-12 tracking-widest uppercase focus:border-brand-cyan"
                            />
                        </div>

                        <Button
                            onClick={handleSaveBank}
                            disabled={saving}
                            className="w-full bg-brand-cyan text-brand-black hover:bg-brand-light text-[10px] tracking-widest uppercase h-10 mt-4"
                        >
                            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : "Update Bank Info"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
