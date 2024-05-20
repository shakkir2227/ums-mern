import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectAdminIfLoggedIn = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);

  if (currentUser?.isAdmin) {
    return currentUser ? <Navigate to="/admin/home" /> : <Outlet /> 
  } else {
    return <Navigate to="/signin"></Navigate>;
  }
};

export default RedirectAdminIfLoggedIn;
