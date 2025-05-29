"use client";

import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Eye } from "lucide-react";

import TablePagination from "@ui/TablePagination";
import FilterSearch from "./FilterSearch";
import Loading from "../layout/Loading";
import { FetchList } from "@/api/fetchList";
import useAuthStore from "@/store/authStore";
import { useDebounce } from "@/hooks/useDebounce";
import { statusInfo } from "@/data/MenuItemDetailsKeys";
import MessageToaster from "../modals/MessageToaster";
import {
  exportToExcel,
  exportToPDF,
  getUniqueValuesFromArray,
} from "@/utils/helpers";

interface DashboardTableProps<TData> {
  endPoint: string | undefined;
  listName: string | undefined;
  columnFiltersProp: any[];
  columnsProps: ColumnDef<TData>[];
  searchKey: string | undefined;
  filters?: {
    name: string;
    endPoint?: string;
    data?: any[];
    paramType?: string;
    paramName?: string;
    placeholder: string;
    paramWithID?: boolean;
  }[];
  isExport:boolean|undefined
}

export default function DashboardTable<TData extends Record<string, any>>({
  endPoint,
  listName,
  columnFiltersProp,
  columnsProps,
  filters,
  searchKey,isExport
}: DashboardTableProps<TData>) {
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedValue = useDebounce(searchInput, 500);
  const [columnFilters, setColumnFilters] = useState(columnFiltersProp);
  const [error, setError] = useState("");
  const [isFiltersOpened, setIsFiltersOpened] = useState<boolean>(false);

  const [filtersData, setFiltersData] = useState<
    { columns: any; values: [] }[]
  >([]);

  useEffect(() => {
    const fetchFilters = async () => {
      if (filters) {
        const values = await Promise.all(
          filters.map(async (f) => {
            const columnRef = table
              .getAllColumns()
              .find((col) => col.id === f.name);

            return {
              type: f?.paramType,
              paramName: f?.paramName,
              placeholder: f?.placeholder,
              paramWithID: f?.paramWithID,
              columns: columnRef ?? undefined, // ← safe fallback
              values: f.endPoint
                ? await getUniqueValuesFromArray(f, token)
                : f.data ?? [],
            };
          })
        );

        setFiltersData(values);
      }
    };

    fetchFilters();
  }, [filters, token]);

  const fetchList = async ({
    pageIndex,
    pageSize,
    searchInput,
    logout,
    filtersObj,
  }: {
    pageIndex: number;
    pageSize: number;
    searchInput?: string;
    logout: () => void;
    filtersObj?: any;
  }) => {
    if (!token) return null;
    const skip = pageIndex * pageSize;
    const params: {
      skip: number;
      limit: number;
      keyword?: string;
      search?: string;
      filtersObj?: any;
    } = {
      skip,
      limit: pageSize,
    };
    if (searchInput) {
      if (searchKey == "keyword") {
        params.keyword = searchInput;
      } else {
        params.search = searchInput;
      }
    }

    const result = await FetchList({
      endPoint: `v2/${endPoint}`,
      token,
      params,
      logout,
      filtersObj,
    });
    if (!result?.success) {
      setError(result?.message);
    }
    return result?.data;
  };
  const [tempFilters, setTempFilters] = useState<{
    [key: string]: {
      value: string;
      keyName: string;
      id: string;
      keyType: string;
    };
  }>({});
  const { data, isLoading, refetch } = useQuery<{
    refetchOnWindowFocus: false;
    keepPreviousData: true;
    result: TData[];
    hasNext: boolean;
    hasPrevious: boolean;
    totalCount: number;
    skip: number;
    limit: number;
  }>({
    queryKey: [listName, pageIndex, pageSize, debouncedValue, columnFilters],
    queryFn: () =>
      fetchList({
        pageIndex,
        pageSize,
        searchInput: debouncedValue,
        logout,
        filtersObj: columnFilters,
      }),
    enabled: !!token,
  });
  const table = useReactTable({
    data: data?.result ?? [],
    columns: columnsProps,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
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
    manualPagination: true,
  });
  const onClickFilter = (isReset = false) => {
    if (isReset) {
      setPageIndex(0);
      setColumnFilters([]);
      refetch();
      return;
    }

    if (Object.keys(tempFilters).length > 0) {
      const updatedFilters = Object.entries(tempFilters)
        .map(([_, value]) =>
          value?.value && value.value !== ""
            ? {
                id: value.keyName,
                value:
                  value.keyType == "date"
                    ? String(value.value)
                    : value?.value?.split(","),
              }
            : null
        )
        .filter(Boolean);

      setPageIndex(0);
      setColumnFilters(updatedFilters);
      refetch();
    }
  };

  if (isLoading) return <Loading />;

  const tableData = data?.result ?? [];
  const exportExcel = () => {
    return exportToExcel(table.getRowModel().rows.map((r) => r.original));
  };
  const exportPDF = () => {
    const simplifiedColumns = columnsProps.map((col: any) => ({
      header: typeof col.header === "string" ? col.header : "",
      accessorKey: col.accessorKey ?? "",
    }));

    return exportToPDF(
      table.getRowModel().rows.map((r) => r.original),
      simplifiedColumns
    );
  };
  return (
    <div className="p-4 rounded-[12px] border border-gray2 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] min-h-[57vh] overflow-auto">
      <FilterSearch
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        onClickFilter={onClickFilter}
        globalFilter={searchInput}
        setGlobalFilter={setSearchInput}
        filtersData={filtersData}
        isFiltersOpened={isFiltersOpened}
        setIsFiltersOpened={setIsFiltersOpened}
        exportExcel={exportExcel}
        exportPDF={exportPDF}
        isExport={isExport}
      />

      {error && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}

      {tableData.length > 0 ? (
        <>
          <table className="w-full border-collapse border">
            <thead className="bg-gray5">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-grayBasic text-xs font-medium"
                    >
                      {typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </th>
                  ))}
                  <th className="p-3 text-grayBasic text-xs font-medium">
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) =>
                    cell.column.columnDef.header === "Status" ? (
                      <td
                        key={cell.id}
                        className="border-y p-4 text-center text-grayBasic font-normal text-sm"
                      >
                        {(() => {
                          const status = statusInfo.find(
                            (s) => s.name === String(cell.getValue())
                          );
                          return (
                            <h5
                              className=" px-3 m-auto w-fit text-sm p-1 font-semibold"
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
                        className="border-y p-4 text-center text-grayBasic font-normal text-sm"
                      >
                        {String(cell.getValue())}
                      </td>
                    )
                  )}
                  <td className="border-y p-4 text-center text-grayBasic font-normal text-sm">
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
