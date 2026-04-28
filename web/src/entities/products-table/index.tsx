import type { Product } from "@/services/products-api";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";

import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import { IconFilter2 } from "@tabler/icons-react";
import { getColumns } from "./lib";
import { useSearchParams } from "react-router-dom";

type ProductsTableProps = {
  data?: Product[];
  isLoading?: boolean;
};

export const ProductsTable = ({ data, isLoading }: ProductsTableProps) => {
  const [selectedRecords, setSelectedRecords] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy: DataTableSortStatus<Product>["columnAccessor"] =
    searchParams.get("sortBy") || "title";
  const order: DataTableSortStatus<Product>["direction"] =
    (searchParams.get("order") as "asc" | "desc") || "asc";

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Product>>({
    columnAccessor: sortBy,
    direction: order,
  });

  useEffect(() => {
    if (sortBy && order) {
      setSearchParams((prevState) => ({
        ...Object.fromEntries(prevState),
        sortBy,
        order,
      }));
    }
  }, []);

  const handleSorting = (value: DataTableSortStatus<Product>) => {
    setSortStatus(value);
    setSearchParams((prevState) => ({
      ...Object.fromEntries(prevState),
      sortBy: value.columnAccessor ?? "",
      order: value.direction,
    }));
  };

  const columns = getColumns();
  return (
    <DataTable
      fetching={isLoading}
      classNames={{ table: styles["table"] }}
      selectionCheckboxProps={{ size: "22px" }}
      allRecordsSelectionCheckboxProps={{
        color: "blue-main",
        icon: ({ className, indeterminate }) => (
          <div
            className={clsx(
              className,
              indeterminate && styles["checkbox-icon"],
            )}
          />
        ),
      }}
      getRecordSelectionCheckboxProps={() => ({
        iconColor: "transparent",
        color: "blue-main",
      })}
      cellPadding={14}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      highlightOnHover
      records={data}
      columns={columns}
      sortIcons={{
        sorted: <IconFilter2 style={{ transform: "rotate(180deg)" }} />,
        unsorted: <IconFilter2 />,
      }}
      sortStatus={sortStatus}
      onSortStatusChange={handleSorting}
    />
  );
};
