import { useEffect, useRef, type ReactNode } from "react";
import {
  Combobox,
  TextInput,
  useCombobox,
  Text,
  Loader,
  Box,
  type TextInputProps,
  type ComboboxProps,
} from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

interface SelectProps {
  value?: string;
  onChange: (value: string | null) => void;
  search: string;
  onSearchChange: (value: string) => void;
  label?: ReactNode;
  placeholder?: string;
  data?: { value: string; label: string }[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  radius?: TextInputProps["radius"];
  size?: TextInputProps["size"];
}

export const Select = ({
  value,
  onChange,
  search,
  onSearchChange,
  label,
  placeholder = "Выберите продукт",
  data = [],
  isLoading = false,
  hasNextPage = false,
  radius,
  size,
  onLoadMore,
}: SelectProps) => {
  const combobox = useCombobox();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { ref: lastElementRef, entry } = useIntersection({
    // eslint-disable-next-line react-hooks/refs
    root: dropdownRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [entry, hasNextPage, isLoading, onLoadMore]);

  const handleSelect: ComboboxProps["onOptionSubmit"] = (selectedValue) => {
    onChange(selectedValue);
    onSearchChange("");
    combobox.closeDropdown();
  };

  const options = data.map((item, index) => (
    <Combobox.Option
      key={item.value}
      value={item.value}
      active={value === item.value}
      ref={index === data.length - 1 ? lastElementRef : null}
    >
      {item.label}
    </Combobox.Option>
  ));

  const clearButton =
    search || value ? (
      <IconX
        cursor="pointer"
        onClick={() => {
          onSearchChange("");
          onChange(null);
        }}
      />
    ) : null;

  const selectedItem = data.find((item) => item.value === value);
  const displayValue = selectedItem?.label || search;

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleSelect}
      withinPortal={false}
    >
      <Combobox.Target>
        <TextInput
          radius={radius}
          size={size}
          label={<Text c="gray-main-2">{label}</Text>}
          placeholder={placeholder}
          value={displayValue}
          onChange={(event) => {
            onSearchChange(event.currentTarget.value);
            if (value) onChange(null);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          rightSection={isLoading ? <Loader size="xs" /> : clearButton}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options
          mah={200}
          ref={dropdownRef}
          style={{ overflowY: "auto" }}
        >
          {options.length > 0 ? (
            <>
              {options}
              {isLoading && (
                <Box ta="center" p="xs">
                  <Loader size="sm" />
                </Box>
              )}
            </>
          ) : (
            <Combobox.Empty>Ничего не найдено</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
