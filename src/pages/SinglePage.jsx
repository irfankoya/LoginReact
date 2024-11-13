import {  useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SinglePage = () => {
  const location = useLocation();
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [formdata, setFormData] = useState({});
  // Check if location.state exists before accessing user
  const currentUser = location.state ? location.state.user : null;
  // setUpdateImage("http://localhost:3000/" + currentUser.profilePicture)

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    // formData.append(formdata);
    Object.entries(formdata).forEach(([key, value]) => {
      formData.append(key, value.toString()); // Ensure value is a string
    }); 
    formData.append("id", currentUser._id);
    formData.append("prevImg", currentUser.profilePicture);
    const res = await fetch("/api/admin/edit", {
      method: "POST",   
      body: formData,
    });
    let data = await res.json();
    if(data) navigate('/admin/user')
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={
            currentUser.profilePicture.startsWith("http://") ||
            currentUser.profilePicture.startsWith("https://") ||
            currentUser.profilePicture.startsWith("data")   
              ? currentUser.profilePicture
              : `http://localhost:3000/${currentUser.profilePicture}`
          }
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
    </div>
  );
};

export default SinglePage;
