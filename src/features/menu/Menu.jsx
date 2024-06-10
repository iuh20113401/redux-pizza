import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <>
      {menu.map((m) => (
        <MenuItem pizza={m} key={m.id} />
      ))}
    </>
  );
}
export async function loader() {
  const data = await getMenu();
  return data;
}
export default Menu;
