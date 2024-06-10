import { Link, Navigate, useNavigate } from "react-router-dom";
function LinkButton({ to, children }) {
  const classname = "text-blue-500 hover:text-blue-700 hover:underline";
  const navigate = useNavigate();
  if (to === "-1") {
    return (
      <button className={classname} onClick={(e) => navigate(-1)}>
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={classname}>
      {children}
    </Link>
  );
}

export default LinkButton;
