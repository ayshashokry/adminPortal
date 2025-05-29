import React, { memo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import FiltersSection from "./FiltersSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface Props {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  filtersData: any[];
  onClickFilter?: (isReset: boolean) => void;
  tempFilters: {
    [key: string]: {
      value: string;
      keyName: string;
      id: string;
      keyType: string;
    };
  };
  isFiltersOpened: boolean;
  setIsFiltersOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setTempFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        value: string;
        keyName: string;
        id: string;
        keyType: string;
      };
    }>
  >;
  exportExcel?: () => void;
  exportPDF?: () => void;
  isExport: boolean | undefined;
}

const FilterSearchComponent: React.FC<Props> = ({
  globalFilter,
  setGlobalFilter,
  filtersData,
  onClickFilter,
  tempFilters,
  setTempFilters,
  isFiltersOpened,
  setIsFiltersOpened,
  exportExcel,
  exportPDF,
  isExport,
}: Props) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        <div className="relative mb-3 col-span-10">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <Button
          variant={"outline"}
          className="col-span-1"
          onClick={() => setIsFiltersOpened(!isFiltersOpened)}
        >
          Filters
        </Button>
        {/* {isExport && ( */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>Export</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20 bg-white mt-2 rounded-md shadow-md p-3">
            <DropdownMenuItem onClick={exportPDF} className="cursor-pointer">
              PDF
            </DropdownMenuItem>
            <hr />
            <DropdownMenuItem onClick={exportExcel} className="cursor-pointer">
              Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* )} */}
      </div>
      {isFiltersOpened ? (
        <FiltersSection
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          onClickFilter={onClickFilter}
          filtersData={filtersData}
        />
      ) : null}
    </>
  );
};
const FilterSearch = memo(FilterSearchComponent);
export default FilterSearch;
