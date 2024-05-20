import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectIfLoggedIn = () => {
    const { currentUser } = useSelector((state) => (state.user));
    return currentUser ?  <Navigate to="/"></Navigate> : <Outlet/>
}

export default RedirectIfLoggedIn;