import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
function Header() {
  return (
    <div className="flex items-center justify-between border-b-2 border-stone-200 bg-yellow-500 p-4 text-stone-800 sm:p-6">
      <Link to="/" className="font-semibold uppercase tracking-widest">
        Fast react pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </div>
  );
}

export default Header;
