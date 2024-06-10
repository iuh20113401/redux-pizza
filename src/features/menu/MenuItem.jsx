import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getItemQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UdateQuantity";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getItemQuantityById(id));
  function addToCart(e) {
    const item = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      ingredients,
      totalPrice: unitPrice * 1,
    };
    dispatch(addCart(item));
  }
  return (
    <li className="flex gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="text-lg font-medium text-stone-600">{name}</p>
        <p className="text-sm font-semibold capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          {currentQuantity > 0 && (
            <div className="flex items-center gap-3">
              <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !currentQuantity && (
            <Button type="small" callFn={(e) => addToCart(id)}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
