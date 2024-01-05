import { useSelector, useDispatch } from 'react-redux'
import OAuth from '../components/OAuth'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateUserFailure, updateUserSuccess, updateUserStart } from '../redux/user/userSlice.js'


const Profile = () => {
  const { currentUser, loading, error } = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch()

  // console.log(file)
  // console.log(filePercent)
  // console.log(formData)
  // console.log(updateSuccess)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('upload is '+progress +'%done')
        setFilePercent(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL })
          })
      },
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      console.log(updateSuccess)
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl  font-semibold text-center my-7 '>Profile</h1>
      <form action="" className='flex flex-col gap-3'
        onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept='image/.*'
          onChange={(e) => setFile(e.target.files[0])} />
        <img src={formData.avatar || currentUser.avatar} alt="profile"
          onClick={() => fileRef.current.click()}
          className='rounded-full h-24  w-24 object-cover cursor-pointer self-center mt-2' />
        <p className='text-sm text-center'>
          {
            fileUploadError ?
              (<span className='text-red-800'>Error Image Upload(image must be less then 2mb)</span>) :
              filePercent > 0 && filePercent < 100 ? (
                <span className='text-slate-700'>
                  {`Uploading ${filePercent}%`}
                </span>
              ) :
                filePercent === 100 ? (
                  <span className='text-green-600'>Image Successfully Uploaded</span>
                ) : ('')

          }
        </p>

        <input type="text" placeholder='username' id='username'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.username}
          onChange={handleChange} />
        <input type="email" placeholder='email' id='email'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.email}
          onChange={handleChange} />
        <input type="password" placeholder='password' id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange} />

        <button disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80 disabled:opacity-70'>
          {
            loading ? 'Loading...' : 'Update'
          }
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>

      </div>
      <p className='text-red-700 mt-5'>
        {error ? error : ''}
      </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User updated successfully' : ''}
      </p>
    </div>
  )
}

export default Profile
