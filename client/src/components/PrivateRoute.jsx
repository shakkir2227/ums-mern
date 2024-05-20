import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);

  if(!currentUser?.isAdmin) {
    return currentUser ? <Outlet /> : <Navigate to="/signin " />;
  } else {
        return <Navigate to="/admin/signin " />;
  }
};

export default PrivateRoute;
