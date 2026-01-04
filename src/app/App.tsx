import { Route, Switch, useLocation } from "wouter";
import { UserLayout } from "./components/layout/UserLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { HomePage } from "./pages/user/HomePage";
import { ShopPage } from "./pages/user/ShopPage";
import { SearchResultsPage } from "./pages/user/SearchResultsPage";
import { ProductDetailPage } from "./pages/user/ProductDetailPage";
import { CollectionPage } from "./pages/user/CollectionPage";
import { OrderHistoryPage } from "./pages/user/OrderHistoryPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminSales } from "./pages/admin/AdminSales";
import { AdminHero } from "./pages/admin/AdminHero";
import { AdminCollections } from "./pages/admin/AdminCollections";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { Toaster } from "sonner";
import { useEffect } from "react";

function App() {
  return (
    <>
      <Switch>
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/admin/:rest*" component={AdminRoutes} />

        {/* User Routes */}
        <Route path="*">
          <UserRoutes />
        </Route>
      </Switch>
      <Toaster position="top-center" />
    </>
  );
}

function AdminRoutes() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [location, setLocation]);

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin/sales" component={AdminSales} />
        <Route path="/admin/hero" component={AdminHero} />
        <Route path="/admin/collections" component={AdminCollections} />
        <Route path="/admin/settings" component={AdminSettings} />
      </Switch>
    </AdminLayout>
  );
}

function UserRoutes() {
  return (
    <UserLayout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/search" component={SearchResultsPage} />
        <Route path="/shop/:id" component={ProductDetailPage} />
        <Route path="/collection" component={CollectionPage} />
        <Route path="/orders" component={OrderHistoryPage} />
      </Switch>
    </UserLayout>
  );
}

export default App;