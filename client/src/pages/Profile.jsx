import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { username, email } = currentUser;
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false)
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      }, 
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
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

      <form className="p-3 flex flex-col gap-5 mx-auto ">
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
          src={ formData.profilePicture || currentUser.profilePicture}
          alt="profile-picture"
          className="w-20 h-20 mx-auto rounded-full object-cover"
          onClick={() => {
            fileRef.current.click();
          }}
        ></img>

        <p className='text-sm self-center'> {imageError ? (
            <span className='text-red-700'>Error uploading Image</span>
        ) : imagePercent > 0 && imagePercent < 100 ? (
          <span> {`Uploading: ${imagePercent} %`} </span>
        ): imagePercent === 100 ? (
          <span className='text-green-700'>Image uploaded successfully</span>
       ) : '' } </p>

        <input
          type="text"
          id="username"
          value={username}
          className="bg-slate-200 rounded-lg p-3  "
        ></input>
        <input
          type="email"
          id="email"
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
    </div>
  );
};

export default Profile;
