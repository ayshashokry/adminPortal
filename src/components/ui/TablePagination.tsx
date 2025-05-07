interface TablePaginationProps {
  table: any;
  data: {
    totalCount: number;
  };
}

export default function TablePagination({ table, data }: TablePaginationProps) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const columnFilters = table.getState().columnFilters;

  // ✅ Adjust total rows based on filters (fallback to data.totalCount)
  const totalRows = columnFilters.length > 0
    ? table.getFilteredRowModel().rows.length
    : data?.totalCount;

  const totalPages = Math.ceil(totalRows / pageSize);
  const currentPage = pageIndex + 1;

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div>
      <ul className="flex shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
        {/* Previous Button */}
        <li
          className={`border border-gray6 px-3 py-1 rounded-tl-lg rounded-bl-lg text-md ${
            pageIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={() => pageIndex > 0 && table.previousPage()}
        >
          ← Previous
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            className={`border border-gray6 px-3 py-1 ${
              page === currentPage ? "bg-gray5 font-bold" : ""
            } ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
            onClick={() =>
              typeof page === "number" && table.setPageIndex(page - 1)
            }
          >
            {page}
          </li>
        ))}

        {/* Next Button */}
        <li
          className={`border border-gray6 px-3 py-1 rounded-tr-lg rounded-br-lg text-md ${
            currentPage >= totalPages
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          onClick={() => currentPage < totalPages && table.nextPage()}
        >
          Next →
        </li>
      </ul>
    </div>
  );
}
