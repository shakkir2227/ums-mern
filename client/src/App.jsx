import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';
import AdminSignIn from './components/AdminSignIn';
import AdminHome from "./components/AdminHome";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route element={<RedirectIfLoggedIn />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin/home" element={<AdminHome />}></Route>
        <Route path="/admin/signin" element={<AdminSignIn />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
