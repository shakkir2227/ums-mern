import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button, buttonVariants } from './ui/button';
import { useEffect, useRef, useState } from 'react';
import { useImageUpload } from '@/utils/useImageUpload';
import { replaceUpdatedUser } from '../redux/user/usersListSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditSheet = ({ id, username, email, profilePicture }) => {
  const fileRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({ username, profilePicture });
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const api_endpoint = `/api/admin/update-user/${id}`;

      const res = await fetch(api_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        console.log(data.error);
      }

      dispatch(replaceUpdatedUser(data));
      toast({
        description: 'User Updated successfully.',
      });

      setImagePercent(0);
      setImageError(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletion = (e) => {
    e.preventDefault()
    
    
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {' '}
          <Button>Edit</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update User</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently update user's
              account and remove old data from our servers.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleFormSubmit}>
            <Input type="text" value={id} className="hidden" />
            <input
              className="hidden"
              type="file"
              ref={fileRef}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            ></input>
            <Input className="my-4" type="email" value={email} readOnly />
            <Input
              className="my-4"
              type="text"
              id="username"
              value={formData?.username}
              onChange={handleChange}
            />
            <img
              onChange={() => {}}
              src={formData.profilePicture || profilePicture}
              alt="profile-picture"
              className="w-20 h-20 mx-auto rounded-full object-cover"
              onClick={() => {
                fileRef.current.click();
              }}
            ></img>
            <p className="text-sm self-center p-3 mx-24">
              {' '}
              {imageError ? (
                <span className="text-red-700">Error uploading Image</span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span> {`Uploading: ${imagePercent} %`} </span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">Uploaded successfully</span>
              ) : (
                ''
              )}{' '}
            </p>

            <div className="flex flex-col max-w-36 mx-auto gap-3">
              <Button>UPDATE</Button>
              <Button type="button" onClick = {handleDeletion} variant="destructive"> DELETE </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
      <Toaster />
    </div>
  );
};

export default EditSheet;
