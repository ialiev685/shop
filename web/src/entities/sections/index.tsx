import { LoadingOverlay, SimpleGrid } from "@mantine/core";
import { Link } from "react-router-dom";
import { Card } from "./card";
import styles from "./styles.module.css";
import type { V1TypeListListData } from "@/services/data-contracts";

type SectionsProps = {
  showCard?: boolean;
  data: V1TypeListListData;
  isLoading: boolean;
};

export const Sections = ({
  showCard = false,
  isLoading,
  data,
}: SectionsProps) => {
  return (
    <SimpleGrid pt={12} cols={2} spacing={16} verticalSpacing={16}>
      <LoadingOverlay visible={isLoading} />
      {data.map(({ id, name }) => {
        const linkTo = `/catalog/${id}`;
        return showCard ? (
          <Link key={id} to={linkTo}>
            <Card title={name} />
          </Link>
        ) : (
          <Link to={linkTo} key={id} className={styles["nav-link"]}>
            {name}
          </Link>
        );
      })}
    </SimpleGrid>
  );
};
