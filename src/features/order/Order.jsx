// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import SearchOrder from "./SearchOrder";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mt-4 space-y-8">
      <div className="flex  flex-wrap items-center justify-between gap-2 ">
        <h2 className="text-xl font-bold tracking-wide">Order ${id} status</h2>
        <div className="space-x-4">
          {priority && (
            <span className="rounded-full bg-red-600 px-3 py-1 font-semibold uppercase tracking-wide text-stone-200">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-3 py-1 font-semibold uppercase tracking-wide text-stone-200">
            {status} order
          </span>
        </div>
      </div>

      <div className="mx-3 flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-3 py-4">
        <p className="text-lg font-bold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="font-semibold text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="mx-3  divide-y divide-stone-200">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el) => el.id === +item.pizzaId)?.ingredients
            }
          />
        ))}
      </ul>
      {!priority && <UpdateOrder />}
      <div className="mx-3 flex flex-col flex-wrap  justify-between gap-2 bg-stone-300 px-3 py-4   font-normal text-stone-900">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}
export default Order;
