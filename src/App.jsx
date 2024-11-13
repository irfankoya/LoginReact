import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import NotFound from "./pages/NotFound";
import SinglePage from "./pages/SinglePage";
import AdminLogin from "./pages/AdminLogin";
import Create from "./pages/Create";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <BrowserRouter>
        <Routes>
          {/* Routes with Header */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route path="/about" element={<About />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </>
            }
          />
          {/* Admin route without Header */}
          <Route path="/admin/*" element={<AdminLogin />} />
          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/user" element={<Admin />} />
          </Route>
          <Route path="/admin/edit" element={<SinglePage />} />
          <Route path="/admin/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
