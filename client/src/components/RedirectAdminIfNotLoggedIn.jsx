import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectAdminIfNotLoggedIn = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);

  if (currentUser.isAdmin) {
    return  <Outlet /> 
  } else {
    return <Navigate to="/admin/signin" ></Navigate>
  }
};

export default RedirectAdminIfNotLoggedIn;
