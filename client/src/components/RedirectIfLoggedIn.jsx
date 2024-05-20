import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectIfLoggedIn = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser?.isAdmin) {
    return currentUser ? <Navigate to="/"></Navigate> : <Outlet />;
  } else {
     <Navigate to="/admin/signin"></Navigate>;
  }
};

export default RedirectIfLoggedIn;
