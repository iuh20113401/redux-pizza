import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const formError = useActionData();
  const {
    userName,
    position,
    status: statusAddress,
    address,
    error,
  } = useSelector((state) => state.user);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();
  return (
    <div className="mt-4 flex flex-col gap-4 space-x-2 ">
      <h2>Ready to order? Let's go!</h2>
      <Form method="POST" className="space-y-4">
        <div className="sm:flex sm:grow">
          <label className=" sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            className="input w-full sm:grow"
            required
          />
        </div>

        <div className="sm:flex sm:grow">
          <label className=" sm:basis-40">Phone number</label>
          <div className="w-full sm:grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formError?.phone ? (
              <div className="input mt-2 bg-red-100  text-red-700">
                {formError.phone}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="relative sm:flex sm:grow ">
          <label className=" sm:basis-40">Address</label>
          <div className="w-full">
            <input
              type="text"
              className="input w-full grow"
              name="address"
              defaultValue={address}
              disabled={statusAddress === "loading"}
              required
            />
            {statusAddress === "error" ? (
              <div className="input mt-2 bg-red-100  text-red-700">{error}</div>
            ) : (
              ""
            )}
          </div>
          {address ? (
            ""
          ) : (
            <span className="absolute right-1 top-[3px] text-sm">
              <Button
                callFn={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                type="small"
              >
                Get your position
              </Button>
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-4">
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input
            type="hidden"
            value={
              position.latitude &&
              position.longitude &&
              `${position.latitude},${position.longitude}`
            }
            name="position"
          />
          <Button type="primary">
            {isLoading ? "submitting..." : `Order now from ${totalPrice}$ `}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  const error = {};
  if (!isValidPhone(order.phone)) {
    error.phone = "Please enter your correct number phone.";
    return error;
  }
  const newOrder = await createOrder(order);

  //don't overuse
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
