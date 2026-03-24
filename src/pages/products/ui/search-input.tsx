import { TextInput, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "@mantine/hooks";

export const SearchInput = () => {
  const theme = useMantineTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchParams({ search: value });
  }, 250);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    debouncedSearch(value);
  };

  return (
    <TextInput
      w={1000}
      defaultValue={currentSearch}
      onChange={handleChange}
      placeholder="Найти"
      leftSection={<IconSearch />}
      radius={8}
      styles={{
        input: {
          border: "none",
          backgroundColor: theme.colors["gray-main-5"][0],
          height: 48,
          paddingLeft: 48,
        },
        section: {
          marginLeft: 10,
        },
      }}
    />
  );
};
