import { SimpleGrid } from "@mantine/core";
import { Link } from "react-router-dom";
import { Card } from "./card";
import styles from "./styles.module.css";

// MOCK
const productTypes = [
  { id: "dairy", name: "Молочные продукты" },
  { id: "meat", name: "Мясо" },
  { id: "vegetables", name: "Овощи" },
  { id: "fruits", name: "Фрукты" },
  { id: "bakery", name: "Хлеб и выпечка" },
  { id: "beverages", name: "Напитки" },
  { id: "eggs", name: "Яйца" },
  { id: "cheese", name: "Сыры" },
];

type SectionsProps = {
  showCard?: boolean;
};

export const Sections = ({ showCard = false }: SectionsProps) => {
  return (
    <SimpleGrid pt={12} cols={2} spacing={16} verticalSpacing={16}>
      {productTypes.map(({ id, name }) => {
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
