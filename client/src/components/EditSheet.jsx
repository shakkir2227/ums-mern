import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';
import { useImageUpload } from '@/utils/useImageUpload';

const EditSheet = ({ id, username, email, profilePicture }) => {
  const fileRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({ username });

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

  const handleFormSubmit = async () => {
    try {
      const res = await fetch('/api/admin/update-user', {
        method: 'PUT',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)
      
    } catch (error) {
      console.log(error);
    }
  };

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
            <Button className="mx-32 my-10">UPDATE</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditSheet;
