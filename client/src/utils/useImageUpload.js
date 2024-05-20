import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export const useImageUpload = async (image, setImagePercent, setImageError, setFormData, formData) => {
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