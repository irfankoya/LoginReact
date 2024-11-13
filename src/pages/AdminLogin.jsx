import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInFailure, adminSignIn } from "../redux/admin/adminSlice";

const AdminLogin = () => {
  const [ formData, setFormData ] = useState({});
  const { loading, error } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // dispatch(signInStart());
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); 
     if (data.success == false) return dispatch(signInFailure(data));
     dispatch(adminSignIn());
     navigate('/admin/user')
  
    } catch (error) {
      dispatch(signInFailure(error));
      console.log(error);
    } 
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>ADMIN LOGIN</h1>
    <form  onSubmit={handleSubmit}  className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='Email' 
        id='email'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='Password'
        id='password'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <button
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      > 
           {loading ? 'Loading...' : 'Sign In'}
      </button>
 
    </form>
    <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      {error.error}
          </div>
  )
}

export default AdminLogin
