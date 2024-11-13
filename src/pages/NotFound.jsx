import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-5xl font-bold text-white">Oops! Page Not Found</h1>
      <p className="mt-4 text-2xl text-white">The page you&apos;re looking for doesn&apos;t exist.</p>
      <button className="mt-8 px-4 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-700 transition duration-300">
       <Link to="/"> Go Home</Link>
      </button>
    </div>
  )
}

export default NotFound
