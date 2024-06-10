import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
function CartOverview() {
  const totalCartQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-200">
      <p className=" space-x-4  sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="cart" className="text-stone-300 ">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
