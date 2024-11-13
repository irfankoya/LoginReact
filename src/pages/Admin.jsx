import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { admintLogout, getUsers } from "../redux/admin/adminSlice";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";

const Admin = () => {
  const dispatch = useDispatch();
  const [searchText,setSearchText]=useState("")
  const [reload , setReload] = useState(false)
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])
  useEffect(() => {
    const updatauser = async () => {
      const res = await fetch("/api/admin/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fetchedData = await res.json();
      console.log(fetchedData);

      dispatch(getUsers(fetchedData));
    };
    updatauser();
    setReload(false)
  }, [reload]);

  //
  const { users, loading } = useSelector((state) => state.admin);
  //
  useEffect(() => {
 if(users){
  setFilteredData(users)
 }
  }, [users])
  //logout
 const handlogout = ()=>{
    try {
      // await fetch("/api/auth/signout");
      dispatch(admintLogout()); 
      navigate('/')
    } catch (error) {
      console.log(error);
    }
 }
 //search
 const handleSearch=(data)=>{
  setSearchText(data)

  let filtered=users.filter((user)=>
  user.username.toLowerCase().includes(data.toLowerCase())
  )
  console.log(filtered);
  
  setFilteredData(filtered)
}
//delete
 const handleDeleteAccount = async (userId) => {
  console.log(userId);
  try {
    const res = await fetch(`/api/admin/delete/${userId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      console.log('sometig went wrong');
      return;
    }else{
      setReload(true)
    }
    // dispatch(deleteUserSuccess(data));
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="p-4 border-2 border-gray-200 dark:border-gray-700 mt-14">
      <h1 className="flex justify-center font-bold text-3xl underline">USER MANAGEMENT</h1>
      <Link to='/admin/create'>
      <button className="bg-blue-700 text-white p-2  rounded-lg uppercase hover:opacity-80 disabled:opacity-80">
        create user
      </button>
      
      </Link>
      <input 
      type="text"
      className="ml-5 px-4 border-2"
      value={searchText}
      placeholder="Search User"
      onChange={(e)=>handleSearch(e.target.value)}
      />

    
      <div className="flex justify-end" onClick={handlogout}><MdLogout size="24px"/> </div>
      <div className="flex justify-center border-l-neutral-950 pt-6">
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 pt-11">
        <table className="w-full table-fixed">
          <thead> 
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                IMAGE
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Name
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Email
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredData.map((user) => (
              <tr key={user._id}>
                <td className="py-4 px-6 border-b border-gray-200">
                  <img
                    src={
                      user.profilePicture.startsWith("http://") ||
                      user.profilePicture.startsWith("https://") ||
                      user.profilePicture.startsWith("data") 
                        ? user.profilePicture
                        : `http://localhost:3000/${user.profilePicture}`
                    }
                    alt="profile"
                    className="h-24 w-24 self-center  rounded-full object-cover mt-2"
                  />
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {user.username}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">
                  {user.email}
                </td>
                <td className="py-3 px-2 border-b border-gray-200 space-x-2">
                  <button className="bg-slate-700 text-green-400 p-2 px-5 rounded-lg uppercase hover:opacity-85 disabled:opacity-80">
                    {loading ? (
                      "Loading..."
                    ) : (
                      <Link to="/admin/edit" state={{ user: user }}>
                        EDIT
                      </Link>
                    )}
                  </button>
                  <button type="button" onClick={()=>handleDeleteAccount(user._id)} className="bg-slate-700 text-red-400 p-2  rounded-lg uppercase hover:opacity-80 disabled:opacity-80">
                    {loading ? "Loading..." : "DELETE"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
