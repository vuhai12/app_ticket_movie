import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieDetail from "@pages/MovieDetail";
import ShowTimeListMovies from "@pages/ShowTimeListMovies";
import BookingMovie from "@pages/BokingMovie";
import Payment from "@pages/Payment";
import AdminMovie from "@pages/AdminMovie";
import MovieList from "@pages/MovieList";
import NewList from "@pages/NewList";
import TicketPrice from "@pages/TicketPrice";
import AboutUs from "@pages/AboutUs";
import NewItem from "@pages/NewItem";
import Login from "@pages/Login";
import Register from "@pages/Register";
import { Toaster } from "react-hot-toast";

import AdminUser from "@pages/AdminUser";
import AdminDashboard from "@pages/AdminDashboard";

function App() {
  // useEffect(() => {
  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     (_event, session) => {
  //       if (!session) {
  //         // Refresh token hết hạn → logout
  //         localStorage.clear();
  //         navigate("/login");
  //       }
  //     }
  //   );

  //   // cleanup khi component unmount
  //   return () => {
  //     listener.subscription.unsubscribe();
  //   };
  // }, [navigate]);
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/show-time" element={<ShowTimeListMovies />} />
        <Route
          path="/booking-movie"
          element={
            // <PrivateRoutes>
            <BookingMovie />
            // </PrivateRoutes>
          }
        />
        <Route
          path="/payment"
          element={
            // <PrivateRoutes>
            <Payment />
            // </PrivateRoutes>
          }
        />
        <Route path="/movie-list" element={<MovieList />} />
        <Route path="/news-list" element={<NewList />} />
        <Route path="/ticket-price" element={<TicketPrice />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news-item/:id" element={<NewItem />} />
        <Route
          path="/login"
          element={
            // <PublicRoute>
            <Login />
            // </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            // <PublicRoute>
            <Register />
            // </PublicRoute>
          }
        />
        <Route
          path="/admin-dashboard/movie"
          element={
            // <PrivateRoutes>
            <AdminMovie />
            // </PrivateRoutes>
          }
        />
        <Route
          path="/admin-dashboard/dashboard"
          element={
            // <PrivateRoutes>
            <AdminDashboard />
            // </PrivateRoutes>
          }
        />
        <Route
          path="/admin-dashboard/user"
          element={
            // <PrivateRoutes>
            <AdminUser />
            // </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
