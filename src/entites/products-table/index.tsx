import type { Product } from "@/services/products-api";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";

import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import { IconFilter2 } from "@tabler/icons-react";
import { getColumns } from "./lib";

type ProductsTableProps = {
  data?: Product[];
  onSorting?: (sortStatus: DataTableSortStatus) => void;
  isLoading?: boolean;
};

export const ProductsTable = ({
  data,
  onSorting,
  isLoading,
}: ProductsTableProps) => {
  const [selectedRecords, setSelectedRecords] = useState<Product[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Product>>({
    columnAccessor: "title",
    direction: "asc",
  });
  const handleSorting = (value: DataTableSortStatus<Product>) => {
    setSortStatus(value);
    onSorting?.(value);
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
        sorted: <IconFilter2 />,
        unsorted: <IconFilter2 rotate={180} />,
      }}
      sortStatus={sortStatus}
      onSortStatusChange={handleSorting}
    />
  );
};
