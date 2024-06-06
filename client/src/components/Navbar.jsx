import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-800 text-white">
      <nav className="flex flex-col md:flex-row items-center justify-between p-5 max-w-6xl mx-auto space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex justify-center w-full md:justify-start md:w-auto">
          <NavLink to="/" className="flex items-center">
            <img src="../logo.png" alt="Logo" className="h-10 md:h-14" />
          </NavLink>
        </div>
        <div className="flex justify-center w-full space-x-6 text-sm md:text-base md:w-auto md:ml-16">
          <NavLink to="/" className="hover:text-gray-400">
            Home
          </NavLink>
          {!user ? (
            <NavLink
              to="/login"
              className="bg-white text-black px-3 py-1 rounded-md hover:scale-90 transition-transform duration-200"
            >
              Login
            </NavLink>
          ) : (
            <NavLink to="/Dashboard" className="flex flex-col items-center">
              <span className="text-sm md:text-base">Welcome</span>
              <span className="font-bold">{user.name}!</span>
            </NavLink>
          )}
          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                justify-center items-center animate-bounce rounded-full text-white"
              >
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
