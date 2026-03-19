import { Center } from "@mantine/core";
import styles from "./styles.module.css";
import LogoIcon from "@shared/assets/logo.svg?react";

export const Logo = () => {
  return (
    <Center>
      <div className={styles["wrapper-logo"]}>
        <div className={styles["box-logo"]}>
          <LogoIcon />
        </div>
      </div>
    </Center>
  );
};
