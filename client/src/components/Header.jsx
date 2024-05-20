import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSignOut } from '../redux/user/userSlice';

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch=  useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(userSignOut())
      navigate("/signin")

    } catch (error) {}
  };

  return (
    <div className="bg-slate-200">
      <div
        className="flex justify-between items-center max-w-6xl mx-auto
      p-3"
      >
        <Link to="/">
          <h1 className="font-bold">UMS APP</h1>
        </Link>
        <ul className="flex gap-10">
    
          {currentUser && <li className='cursor-pointer' onClick={handleSignOut}>Logout</li>}
          <Link to={currentUser ? '/profile' : ''}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile-picture"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
             ''
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
