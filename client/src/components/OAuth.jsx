import React from 'react'
import {GoogleAuthProvider,signInWithPopup,getAuth} from '@firebase/auth'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { signInStart ,signInSuccess ,signInFailure } from '../redux/user/userSlice';

function OAuth() {
    const dispatch =useDispatch();
    const handleGoogleClick =async()=>{
        try {
            const provider =new GoogleAuthProvider()
            const auth =getAuth(app)

            // pop pop request
            const result =await signInWithPopup(auth,provider)
            // console.log(result)
            // send data backend /db
            const res =await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name :result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                })
            })

            const data=await res.json();
            // console.log(data)
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log("not sign with google",error)
        }
    }

  return (
    <button type='button'
    onClick={handleGoogleClick}
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-70 '>
        Continue with Google
    </button>
  )
}

export default OAuth