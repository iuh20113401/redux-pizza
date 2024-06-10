import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteCart } from "./cartSlice";
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="small"
      callFn={() => {
        dispatch(deleteCart(pizzaId));
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteItem;
