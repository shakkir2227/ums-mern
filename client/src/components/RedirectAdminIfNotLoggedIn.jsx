import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectAdminIfNotLoggedIn = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);

  if (currentUser.isAdmin) {
    return currentUser ? <Outlet /> : <Navigate to="/admin/signin" />;
  } else {
    return <Navigate to="/signin" ></Navigate>
  }
};

export default RedirectAdminIfNotLoggedIn;
