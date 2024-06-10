import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="py-3">
      <div className="flex items-center justify-between text-lg ">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="font-semibold capitalize italic text-stone-500">
        {!isLoadingIngredients ? ingredients?.join(",") : "Loading..."}
      </p>
    </li>
  );
}

export default OrderItem;
