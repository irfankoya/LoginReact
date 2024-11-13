import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../ThemeContext";
import { signOut } from "../redux/user/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode, toggleTheme } = useTheme();
  const dispatch=useDispatch()

  const handleSignOut= async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between ">
      <Link to="/">
        <h1 className="font-bold">Auth App</h1>
      </Link>

      <ul className="flex gap-4 ml-6">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/profile">
          {currentUser ? (
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <li>Sign In</li>
          )}
        </Link>
      </ul>
      <div>
        {currentUser &&(
          <button onClick={handleSignOut} className="mr-4 ">SignOut</button>
        )}
        <button
          onClick={toggleTheme}
          className="px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
};

export default Header;
