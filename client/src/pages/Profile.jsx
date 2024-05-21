import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useImageUpload } from '../utils/useImageUpload.js';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signInSuccess,
  userSignOut,
} from '../redux/user/userSlice.js';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const { username, email } = currentUser;
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    if (image) {
      useImageUpload(
        image,
        setImagePercent,
        setImageError,
        setFormData,
        formData
      );
    }
  }, [image]);

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        dispatch(updateUserFailure(data.error));
      }
      if (data.message) {
        // when user does not send an image
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1
        className="text-3xl font-semibold text-center
    my-7"
      >
        {' '}
        Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-3 flex flex-col gap-5 mx-auto "
      >
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        ></input>

        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile-picture"
          className="w-20 h-20 mx-auto rounded-full object-cover"
          onClick={() => {
            fileRef.current.click();
          }}
        ></img>

        <p className="text-sm self-center">
          {' '}
          {imageError ? (
            <span className="text-red-700">Error uploading Image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span> {`Uploading: ${imagePercent} %`} </span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ''
          )}{' '}
        </p>

        <input
          type="text"
          id="username"
          value={username}
          readOnly
          className="bg-slate-200 rounded-lg p-3  "
        ></input>
        <input
          type="email"
          id="email"
          readOnly
          value={email}
          className="bg-slate-200 rounded-lg p-3  "
        ></input>

        <button
          className="uppercase bg-slate-700 text-white
   p-3 rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          Update Profile picture
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Profile;
