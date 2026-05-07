import { LoadingOverlay, SimpleGrid } from "@mantine/core";
import { generatePath } from "react-router-dom";
import { Card } from "./card";
import styles from "./styles.module.css";
import type { V1TypeListListData } from "@/services/data-contracts";
import { LinkWithState } from "../navigation-crumbs";
import { routesMap } from "@/app/routes";

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
        const linkTo = generatePath(routesMap["/products/:id"], {
          id,
        });
        return showCard ? (
          <LinkWithState key={id} to={linkTo} title={name}>
            <Card title={name} />
          </LinkWithState>
        ) : (
          <LinkWithState
            to={linkTo}
            key={id}
            title={name}
            className={styles["nav-link"]}
          >
            {name}
          </LinkWithState>
        );
      })}
    </SimpleGrid>
  );
};
