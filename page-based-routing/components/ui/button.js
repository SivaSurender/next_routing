import Link from "next/link";
import classes from "./button.module.css";

function Button({ children, link, onClickHandle }) {
  if (link) {
    return (
      // if next js version < 13, then should use anchor to style it with class name
      <Link className={classes.btn} href={link}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClickHandle}>
      {children}
    </button>
  );
}

export default Button;
