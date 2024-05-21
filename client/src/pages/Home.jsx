import { signInSuccess, userSignOut } from '@/redux/user/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchCurrentUserData = async () => {
    try {
      const res = await fetch('api/user/updated-profile');
      const data = await res.json();
      if (data.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: data.error,
        });
        dispatch(userSignOut());
        navigate('/signin');
        return;
      }
      dispatch(signInSuccess(data));
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  return (
    <div className="text-3xl text-center p-5">
      Welcome to Dashboard
      <Toaster />
    </div>
  );
};

export default Home;
