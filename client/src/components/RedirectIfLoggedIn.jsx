import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectIfLoggedIn = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Outlet />;
  if (!currentUser.isAdmin) return <Navigate to="/"></Navigate>;
};

export default RedirectIfLoggedIn;
