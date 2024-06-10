import { Link } from "react-router-dom";

function Button({ to, type, callFn = null, children }) {
  const base =
    "inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide transition-all duration-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-8 disabled:cursor-not-allowed ";
  const style = {
    primary: base + " px-4 py-3",
    small: base + " px-4 py-2 text-sm",
    round: base + " px-2.5 py-1 text-sm",
    secondary:
      "inline-block rounded-full bg-stone-300 text-stone-400 font-semibold uppercase tracking-wide transition-all duration-300 focus:bg-stone00 focus:outline-none focus:ring focus:ring-stone-400 focus:ring-offset-8 disabled:cursor-not-allowed px-4 py-3 hover:text-stone-800",
  };
  if (to != null) {
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (callFn) {
    return (
      <button className={style[type]} onClick={callFn}>
        {children}
      </button>
    );
  }
  return <button className={style[type]}>{children}</button>;
}

export default Button;
