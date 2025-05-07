import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import TablePagination from "@ui/TablePagination";
import { useState } from "react";
import FilterSearch from "./FilterSearch";
import { Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../layout/Loading";
import { FetchList } from "@/api/fetchList";
import useAuthStore from "@/store/authStore";
import { useDebounce } from "@/hooks/useDebounce";
import { getUniqueValuesFromArray } from "@/utils/helpers";
import { statusInfo } from "@/data/MenuItemDetailsKeys";

// Define a generic type for the DashboardTableProps
interface DashboardTableProps<TData> {
  endPoint: string;
  listName: string;
  columnFiltersProp: any[];
  columnsProps: ColumnDef<TData>[];
  filters: any[];
}

export default function DashboardTable<TData extends Record<string, any>>({
  endPoint,
  listName,
  columnFiltersProp,
  columnsProps,
  filters,
}: DashboardTableProps<TData>) {
  const { token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedValue = useDebounce(searchInput, 500);
  const [columnFilters, setColumnFilters] = useState(columnFiltersProp);

  const fetchList = async ({
    pageIndex,
    pageSize,
    searchInput,
  }: {
    pageIndex: number;
    pageSize: number;
    searchInput?: string;
  }) => {
    if (!token) return null;
    const skip = pageIndex * pageSize;
    const params: { skip: number; limit: number; keyword?: string } = {
      skip,
      limit: pageSize,
    };
    if (searchInput) {
      params.keyword = searchInput;
    }
    const data = await FetchList({
      endPoint,
      token,
      params,
    });
    return data?.data ?? null;
  };

  const { data, isLoading } = useQuery<{
    result: TData[];
    hasNext: boolean;
    hasPrevious: boolean;
    totalCount: number;
    skip: number;
    limit: number;
  }>({
    queryKey: [listName, pageIndex, pageSize, debouncedValue,columnFilters],
    queryFn: () =>
      fetchList({ pageIndex, pageSize, searchInput: debouncedValue }),
    enabled: !!token,
  });

  const table = useReactTable({
    data: data?.result ?? [],
    columns: columnsProps,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
      columnFilters,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
  });

  if (isLoading) return <Loading />;

  const tableData = data?.result ?? [];

  const filtersData = filters?.map((f) => [
    {
      columns: table.getColumn(f) ?? null,
      values: getUniqueValuesFromArray(tableData, f),
    },
  ]);

  return (
    <div className="p-4 rounded-[12px] border border-gray2 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] min-h-[57vh] overflow-auto">
      <FilterSearch
        globalFilter={searchInput}
        setGlobalFilter={setSearchInput}
        filtersData={filtersData}
      />
      {tableData.length > 0 ? (
        <>
          <table className="w-full border-collapse border">
            <thead className="bg-gray5">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-gray text-xs font-medium"
                    >
                      {typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </th>
                  ))}
                  <th className="p-3 text-gray text-xs font-medium">Actions</th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table?.getRowModel()?.rows?.map((row) => (
                
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) =>
                    cell.column.columnDef.header == "Status" ? (
                      
                      <td
                      key={cell.id}
                      className="border-y p-4 text-center text-gray font-normal text-sm"
                    >
                      {(() => {
                        const status = statusInfo.find(
                          (s) => s.name === String(cell.getValue())
                        );
                        return (
                          <h5
                            className="ml-auto px-3 text-sm p-1 font-semibold"
                            style={{
                              backgroundColor: status?.bg,
                              color: status?.color,
                              border: `1px solid ${status?.border}`,
                              borderRadius: "15px",
                            }}
                          >
                            {status?.name ?? "Unknown"}
                          </h5>
                        );
                      })()}
                    </td>
                    
                    ) : (
                      <td
                        key={cell.id}
                        className="border-y p-4 text-center text-gray font-normal text-sm"
                      >
                        {String(cell.getValue())}
                      </td>
                    )
                  )}
                  <td className="border-y p-4 text-center text-gray font-normal text-sm">
                    <Eye
                      className="inline cursor-pointer"
                      onClick={() =>
                        router.push(`${pathname}/details/${row.original.id}`)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 float-right px-8">
            <TablePagination table={table} data={data!} />
          </div>
        </>
      ) : (
        "No Data available"
      )}
    </div>
  );
}
