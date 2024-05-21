import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectAdminIfLoggedIn = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);

  if (currentUser?.isAdmin) {
    return <Navigate to="/admin/home" />;
  } else {
    return <Outlet />;
  }
};

export default RedirectAdminIfLoggedIn;
