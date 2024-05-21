import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  } else {
    if (!currentUser.isAdmin) {
      return <Outlet />;
    } else {
      <Navigate to="/admin/signin " />;
    }
  }
};

export default PrivateRoute;
