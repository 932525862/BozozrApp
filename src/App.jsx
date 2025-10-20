import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import CategoryPage from "./pages/category/CategoryPage";
import Layout from "./layout/Layout";
import MarketPage from "./pages/markets/MarketPage";
import HistoryPage from "./pages/history/HistoryPage";
import MenuPage from "./pages/menu/MenuPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SectionsPage from "./pages/sections/SectionsPage";
import SubBrendsPage from "./pages/subBrends/SubBrendsPage";
import ProductsPage from "./pages/products/ProductsPage";
import Login from "./pages/auth/Login"
import Registir from "./pages/auth/Registir"
import Password from "./pages/auth/Password"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "./store/userStore";
import { useEffect } from "react";
import MarketDetails from "./pages/marketDetails/MarketDetails";
import HistoryDetails from "./pages/historyDetails/HistoryDetails";
import NotificationDetails from "./pages/notificationDetails/NotificationDetails";
function App() {
  const navigate = useNavigate();
  const { accessToken } = useStore();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Registir" element={<Registir />} />
      <Route path="/password" element={<Password />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sections" element={<SectionsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="brends" element={<CategoryPage />} />
          <Route
          path="/brends/:brendTitle/subbrends"
          element={<SubBrendsPage />}
        />
        <Route
          path="/brends/:brendTitle/products"
          element={<ProductsPage />}
        />
          <Route path="markets" element={<MarketPage />} />
          <Route path="market/:marketName" element={<MarketDetails />} />
          <Route path="histories/:marketName" element={<HistoryDetails />} />
          <Route path="histories" element={<HistoryPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="notification/:notMarketName" element={<NotificationDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
