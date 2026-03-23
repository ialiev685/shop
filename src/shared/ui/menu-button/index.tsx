import styles from "./styles.module.css";

export const MenuButton = () => {
  return (
    <button className={styles.menuButton}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </button>
  );
};
