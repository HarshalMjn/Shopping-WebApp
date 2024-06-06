import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  };

  return (
    <div className="flex w-11/12 flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded p-6  mb-5">
      <div className="">
        <img src={item.image} alt={item.title} width={150} height={120} className=" rounded-md" />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 pl-0 md:pl-4">
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold mb-2">{item.title}</h1>
          <p className="text-gray-700 mb-4">{item.description.split(" ").slice(0,10).join(" ") + "..."}</p>
          
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-xl font-bold mb-4 text-green-500"> ₹ {item.price}</p>
          <button
            onClick={removeFromCart}
            className="flex items-center bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
          >
            <FcDeleteDatabase className="mr-2" size={24} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
