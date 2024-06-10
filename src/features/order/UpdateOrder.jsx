import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right ">
      <Button type="primary">Make order priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
export async function action({ request, params }) {
  const updateObj = { priority: true };
  await updateOrder(params.orderId, updateObj);
  return null;
}
