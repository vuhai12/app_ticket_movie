import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PublicRoute from "@routes/PublicRoute";
import PrivateRoutes from "@routes/PrivateRoutes";
import ScrollHandler from "@components/ScrollHandler";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@components/LoadingSpinner";
import ScrollToTop from "@components/ScrollToTop";

const HomePage = lazy(() => import("@pages/HomePage"));
const MovieDetail = lazy(() => import("@pages/MovieDetail"));
const ShowTimeListMovies = lazy(() => import("@pages/ShowTimeListMovies"));
const BookingMovie = lazy(() => import("@pages/BokingMovie"));
const Payment = lazy(() => import("@pages/Payment"));
const AdminMovie = lazy(() => import("@pages/AdminMovie"));
const MovieList = lazy(() => import("@pages/MovieList"));
const NewList = lazy(() => import("@pages/NewList"));
const TicketPrice = lazy(() => import("@pages/TicketPrice"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const NewItem = lazy(() => import("@pages/NewItem"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const AdminUser = lazy(() => import("@pages/AdminUser"));
const AdminDashboard = lazy(() => import("@pages/AdminDashboard"));

function App() {
  return (
    <>
      {/* <ChatBox /> */}
      <ScrollToTop />
      <ScrollHandler />
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/show-time" element={<ShowTimeListMovies />} />
          <Route
            path="/booking-movie"
            element={
              <PrivateRoutes>
                <BookingMovie />
              </PrivateRoutes>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoutes>
                <Payment />
              </PrivateRoutes>
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
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
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
      </Suspense>
    </>
  );
}

export default App;
