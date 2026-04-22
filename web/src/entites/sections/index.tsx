import { SimpleGrid, Text } from "@mantine/core";
import { Link, NavLink } from "react-router-dom";
import { Card } from "./card";
import styles from "./styles.module.css";
import clsx from "clsx";

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
  showWithCard?: boolean;
};

export const Sections = ({ showWithCard = false }: SectionsProps) => {
  return (
    <SimpleGrid pt={12} cols={2} spacing={12} verticalSpacing={12}>
      {productTypes.map(({ id, name }) =>
        showWithCard ? (
          <Link key={id} to="/">
            <Card title={name} />
          </Link>
        ) : (
          <NavLink
            to="/"
            key={id}
            className={({ isActive }) =>
              clsx(styles["nav-link"], isActive && styles["nav-link-active"])
            }
          >
            {name}
          </NavLink>
        ),
      )}
    </SimpleGrid>
  );
};
