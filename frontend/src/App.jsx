import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import ProductDetails from "./pages/product/ProductDetails";
import Categories from "./pages/Category/Categories";
import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Cart/Checkout";
import CategoryProduct from "./pages/Category/CategoryProduct";
import Search from "./pages/Search";
import PrivateRoute from "./components/Routes/Private";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct/CreateProduct";
import UpdateProduct from "./pages/admin/CreateProduct/UpdateProduct";
import Products from "./pages/admin/CreateProduct/Products";
import Users from "./pages/admin/Users";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PageNotFound from "./pages/PageNotFound";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
