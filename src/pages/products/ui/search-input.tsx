import { TextInput, useMantineTheme } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "@mantine/hooks";
import { useState } from "react";

export const SearchInput = () => {
  const theme = useMantineTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("search") || "");
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchParams({ search: value });
  }, 250);

  const handleChange = (value: string) => {
    setValue(value);
    debouncedSearch(value);
  };

  return (
    <TextInput
      w={1000}
      value={value}
      onChange={(event) => handleChange(event.currentTarget.value)}
      placeholder="Найти"
      leftSection={<IconSearch />}
      rightSection={
        value ? (
          <IconX cursor="pointer" onClick={() => handleChange("")} />
        ) : undefined
      }
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
          marginRight: 10,
        },
      }}
    />
  );
};
