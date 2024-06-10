import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="space-x-2 space-y-4">
      <LinkButton to="/menu"> &larr; Back to menu</LinkButton>

      <h2>Your cart, {username}</h2>
      <ul className="space-y-2 divide-y divide-stone-200">
        {cart.map((c) => (
          <CartItem item={c} id={c.pizzaId} />
        ))}
      </ul>
      <div className="flex gap-4">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" callFn={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
