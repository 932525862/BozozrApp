import "./App.css";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
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
          <Route path="histories" element={<HistoryPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
