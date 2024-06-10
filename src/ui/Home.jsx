import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "../ui/Button";
function Home() {
  const username = useSelector((state) => state.user.userName);
  return (
    <div className=" text-center  text-sm font-semibold sm:text-xl">
      <h1 className="mb-8">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? (
        <Button type="primary" to="menu">
          Continuing ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
