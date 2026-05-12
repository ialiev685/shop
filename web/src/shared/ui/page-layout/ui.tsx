import type { routesMap } from "@/app/routes";
import { Flex, Group, Text, Title, useMantineTheme } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface PageLayoutProps {
  pathBack?: keyof typeof routesMap;
  title: string;
}

export const PageLayout = ({
  pathBack,
  title,
  children,
}: PropsWithChildren<PageLayoutProps>) => {
  const theme = useMantineTheme();
  return (
    <Flex direction="column" gap={24}>
      <Flex gap={4} direction="column">
        <Title order={2} c="gray-shop-1">
          {title}
        </Title>
        {pathBack && (
          <Link to={pathBack} title={title}>
            <Group gap={2}>
              <IconArrowNarrowLeft
                size={20}
                color={theme.colors["gray-shop-1"][0]}
              />
              <Text c="gray-shop-1">назад</Text>
            </Group>
          </Link>
        )}
      </Flex>
      {children}
    </Flex>
  );
};
