import styles from "./styles.module.css";
import { forwardRef } from "react";

export const MenuButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <button ref={ref} {...props} className={styles.menuButton}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </button>
  );
});
