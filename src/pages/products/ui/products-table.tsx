import type { Product } from "@/services/products-api";
import { DataTable } from "mantine-datatable";
import { getColumns } from "../lib";
import { useState } from "react";

type ProductsTableProps = {
  data?: Product[];
};

export const ProductsTable = ({ data }: ProductsTableProps) => {
  const [selectedRecords, setSelectedRecords] = useState<Product[]>([]);

  const columns = getColumns();
  return (
    <DataTable
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      highlightOnHover
      records={data}
      columns={columns}
    />
  );
};
