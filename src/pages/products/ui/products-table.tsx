import type { Product } from "@/services/products-api";
import { DataTable } from "mantine-datatable";
import { getColumns } from "../lib";
import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import { Pagination } from "./pagination";

type ProductsTableProps = {
  data?: Product[];
};

export const ProductsTable = ({ data }: ProductsTableProps) => {
  const [selectedRecords, setSelectedRecords] = useState<Product[]>([]);

  const columns = getColumns();
  return (
    <>
      <DataTable
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
      />
      <Pagination />
    </>
  );
};
