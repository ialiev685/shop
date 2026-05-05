import {
  DataTable,
  type DataTableColumn,
  type DataTableSortStatus,
} from "mantine-datatable";

import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import { IconFilter2 } from "@tabler/icons-react";
import { useSearchParamsState } from "@/shared/hooks/use-search-params-state";

type ProductsTableProps<T> = {
  data?: T[];
  isLoading?: boolean;
  columns: DataTableColumn<T>[];
};

export const Table = <T,>({
  data,
  isLoading,
  columns,
}: ProductsTableProps<T>) => {
  const [selectedRecords, setSelectedRecords] = useState<T[]>([]);
  const { getParam, setParam } = useSearchParamsState();

  const sortBy: DataTableSortStatus<T>["columnAccessor"] =
    getParam("sortBy") || "title";
  const order: DataTableSortStatus<T>["direction"] =
    (getParam("order") as "asc" | "desc") || "asc";

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<T>>({
    columnAccessor: sortBy,
    direction: order,
  });

  useEffect(() => {
    if (sortBy && order) {
      setParam({ sortBy, order });
    }
  }, []);

  const handleSorting = (value: DataTableSortStatus<T>) => {
    setSortStatus(value);
    setParam({
      sortBy:
        typeof value.columnAccessor === "string" ? value.columnAccessor : "",
      order: value.direction,
    });
  };

  return (
    <DataTable
      mih={140}
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
